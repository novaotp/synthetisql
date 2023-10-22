
// Next
import { Metadata } from "next";

// Internal
import Landing from "./page.components";

export const metadata: Metadata = {
  title: "Home - SynthetiSQL"
}

const Page = (): JSX.Element => {
  return (
    <Landing />
  )
}

export default Page;
