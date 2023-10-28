
import fs from 'fs';
import { discard, store } from "..";

it("deletes a file", async () => {
  const path = "public/export";
  const baseFilename = "test.json";
  const data = { test: "test" };

  const { filename } = await store({ path, filename: baseFilename, data });

  expect(fs.existsSync(`${path}/${filename}`)).toBe(true);

  await discard(path, filename!);

  expect(fs.existsSync(`${path}/${filename}`)).toBe(false);
});
