export type ICourse = {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  code: string;
};

export type IAssignment = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  points: number;
  status: "submitted" | "pending" | "not_started" | "overdue";
};

export type IGrade = {
  id: string;
  courseId: string;
  assignment: string;
  category: string;
  score: number;
  totalPoints: number;
  percentage: number;
  letterGrade: "A" | "A-" | "B+" | "B" | "C" | "D" | "F";
};

export type ITodo = {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  completed: boolean;
  urgent: boolean;
};
