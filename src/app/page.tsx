import Link from "next/link";

export default async function Home() {
  return (
    <div className="text-white h-screen flex flex-col">

      <div className="w-full p-40 flex flex-col space-y-5">
        <div className="font-bold">
          HOME DASHBOARD
        </div>

        <div>
          <Link href="/questions">Questions</Link>
        </div>

      </div>
    </div>
  );
}
