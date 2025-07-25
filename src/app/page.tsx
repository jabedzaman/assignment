import { CheckCircle2 } from "lucide-react";
import { Metadata } from "next";
import { Courses } from "~/components/courses";
import { TodoList } from "~/components/todo-list";
import { assignments } from "~/data/mock-data";

export const metadata: Metadata = { title: "Courses" };

export default function Page() {
  const leftAssignments = assignments.filter(
    (assignment) => assignment.status === "not_started"
  );
  return (
    <div className="px-6 py-6 md:px-8">
      {/* Notification Banner */}
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <CheckCircle2 className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-800">
              <strong>Welcome back!</strong> You have {leftAssignments.length}{" "}
              assignment{leftAssignments.length !== 1 ? "s" : ""} due this week.
            </p>
          </div>
        </div>
      </div>
      <Courses viewAll={false} />
      <div className="mt-8"></div>
      <TodoList />
    </div>
  );
}
