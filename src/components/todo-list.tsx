"use client";

import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { useTodosStore } from "~/store";

export const TodoList = () => {
  const { checkTodo, todos } = useTodosStore((state) => state);
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg font-semibold">
            <Clock className="h-5 w-5 mr-2 text-orange-500" />
            To Do
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50"
              >
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => checkTodo(todo.id)}
                  className="mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium ${
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-gray-900"
                    }`}
                  >
                    {todo.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{todo.course}</p>
                  <p
                    className={`text-xs mt-1 ${
                      todo.urgent ? "text-red-600 font-medium" : "text-gray-500"
                    }`}
                  >
                    Due: {todo.dueDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Calendar Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg font-semibold">
            <Calendar className="h-5 w-5 mr-2 text-green-500" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-2 rounded-lg bg-red-50">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Midterm Exam
                </p>
                <p className="text-xs text-gray-500">
                  Computer Science - Tomorrow 2:00 PM
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-2 rounded-lg bg-blue-50">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Project Presentation
                </p>
                <p className="text-xs text-gray-500">
                  Web Development - Friday 10:00 AM
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-2 rounded-lg bg-green-50">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Study Group</p>
                <p className="text-xs text-gray-500">
                  Mathematics - Next Monday 3:00 PM
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
