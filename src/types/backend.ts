import type { CvAnalysis } from "@/lib/cv-analysis";

export type JobApplicationStatus =
  | "APPLIED"
  | "REVIEWING"
  | "INTERVIEW"
  | "HIRED"
  | "REJECTED";

export type JobApplicationMode = "remote" | "hybrid" | "inperson";

export type BackendPortfolioLinks = {
  linkedin?: string | null;
  github?: string | null;
  portfolio?: string | null;
};

export type BackendUserMe = {
  id: string;
  email: string;
  fullName: string;
  location?: string | null;
  seniority?: string | null;
  roleTarget?: string | null;
  targetRole?: string | null;
  englishLevel?: string | null;
  workPreference?: string | null;
  yearsExperience?: string | null;
  yearsOfExperience?: number | null;
  stack?: string[] | null;
  portfolioLinks?: BackendPortfolioLinks | null;
  profileCompleted?: boolean | null;
  updatedAt?: string | null;
  cvUrl?: string | null;
  cvType?: string | null;
  stackMatchesCV?: boolean | null;
  lastAnalysis?: CvAnalysis | null;
  recentApplications?: string | null;
  stackYears?: string | null;
  applicationType?: string | null;
  isRoleOptimized?: string | null;
  stackExperienceType?: string[] | null;
  interviews?: string | null;
  recentRejections?: string | null;
  consentToShareData?: boolean | null;
  [key: string]: unknown;
};

export type BackendJobApplicationStatusHistoryItem = {
  id?: string;
  newStatus?: JobApplicationStatus;
  changedAt?: string;
};

export type BackendCvVersionSummary = {
  id: string;
  cvUrl?: string | null;
  score?: number | null;
};

export type BackendInterviewSummary = {
  status?: string;
  score?: number | null;
  feedback?: string | null;
};

export type BackendJobApplication = {
  id: string;
  companyName: string;
  position: string;
  status: JobApplicationStatus;
  matchLevel?: number | null;
  appliedAt: string;
  mode?: JobApplicationMode | null;
  jobUrl?: string | null;
  notes?: string | null;
  cvVersion?: BackendCvVersionSummary | null;
  interview?: BackendInterviewSummary | null;
  statusHistory?: BackendJobApplicationStatusHistoryItem[] | null;
};

export type BackendQuotaResponse = {
  allowed: boolean;
  remaining: number;
};

export type BackendCvUploadResponse = CvAnalysis & {
  message: string;
  remainingDiagnostics: number;
};

export type BackendCvHistoryEvolutionItem = {
  versionId: string;
  date: string;
  score: number;
  cvUrl?: string | null;
};

export type BackendCvHistoryConversionItem = {
  cvDate: string;
  score: number;
  efficiency: number;
  totalApplied: number;
};

export type BackendCvPerformanceItem = {
  cvId: string;
  score: number;
  versionDate: string;
  cvUrl?: string | null;
  totalApplications: number;
  successRate: number;
  rejectionRate: number;
  dominantPosition: string;
};

export type BackendDiagnostic = {
  id: string;
  issue: string;
  priority: "high" | "medium" | "low";
  recommendedAction: string;
  notRecommendedAction: string;
  generatedAt: string;
  explanation?: string;
};

export type BackendScoreSummary = {
  totalScore: number;
  improvementScore: number;
  disciplineScore: number;
  alignmentScore: number;
};

export type BackendDiagnosticsSummary = {
  score: BackendScoreSummary | null;
  diagnostics: BackendDiagnostic[];
  totalApplications: number;
  lastUpdate: string | null;
};

export type BackendInterviewMessage = {
  role: "user" | "assistant";
  content: string;
};

export type BackendInterviewHistoryResponse = {
  status: string;
  messages: BackendInterviewMessage[];
  score?: number | null;
  feedback?: string | null;
};

export type BackendInterviewPrepareResponse = {
  systemPrompt: string;
  userName: string;
  suggestedFirstQuestion: string;
};

export type BackendInterviewAnswerResponse = {
  feedback: string;
  nextQuestion: string;
};

export type BackendInterviewFinishResponse = {
  status?: string;
  score: number;
  feedback: string;
  messages?: BackendInterviewMessage[];
};
