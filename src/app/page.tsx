import { QuestionsTable } from "@/components/questions-table";
import { getQuestions } from "@/server/apis/question";

export default async function Home() {

  const data  = await getQuestions();

  console.log(data);
  
  return (
    <div className="text-white h-screen flex flex-col">

      <div className="w-full p-40">
        <QuestionsTable />
      </div>
    </div>
  );
}
