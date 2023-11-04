
"use client";

import { useAccount } from "@hooks/useAccount";

export const Profile = () => {
  const account = useAccount();

  return (
    <div>
      <h1>My Profile</h1>
      <p>Hello {account.firstName}</p>
    </div>
  )
}
