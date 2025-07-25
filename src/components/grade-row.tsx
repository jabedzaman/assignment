import { IGrade } from "~/types";
import { Badge } from "./ui/badge";

export const GradeRow = ({ grade }: { grade: IGrade }) => {
  const gradeColor =
    grade.letterGrade === "A" || grade.letterGrade === "A-"
      ? "default"
      : grade.letterGrade === "B+" || grade.letterGrade === "B"
      ? "secondary"
      : "outline";

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-2">
        <div>
          <p className="font-medium text-gray-900">{grade.assignment}</p>
          <p className="text-sm text-gray-500">{grade.category}</p>
        </div>
      </td>
      <td className="text-center py-3 px-2">
        <span className="font-medium">
          {grade.score}/{grade.totalPoints}
        </span>
      </td>
      <td className="text-center py-3 px-2">
        <span className="text-gray-600">{grade.totalPoints}</span>
      </td>
      <td className="text-center py-3 px-2">
        <Badge variant={gradeColor}>{grade.letterGrade}</Badge>
      </td>
    </tr>
  );
};
