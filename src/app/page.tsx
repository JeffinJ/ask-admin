import { QuestionsTable } from "@/components/questions-table";

export default function Home() {
  return (
    <div className="bg-slate-900 text-white h-screen flex flex-col">

      <div className="w-full p-40">
        <QuestionsTable />
      </div>
    </div>
  );
}
