import { DefaultUser } from "next-auth";
import Head from "next/head";
import SearchForm from "./SearchForm";
import ToggleSwitch from "./ToggleSwitch";
import MerchantList from "./MerchantList";

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

      <SearchForm />
      <ToggleSwitch />
      <MerchantList detail={props.detail}/>
    </div>
  );
}
