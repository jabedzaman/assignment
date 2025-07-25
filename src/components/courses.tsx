import { User } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { courses } from "~/data/mock-data";

export const Courses = () => {
  return (
    <div className="lg:col-span-2">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">My Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="hover:shadow-md w-full transition-shadow"
          >
            <CardHeader className="pb-3 h-full">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {course.title}
                </CardTitle>
              </div>
              <div className="flex items-center text-sm text-gray-600 mt-2">
                <User className="h-4 w-4 mr-1" />
                {course.instructor}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
                <Link href={`/courses/${course.id}`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Go to Course
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
