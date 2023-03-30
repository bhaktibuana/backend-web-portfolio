const request = require("supertest");
const { api } = require("../configs");
const app = require("../../app");

describe("Test the api src path", () => {
  test("it should response the GET method", async () => {
    const response = await request(app).get(api.v1);
    expect(response.statusCode).toBe(200);
  });
});
