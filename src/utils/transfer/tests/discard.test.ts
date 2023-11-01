
import fs from 'fs';
import { Transfer } from '..';

it("deletes a file", async () => {
  const path = "public/export";
  const baseFilename = "test.json";
  const data = { test: "test" };

  const { filename } = await Transfer.store({ path, filename: baseFilename, data });

  expect(fs.existsSync(`${path}/${filename}`)).toBe(true);

  await Transfer.discard(path, filename!);

  expect(fs.existsSync(`${path}/${filename}`)).toBe(false);
});
