import { useEffect, useState } from "react";

export default function useIsRendered(): boolean {
  const [rendered, setRendered] = useState<boolean>(false);
  useEffect(() => setRendered(true), []);
  return rendered;
}
