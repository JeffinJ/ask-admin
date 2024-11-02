import { QuestionsTable } from "@/app/questions/components/questions-table";
import { getQuestions } from "@/server/apis/question";
import { Suspense } from "react";
import QuestionForm from "./components/question-form";

export default async function QuestionsPage() {
    const data = await getQuestions();
    return (
        <div className="text-white h-screen flex flex-col">
            <div className="w-full p-40 flex flex-col gap-y-5">

                <div className="flex flex-row w-full items-center justify-between">
                    <div className="font-bold text-xl">Questions</div>
                    <div className="w-fit">
                        <QuestionForm />
                    </div>
                </div>

                <Suspense fallback={<div>Loading...</div>}>
                    <QuestionsTable questions={data} />
                </Suspense>

            </div>
        </div>
    );
}
