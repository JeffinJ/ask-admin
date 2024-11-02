import { QuestionsTable } from "@/components/questions-table";
import { getQuestions } from "@/server/apis/question";
import { Suspense } from "react";

export default async function Home() {
  const data = await getQuestions();

  return (
    <div className="text-white h-screen flex flex-col">

      <div className="w-full p-40">
        <Suspense fallback={<div>Loading...</div>}>
          <QuestionsTable questions={data} />
        </Suspense>
      </div>
    </div>
  );
}
