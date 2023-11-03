
// Next
import { Metadata } from "next";

// Internal
import { LogIn } from "./page.components";

export const metadata: Metadata = {
  title: "Log In - SynthetiSQL"
}

const Page = (): JSX.Element => {
  return (
    <LogIn />
  )
}

export default Page;
