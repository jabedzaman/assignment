import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Download,
  FileText,
} from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AssignmentCard } from "~/components/assignment-card";
import { GradeRow } from "~/components/grade-row";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { assignments, courses, grades } from "~/data/mock-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const course = courses.find((course) => course.id === id);
  if (!course)
    return {
      title: "Course Not Found",
    };
  return {
    title: `Course: ${course.title}`,
    description: `Learn more about ${course.title}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = courses.find((course) => course.id === id);
  if (!course) return notFound();

  const courseAssignments = assignments.filter(
    (assignment) => assignment.courseId === course.id
  );
  const courseGrades = grades.filter((grade) => grade.courseId === course.id);

  return (
    <div className="px-6 py-6 md:px-8">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="grades">Grades</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    This comprehensive course covers the fundamentals and
                    advanced concepts of {course.title.toLowerCase()}...
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <RecentActivity
                      icon={<FileText className="h-5 w-5 text-blue-600" />}
                      title="New assignment posted"
                      desc="Final Project - Due March 15, 2024"
                      date="2 days ago"
                      bg="bg-blue-50"
                    />
                    <RecentActivity
                      icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
                      title="Assignment graded"
                      desc="Midterm Exam - Score: 92/100"
                      date="1 week ago"
                      bg="bg-green-50"
                    />
                    <RecentActivity
                      icon={<AlertCircle className="h-5 w-5 text-yellow-600" />}
                      title="Announcement"
                      desc="Office hours changed to Wednesdays 2-4 PM"
                      date="1 week ago"
                      bg="bg-yellow-50"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Overall Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-3" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <Stat
                        label="Completed"
                        value="8"
                        color="text-green-600"
                      />
                      <Stat
                        label="Remaining"
                        value="3"
                        color="text-orange-600"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <QuickAction icon={FileText} label="View Syllabus" />
                  <QuickAction icon={Download} label="Download Materials" />
                  <QuickAction icon={Calendar} label="Schedule Office Hours" />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Assignments */}
        <TabsContent value="assignments" className="space-y-6">
          <div className="grid gap-4">
            {courseAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </TabsContent>

        {/* Grades */}
        <TabsContent value="grades" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Grade Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <TableHeader>Assignment</TableHeader>
                          <TableHeader center>Score</TableHeader>
                          <TableHeader center>Points</TableHeader>
                          <TableHeader center>Grade</TableHeader>
                        </tr>
                      </thead>
                      <tbody>
                        {courseGrades.map((grade) => (
                          <GradeRow key={grade.id} grade={grade} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Grade Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <GradeStats />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const RecentActivity = ({
  icon,
  title,
  desc,
  date,
  bg,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  date: string;
  bg: string;
}) => (
  <div className={`flex items-start space-x-3 p-3 rounded-lg ${bg}`}>
    {icon}
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="text-xs text-gray-600">{desc}</p>
      <p className="text-xs text-gray-500 mt-1">{date}</p>
    </div>
  </div>
);

const Stat = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) => (
  <div>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
    <p className="text-xs text-gray-600">{label}</p>
  </div>
);

const QuickAction = ({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) => (
  <Button variant="outline" className="w-full justify-start bg-transparent">
    <Icon className="h-4 w-4 mr-2" />
    {label}
  </Button>
);

const TableHeader = ({
  children,
  center,
}: {
  children: React.ReactNode;
  center?: boolean;
}) => (
  <th
    className={`py-3 px-2 font-medium text-gray-900 ${
      center ? "text-center" : "text-left"
    }`}
  >
    {children}
  </th>
);

const GradeStats = () => (
  <div className="space-y-4">
    <div className="text-center p-4 bg-blue-50 rounded-lg">
      <p className="text-2xl font-bold text-blue-600">88.5%</p>
      <p className="text-sm text-gray-600">Current Average</p>
    </div>
    <div className="grid grid-cols-2 gap-3 text-center">
      <div className="p-3 bg-green-50 rounded-lg">
        <p className="text-lg font-bold text-green-600">A-</p>
        <p className="text-xs text-gray-600">Letter Grade</p>
      </div>
      <div className="p-3 bg-purple-50 rounded-lg">
        <p className="text-lg font-bold text-purple-600">3.7</p>
        <p className="text-xs text-gray-600">GPA Points</p>
      </div>
    </div>
    <div className="space-y-2">
      <ProgressStat label="Assignments (40%)" value={92} />
      <ProgressStat label="Exams (35%)" value={85} />
      <ProgressStat label="Participation (25%)" value={88} />
    </div>
  </div>
);

const ProgressStat = ({ label, value }: { label: string; value: number }) => (
  <div>
    <div className="flex justify-between text-sm">
      <span>{label}</span>
      <span className="font-medium">{value}%</span>
    </div>
    <Progress value={value} className="h-2" />
  </div>
);
