import { DefaultUser } from "next-auth";

interface MerchantPageProps {
  detail: any;
  user: DefaultUser & { tags?: string[] };
}

export function MerchantPage(props: MerchantPageProps) {
  return <></>;
}
