import { DefaultUser } from "next-auth";
import Head from "next/head";
import SearchForm from "./SearchForm";
import ToggleSwitch from "./ToggleSwitch";
import MerchantList from "./MerchantList";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

interface MerchantPageProps {
  detail: any;
  user: DefaultUser & { tags?: string[] };
}

export function MerchantPage(props: MerchantPageProps) {
  return (
    <div className="min-h-screen p-4">
      <Head>
        <title>Eatable</title>
        <meta name="description" content="Safe dining for everyone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center justify-center mb-5 mt-2">
        <Link
          href={"/home"}
          className="text-gray-800 text-xl font-semibold text-left w-full items-center flex"
        >
          <IoIosArrowBack className="inline mr-4" size={28} />
          <p>Home</p>
        </Link>
      </div>

      <SearchForm />
      <ToggleSwitch />
      <MerchantList detail={props.detail} />
    </div>
  );
}
