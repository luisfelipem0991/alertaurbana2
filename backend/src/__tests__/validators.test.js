import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { validateLoginPayload } from "../utils/validators.js";

describe("validateLoginPayload (backend)", () => {
  test("rechaza payload con campos extra", () => {
    const { valid } = validateLoginPayload({
      email: "a@a.com",
      password: "x",
      role: "admin",
    });
    assert.equal(valid, false);
  });

  test("rechaza email inválido", () => {
    const { valid } = validateLoginPayload({
      email: "no-email",
      password: "x",
    });
    assert.equal(valid, false);
  });

  test("rechaza password vacía", () => {
    const { valid } = validateLoginPayload({
      email: "a@a.com",
      password: "",
    });
    assert.equal(valid, false);
  });

  test("acepta payload correcto", () => {
    const { valid } = validateLoginPayload({
      email: "a@a.com",
      password: "x",
    });
    assert.equal(valid, true);
  });
});
