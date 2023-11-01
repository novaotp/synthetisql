
import fs from 'fs';
import { store, discard } from '..';

it("deletes a file", async () => {
  const path = "public/export";
  const baseFilename = "test.json";
  const data = { test: "test" };

  const filename = await store(path, baseFilename, data);

  expect(filename).toBeDefined();

  expect(fs.existsSync(`${path}/${filename}`)).toBe(true);

  await discard(path, filename!);

  expect(fs.existsSync(`${path}/${filename}`)).toBe(false);
});
