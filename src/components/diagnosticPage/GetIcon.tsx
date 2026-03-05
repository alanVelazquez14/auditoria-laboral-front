import { AlertCircle, BarChart3, Gauge, MapPin, Target } from "lucide-react";

export function getIcon(issue: string) {
  if (issue.includes("ATS"))
    return <BarChart3 className="w-5 h-5 text-red-400" />;
  if (issue.includes("SENIORITY"))
    return <Gauge className="w-5 h-5 text-red-400" />;
  if (issue.includes("MATCH"))
    return <Target className="w-5 h-5 text-yellow-400" />;
  if (issue.includes("GEOGRAFICA"))
    return <MapPin className="w-5 h-5 text-yellow-400" />;
  return <AlertCircle className="w-5 h-5 text-gray-400" />;
}

export function getIconColor(issue: string) {
  if (issue.includes("ATS") || issue.includes("SENIORITY")) return "bg-red-500";
  return "bg-yellow-500";
}
