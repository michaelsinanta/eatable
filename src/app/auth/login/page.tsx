import Head from "next/head";
import Image from "next/image";
import ButtonLogin from "./components/ButtonLogin";

export default async function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-end bg-orange-500 overflow-hidden">
      <ButtonLogin />
    </div>
  );
}
