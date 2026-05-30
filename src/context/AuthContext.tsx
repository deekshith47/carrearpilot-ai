import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  User as FirebaseUser
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  getDocFromServer
} from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '../lib/firebase';

export type UserRole = 'student' | 'admin' | 'recruiter';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  // Student metrics
  placementReadiness?: number;
  atsScore?: number;
  attendance?: number;
  leaderboardRank?: number;
  mockInterviewScore?: number;
  githubUsername?: string;
}

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface AuthContextType {
  user: User | null;
  login: (email: string, role: UserRole, customName?: string) => boolean;
  logout: () => void;
  isLoading: boolean;
  // --- Core Firebase additions ---
  firebaseSignIn: (email: string, pass: string) => Promise<void>;
  firebaseSignUp: (email: string, pass: string, name: string, role: UserRole) => Promise<void>;
  firebaseGoogleSignIn: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// High-fidelity demo users
export const DEMO_STUDENT: User = {
  id: 'student-alex',
  name: 'Devon Lee',
  email: 'devon.lee@university.edu',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  placementReadiness: 82,
  atsScore: 88,
  attendance: 94,
  leaderboardRank: 4,
  mockInterviewScore: 8.5,
  githubUsername: 'devonlee-dev'
};

export const DEMO_ADMIN: User = {
  id: 'admin-sarah',
  name: 'Dr. Sarah Jenkins',
  email: 'sarah.jenkins@university.edu',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
};

export const DEMO_RECRUITER: User = {
  id: 'recruiter-jason',
  name: 'Jason Sterling',
  email: 'jason.sterling@talentpartners.com',
  role: 'recruiter',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('careerpilot_session_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  // Pillar Verification: Test Connection initially
  useEffect(() => {
    if (!isFirebaseConfigured) {
      console.log("Firebase is running in local sandbox fallback mode.");
      setIsLoading(false);
      return;
    }
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    }
    testConnection();
  }, []);

  // Monitor Auth State Changed
  useEffect(() => {
    if (!isFirebaseConfigured) {
      setIsLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);
      if (firebaseUser) {
        const path = `users/${firebaseUser.uid}`;
        try {
          // Fetch from Firestore
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data() as User;
            setUser(userData);
            localStorage.setItem('careerpilot_session_user', JSON.stringify(userData));
          } else {
            // Not registered in DB yet (e.g. standard Google sign in on first visit)
            const userEmail = firebaseUser.email || 'user@unconfigured.edu';
            const storedPref = localStorage.getItem('google_signin_preferred_role') as UserRole;
            const detectedRole: UserRole = storedPref || (
              (
                userEmail.includes('admin') || 
                userEmail.includes('faculty') || 
                userEmail.includes('sarah')
              ) ? 'admin' : 'student'
            );
            
            const fallbackName = firebaseUser.displayName || userEmail.split('@')[0] || 'User Name';
            
            const newUser: User = {
              id: firebaseUser.uid,
              name: fallbackName,
              email: userEmail,
              role: detectedRole,
              avatar: firebaseUser.photoURL || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150`,
              placementReadiness: detectedRole === 'student' ? 82 : undefined,
              atsScore: detectedRole === 'student' ? 88 : undefined,
              attendance: detectedRole === 'student' ? 94 : undefined,
              leaderboardRank: detectedRole === 'student' ? 4 : undefined,
              mockInterviewScore: detectedRole === 'student' ? 8.5 : undefined,
              githubUsername: ''
            };
            
            await setDoc(userDocRef, {
              ...newUser,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            });
            setUser(newUser);
            localStorage.setItem('careerpilot_session_user', JSON.stringify(newUser));
          }
        } catch (error) {
          // Catch and process Firestore permission errors
          handleFirestoreError(error, OperationType.GET, path);
          
          // Render robust fallback state
          const emailStr = firebaseUser.email || '';
          const tempRole: UserRole = (emailStr.includes('admin') || emailStr.includes('faculty')) ? 'admin' : 'student';
          const fallbackUser: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || emailStr.split('@')[0] || 'User',
            email: emailStr,
            role: tempRole,
          };
          setUser(fallbackUser);
          localStorage.setItem('careerpilot_session_user', JSON.stringify(fallbackUser));
        }
      } else {
        // Only clear user context if it was actually logged in with firebase onAuthStateChanged
        // and NOT when we are using a local localStorage session!
        const hasLocalSession = localStorage.getItem('careerpilot_session_user') !== null;
        if (!hasLocalSession) {
          setUser(null);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Backwards compatibility custom local/quick-login trigger
  const login = (email: string, role: UserRole, customName?: string): boolean => {
    let authenticatedUser: User | null = null;
    
    if (role === 'admin') {
      const finalName = customName?.trim() || 'Dr. Sarah Jenkins';
      authenticatedUser = { ...DEMO_ADMIN, name: finalName, email: email || DEMO_ADMIN.email };
    } else if (role === 'recruiter') {
      const finalName = customName?.trim() || 'Jason Sterling';
      authenticatedUser = { ...DEMO_RECRUITER, name: finalName, email: email || DEMO_RECRUITER.email };
    } else {
      const finalName = customName?.trim() || 'Devon Lee';
      authenticatedUser = { ...DEMO_STUDENT, name: finalName, email: email || DEMO_STUDENT.email };
    }

    setUser(authenticatedUser);
    localStorage.setItem('careerpilot_session_user', JSON.stringify(authenticatedUser));
    return true;
  };

  const logout = async () => {
    try {
      if (isFirebaseConfigured) {
        await signOut(auth);
      }
    } catch (e) {
      console.error("Firebase signOut error", e);
    }
    setUser(null);
    localStorage.removeItem('careerpilot_session_user');
  };

  // --- Real Firebase Operations ---
  const firebaseSignIn = async (email: string, pass: string) => {
    if (!isFirebaseConfigured) {
      console.log("Simulating sign-in in sandbox mode");
      const detectedRole: UserRole = (email.includes('admin') || email.includes('faculty')) ? 'admin' : 'student';
      const name = email.split('@')[0].split('.').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      login(email, detectedRole, name);
      return;
    }
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const firebaseSignUp = async (email: string, pass: string, name: string, role: UserRole) => {
    if (!isFirebaseConfigured) {
      console.log("Simulating sign-up in sandbox mode");
      login(email, role, name);
      return;
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const firebaseUser = userCredential.user;
    
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const newUser: User = {
      id: firebaseUser.uid,
      name: name,
      email: email,
      role: role,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150`,
      placementReadiness: role === 'student' ? 82 : undefined,
      atsScore: role === 'student' ? 88 : undefined,
      attendance: role === 'student' ? 94 : undefined,
      leaderboardRank: role === 'student' ? 4 : undefined,
      mockInterviewScore: role === 'student' ? 8.5 : undefined,
      githubUsername: ''
    };
    
    const path = `users/${firebaseUser.uid}`;
    try {
      await setDoc(userDocRef, {
        ...newUser,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const firebaseGoogleSignIn = async () => {
    if (!isFirebaseConfigured) {
      console.log("Simulating Google sign-in in sandbox mode");
      const storedPref = localStorage.getItem('google_signin_preferred_role') as UserRole || 'student';
      login('sandbox.user@university.edu', storedPref, 'Sandbox Student');
      return;
    }
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isLoading,
      firebaseSignIn,
      firebaseSignUp,
      firebaseGoogleSignIn
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
