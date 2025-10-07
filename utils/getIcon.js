import {
  BarChart3,
  Settings,
  FileText,
  NotebookPen,
  Rocket,
  Briefcase,
} from "lucide-react";

export const getIcon = (name) => {
  const icons = {
    Dashboard: <BarChart3 size={18} />,
    "Resume Optimizer": <Settings size={18} />,
    "Resume Builder": <FileText size={18} />,
    "Note Tracker": <NotebookPen size={18} />,
    "Interview Prep": <Rocket size={18} />,
    Applications: <Briefcase size={18} />,
  };
  return icons[name];
};
