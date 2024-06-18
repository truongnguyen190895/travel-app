const request = require("supertest");
const app = require("../server/server"); // Path to your server file

describe("Express Server", () => {
  it("should be up and running", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
  });
});
