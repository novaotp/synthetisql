
"use client";

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const Page = (): void => {
  const router = useRouter();
  deleteCookie('id');
  router.push('/auth/log-in');
}

export default Page;
