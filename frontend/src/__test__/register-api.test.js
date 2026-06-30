import { POST } from "../app/api/register/route";
import pool from "@/lib/db";
import bcrypt from "bcrypt";

jest.mock("@/lib/db", () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
  },
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
}));

describe("Register API", () => {
  test("campos vacíos", async () => {
    const req = {
      json: async () => ({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }),
    };

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Campos obligatorios");
  });

  test("campos extra en el payload son rechazados (simula petición manipulada)", async () => {
    const req = {
      json: async () => ({
        name: "Luis",
        email: "test@test.com",
        password: "Password123",
        confirmPassword: "Password123",
        role: "admin",
      }),
    };

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  test("contraseñas diferentes", async () => {
    const req = {
      json: async () => ({
        name: "Luis",
        email: "test@test.com",
        password: "Password123",
        confirmPassword: "Password456",
      }),
    };

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
  });

  test("contraseña demasiado corta", async () => {
    const req = {
      json: async () => ({
        name: "Luis",
        email: "test@test.com",
        password: "123",
        confirmPassword: "123",
      }),
    };

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  test("email con formato inválido", async () => {
    const req = {
      json: async () => ({
        name: "Luis",
        email: "no-es-un-correo",
        password: "Password123",
        confirmPassword: "Password123",
      }),
    };

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  test("usuario ya existe", async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 1 }],
    });

    const req = {
      json: async () => ({
        name: "Luis",
        email: "test@test.com",
        password: "Password123",
        confirmPassword: "Password123",
      }),
    };

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  test("registro exitoso", async () => {
    pool.query
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({});

    bcrypt.hash.mockResolvedValue("hashedpass");

    const req = {
      json: async () => ({
        name: "Luis",
        email: "test@test.com",
        password: "Password123",
        confirmPassword: "Password123",
      }),
    };

    const res = await POST(req);
    const data = await res.json();

    expect(data.message).toBe("Usuario creado correctamente");
  });
});
