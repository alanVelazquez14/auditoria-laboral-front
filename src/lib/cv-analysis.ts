export type CvAnalysisCheck = {
  label: string;
  feedback: string;
  passed: boolean;
};

export type CvAnalysis = {
  score: number;
  summary: string;
  improvementTip: string;
  checks: CvAnalysisCheck[];
};

type UserWithLastAnalysis = {
  lastAnalysis?: unknown;
};

type AnyRecord = Record<string, unknown>;

function asRecord(value: unknown): AnyRecord | null {
  return typeof value === "object" && value !== null
    ? (value as AnyRecord)
    : null;
}

function toCheckArray(value: unknown): CvAnalysisCheck[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      const record = asRecord(item);
      if (!record) return null;

      return {
        label: String(record.label ?? ""),
        feedback: String(record.feedback ?? ""),
        passed: Boolean(record.passed),
      };
    })
    .filter((item): item is CvAnalysisCheck => item !== null);
}

function parseAnalysis(source: unknown): CvAnalysis | null {
  const record = asRecord(source);
  if (!record) {
    return null;
  }

  if (
    typeof record.score !== "number" ||
    typeof record.summary !== "string" ||
    typeof record.improvementTip !== "string"
  ) {
    return null;
  }

  return {
    score: record.score,
    summary: record.summary,
    improvementTip: record.improvementTip,
    checks: toCheckArray(record.checks),
  };
}

export function normalizeCvAnalysis(source: unknown): CvAnalysis | null {
  const direct = parseAnalysis(source);
  if (direct) {
    return direct;
  }

  return null;
}

export function extractUserCvAnalysis(user: UserWithLastAnalysis | null | undefined) {
  return normalizeCvAnalysis(user?.lastAnalysis ?? null);
}
