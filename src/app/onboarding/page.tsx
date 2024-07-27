import { HiArrowLeft } from "react-icons/hi";
import { OnboardingPage } from "./components/OnboardingPage";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name || "Guest";

  return (
    <div className="overflow-y-hidden relative h-full flex flex-col gap-4 min-h-screen bg-white p-6 py-10">
      <div className="flex flex-col items-start justify-start gap-4">
        <Link
          href={"/discovery"}
          className="text-gray-800 text-xl font-semibold text-left w-full"
        >
          <HiArrowLeft className="inline mr-2" />
        </Link>
        <h1 className="text-gray-800 text-xl font-semibold text-start">
          Welcome, {userName}!
        </h1>
        <p className="text-[#878787] font-light">
          What type of food do you look for?
        </p>
      </div>
      <OnboardingPage />
    </div>
  );
}
