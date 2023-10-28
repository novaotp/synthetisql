
import { load } from "..";
import Table from '@models/table';
import Simulate from "@utils/simulate";

it("reads content from file", async () => {
  const filename = "file.txt";
  const data = JSON.stringify(Table.defaultIndex());
  const options = { type: "text/plain" };

  const file = Simulate.file([data], filename!, options);
  const content = await load(file);

  expect(content).toBe(data);
});
