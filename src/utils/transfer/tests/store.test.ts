
import fs from 'fs';
import { store } from '..';

it("creates a file", async () => {
  const path = "public/export";
  const baseFilename = "test.json";
  const data = { test: "test" };

  const filename = await store(path, baseFilename, data);

  expect(filename).toBeDefined();

  expect(fs.existsSync(`${path}/${filename}`)).toBe(true);
});
