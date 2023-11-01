
import { store, download } from "..";

it('creates a link element and triggers a download', async () => {
  const spy = jest.spyOn(document, 'createElement');

  const path = 'public/export';
  const baseFilename = 'db.synmodel';
  const data = { test: 'test' };

  const filename = await store(path, baseFilename, data);

  expect(filename).toBeDefined();

  download('export', filename!);

  expect(spy).toHaveBeenCalledWith('a');

  const link = spy.mock.results[0].value;

  expect(link.href).toBe(`${process.env.NEXT_PUBLIC_WEBAPP_URL ?? 'http://localhost:5173'}/export/${filename}`);
  expect(link.download).toBe(filename);

  spy.mockRestore();
});
