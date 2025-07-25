import { notFound } from "next/navigation";
import { courses } from "~/data/mock-data";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = courses.find((course) => course.id === id);
  if (!course) {
    return notFound();
  }
  return (
    <div>
      <pre>{JSON.stringify(course, null, 2)}</pre>
    </div>
  );
}
