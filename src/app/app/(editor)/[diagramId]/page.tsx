
import { Metadata } from "next";
import { Editor } from "./page.components";

export const metadata: Metadata = {
  title: "Editor - SynthetiSQL"
}

const Page = () => {
  return (
    <Editor />
  )
}

export default Page;
