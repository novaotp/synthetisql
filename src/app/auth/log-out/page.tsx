
"use client";

import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

const Page = (): void => {
  const router = useRouter();
  deleteCookie('id');
  router.push('/auth/log-in');
}

export default Page;
