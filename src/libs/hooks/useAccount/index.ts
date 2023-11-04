
"use client";

// React + Next
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";

// Internal
import { Account } from "./interfaces";
import { fetchAccountData } from "./server";

/** A client-side hook for **read-only** account data. */
export const useAccount = () => {
  const [account, setAccount] = useState<Account>({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    (async () => {
      const token = getCookie('id')?.toString();

      if (!token) {
        return;
      }

      const data = await fetchAccountData(token);

      if (!data) {
        return;
      }

      setAccount(data);
    })();
  }, []);

  return account;
}
