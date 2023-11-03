
import { JWT } from "..";

it("signs and verifies a jwt", async () => {
  const data = { test: "Some data" };

  const jwt = await JWT.sign(data);
  const payload = await JWT.verify(jwt);

  expect(payload.payload).toBe(data);
})
