
// Next
import { Metadata } from "next";

// Internal
import { SignUp } from "./page.components";

export const metadata: Metadata = {
  title: "Sign Up - SynthetiSQL"
}

const Page = (): JSX.Element => {
  return (
    <SignUp />
  )
}

export default Page;
