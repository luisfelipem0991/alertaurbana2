import { POST } from "../app/api/login/route";
import pool from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

jest.mock("@/lib/db", () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
  },
}));

jest.mock("bcrypt", () => ({
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("Login API", () => {
  test("usuario no encontrado", async () => {
    pool.query.mockResolvedValue({
      rows: [],
    });

    const req = {
      json: async () => ({
        email: "test@test.com",
        password: "123",
      }),
    };

    const res = await POST(req);

    expect(res.status).toBe(400);
  });

  test("contraseña incorrecta", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          password: "hash",
          role: "user",
        },
      ],
    });

    bcrypt.compare.mockResolvedValue(false);

    const req = {
      json: async () => ({
        email: "test@test.com",
        password: "123",
      }),
    };

    const res = await POST(req);

    expect(res.status).toBe(400);
  });

  test("login exitoso", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          name: "Luis",
          password: "hash",
          role: "admin",
        },
      ],
    });

    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("token123");

    const req = {
      json: async () => ({
        email: "test@test.com",
        password: "123",
      }),
    };

    const res = await POST(req);
    const data = await res.json();

    expect(data.token).toBe("token123");
    expect(data.message).toBe("Login exitoso");
  });
});