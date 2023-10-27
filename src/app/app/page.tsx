
// Next
import { Metadata } from "next";

// Internal
import App from "./page.components";

export const metadata: Metadata = {
  title: "App - SynthetiSQL"
}

const Page = (): JSX.Element => {
  return (
    <App />
  )
}

export default Page;
