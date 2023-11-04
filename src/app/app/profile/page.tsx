
// Next
import { Metadata } from "next";

// Internal
import { Profile } from "./page.components";

export const metadata: Metadata = {
  title: "My Profile - SynthetiSQL"
}

const Page = (): JSX.Element => {
  return (
    <Profile />
  )
}

export default Page;
