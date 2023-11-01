
import fs from 'fs';
import { Simulate } from '@utils/simulate';
import { store, load, discard } from '..';

it("stores a file, loads its content, and deletes it", async () => {
  const path = "public/export";
  const baseFilename = "test.json";
  const data = JSON.stringify({ test: "test" });

  const filename = await store(path, baseFilename, data);

  expect(filename).toBeDefined();

  const file = Simulate.file([data], filename!, { type: "application/json" });

  const content = await load(file);

  expect(content).toEqual(data);

  await discard(path, filename!);

  expect(fs.existsSync(`${path}/${filename}`)).toBe(false);
});
