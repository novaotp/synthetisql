
import { sign, verify } from "..";

it("signs and verifies a jwt", async () => {
  const data = { test: "Some data" };

  const jwt = await sign(data);
  const payload = await verify(jwt);

  expect(payload.payload).toBe(data);
})
