import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';

// Lazy loading variables
let appInstance: any = null;
let authInstance: any = null;
let providerInstance: any = null;
let cachedAccessToken: string | null = null;
let isSigningIn = false;

// Check and dynamically initialize Firebase
export async function getFirebaseAuth() {
  if (authInstance) return authInstance;
  try {
    const response = await fetch('/firebase-applet-config.json');
    if (!response.ok) {
      throw new Error("Could not find /firebase-applet-config.json file.");
    }
    const firebaseConfig = await response.json();

    if (!firebaseConfig || !firebaseConfig.apiKey) {
      throw new Error("Configuration is invalid or missing 'apiKey'");
    }

    appInstance = initializeApp(firebaseConfig);
    authInstance = getAuth(appInstance);
    return authInstance;
  } catch (err: any) {
    console.warn("Could not lazily initialize Firebase Auth. Normal if OAuth setup is not complete yet:", err.message);
    return null;
  }
}

export function getGoogleProvider() {
  if (providerInstance) return providerInstance;
  
  const provider = new GoogleAuthProvider();
  // Request Google Docs and Drive File scopes
  provider.addScope('https://www.googleapis.com/auth/documents');
  provider.addScope('https://www.googleapis.com/auth/drive.file');
  providerInstance = provider;
  return providerInstance;
}

// Check auth state & access token
export const initAuth = async (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  const auth = await getFirebaseAuth();
  if (!auth) {
    if (onAuthFailure) onAuthFailure();
    return () => {};
  }

  return onAuthStateChanged(auth, async (user: any) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Start popup sign in flow
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const auth = await getFirebaseAuth();
    if (!auth) {
      throw new Error("Firebase Authentication is not yet configured. Please enable OAuth in the AI Studio settings first.");
    }

    const provider = getGoogleProvider();
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Google Sign-In.');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Sign-In failed:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const logout = async () => {
  const auth = await getFirebaseAuth();
  if (auth) {
    await auth.signOut();
  }
  cachedAccessToken = null;
};
