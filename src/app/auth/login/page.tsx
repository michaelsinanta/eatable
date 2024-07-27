import Image from "next/image";

export default async function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#00AE4F]">
      <main className="flex flex-col items-center justify-center w-full flex-1 text-center">
        <div className="w-[300px]">
          <Image
            src="/images/logo-eatable.svg"
            alt="eatable"
            quality={100}
            width={1920}
            height={1080}
          />
        </div>
        <p className="text-lg text-white mb-12 mt-3">
          Safe dining for everyone
        </p>

        <div className="w-[430px] px-8 mb-14">
          <Image
            src="/images/login-eatable.svg"
            alt="eatable"
            quality={100}
            width={1920}
            height={1080}
          />
        </div>
        <button className="bg-white text-green-600 font-semibold py-3 px-20 rounded-full shadow-md hover:shadow-lg transform transition hover:scale-105">
          Login with Google
        </button>
      </main>
    </div>
  );
}
