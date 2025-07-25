import { IAssignment } from "~/types";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Clock, Download } from "lucide-react";
import { Button } from "./ui/button";

export const AssignmentCard = ({ assignment }: { assignment: IAssignment }) => {
  const statusColor =
    assignment.status === "submitted"
      ? "default"
      : assignment.status === "overdue"
      ? "destructive"
      : "secondary";

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {assignment.title}
              </h3>
              <Badge variant={statusColor}>{assignment.status}</Badge>
            </div>
            <p className="text-gray-600 mb-3">{assignment.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Due: {assignment.dueDate}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {assignment.points} points
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Button
              size="sm"
              variant={
                assignment.status === "submitted" ? "outline" : "default"
              }
            >
              {assignment.status === "submitted"
                ? "View Submission"
                : "Submit Assignment"}
            </Button>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
