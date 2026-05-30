export interface StudentMetrics {
  atsScore: number;
  attendance: number;
  codingSolvedCount: number;
  leaderboardRank: number;
  mockInterviewScore: number;
  placementReadiness: number;
}

export function getLatestMetrics(): StudentMetrics {
  // 1. ATS Score
  let atsScore = 88;
  const storedResume = localStorage.getItem('user_resume_skills_dna');
  if (storedResume) {
    try {
      const parsed = JSON.parse(storedResume);
      if (parsed && typeof parsed.score === 'number') {
        atsScore = parsed.score;
      }
    } catch (e) {
      console.warn("Error parsing user_resume_skills_dna", e);
    }
  } else {
    const storedAts = localStorage.getItem('user_ats_score');
    if (storedAts) {
      atsScore = parseInt(storedAts, 10) || 88;
    }
  }

  // 2. Class Attendance
  let attendance = 94;
  const storedAttendance = localStorage.getItem('user_class_attendance');
  if (storedAttendance) {
    attendance = parseInt(storedAttendance, 10) || 94;
  }

  // 3. Coding Leaderboard / Solved Count
  let codingSolvedCount = 1; // Default LED question solved
  let codingScoresMap: Record<number, number> = { 3: 95 };
  const storedCoding = localStorage.getItem('user_coding_scores');
  if (storedCoding) {
    try {
      const parsed = JSON.parse(storedCoding);
      if (parsed && typeof parsed === 'object') {
        codingScoresMap = parsed;
        codingSolvedCount = Object.keys(parsed).length;
      }
    } catch (e) {
      console.warn("Error parsing user_coding_scores", e);
    }
  }

  // Calculate Leaderboard Rank based on coding questions solved
  // More solved = better rank!
  let leaderboardRank = 4;
  if (codingSolvedCount === 0) {
    leaderboardRank = 15;
  } else if (codingSolvedCount === 1) {
    leaderboardRank = 4;
  } else if (codingSolvedCount === 2) {
    leaderboardRank = 3;
  } else if (codingSolvedCount === 3) {
    leaderboardRank = 2;
  } else if (codingSolvedCount >= 4) {
    leaderboardRank = 1;
  }

  // 4. Mock Interview Score (out of 10)
  let mockInterviewScore = 8.5;
  const storedMock = localStorage.getItem('user_mock_interview_score');
  if (storedMock) {
    const parsedMock = parseFloat(storedMock);
    if (!isNaN(parsedMock)) {
      // Handle either out of 10 or out of 100
      mockInterviewScore = parsedMock > 10 ? parsedMock / 10 : parsedMock;
    }
  }

  // Calculate Composite Coding Score Metric out of 100
  // e.g. 50 + 12.5 per solved, up to 100
  const codingScoreMetric = Math.min(100, 50 + (codingSolvedCount * 12.5));

  // 5. Dynamic placement readiness score calculation
  const atsContribution = atsScore; // out of 100
  const attendanceContribution = attendance; // out of 100
  const codingContribution = codingScoreMetric; // out of 100
  const mockContribution = mockInterviewScore * 10; // convert out of 10 to 100

  // Balanced composite formula: 25% weights each
  const placementReadiness = Math.round(
    (atsContribution + attendanceContribution + codingContribution + mockContribution) / 4
  );

  return {
    atsScore,
    attendance,
    codingSolvedCount,
    leaderboardRank,
    mockInterviewScore,
    placementReadiness
  };
}

export function saveAtsScore(score: number) {
  localStorage.setItem('user_ats_score', String(score));
  // Dispatches simple custom event to trigger state refreshes if necessary
  window.dispatchEvent(new Event('metrics_updated'));
}

export function saveClassAttendance(attendance: number) {
  localStorage.setItem('user_class_attendance', String(attendance));
  window.dispatchEvent(new Event('metrics_updated'));
}

export function saveMockInterviewScore(score: number) {
  localStorage.setItem('user_mock_interview_score', String(score));
  window.dispatchEvent(new Event('metrics_updated'));
}
