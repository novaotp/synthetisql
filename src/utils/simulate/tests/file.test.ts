
import { Simulate } from "..";

it('creates a valid file object', async () => {
  const data = "Some random data";
  const filename = "test.txt";
  const options = { type: "text/plain" };

  const file = Simulate.file([data], filename, options);

  expect(await new Promise((resolve: (value: boolean) => void, reject: (reason: boolean) => void) => {
    const reader = new FileReader();

    reader.onload = () => resolve(true);
    reader.onerror = () => reject(false);

    reader.readAsText(file);
  })).toBe(true);
});
