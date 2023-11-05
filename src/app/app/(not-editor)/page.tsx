
// Next
import { Metadata } from "next";

// Internal
import Dashboard from "./page.components";

export const metadata: Metadata = {
  title: "My Dashboard - SynthetiSQL"
}

const Page = (): JSX.Element => {
  return (
    <Dashboard />
  )
}

export default Page;
