import { validateRegisterPayload, validateLoginPayload } from "@/lib/validators";

describe("validateRegisterPayload", () => {
  test("rechaza campos extra (simula payload manipulado)", () => {
    const { valid } = validateRegisterPayload({
      name: "Luis",
      email: "luis@test.com",
      password: "Password123",
      confirmPassword: "Password123",
      role: "admin",
    });
    expect(valid).toBe(false);
  });

  test("rechaza password corta aunque el front no la bloquee", () => {
    const { valid, errors } = validateRegisterPayload({
      name: "Luis",
      email: "luis@test.com",
      password: "123",
      confirmPassword: "123",
    });
    expect(valid).toBe(false);
    expect(errors).toContain("La contraseña debe tener entre 8 y 72 caracteres");
  });

  test("rechaza email con formato inválido", () => {
    const { valid } = validateRegisterPayload({
      name: "Luis",
      email: "no-es-email",
      password: "Password123",
      confirmPassword: "Password123",
    });
    expect(valid).toBe(false);
  });

  test("rechaza tipos manipulados (password como array)", () => {
    const { valid } = validateRegisterPayload({
      name: "Luis",
      email: "luis@test.com",
      password: ["a"],
      confirmPassword: ["a"],
    });
    expect(valid).toBe(false);
  });

  test("rechaza nombre con caracteres no permitidos", () => {
    const { valid } = validateRegisterPayload({
      name: "<script>123",
      email: "luis@test.com",
      password: "Password123",
      confirmPassword: "Password123",
    });
    expect(valid).toBe(false);
  });

  test("acepta un payload válido", () => {
    const { valid } = validateRegisterPayload({
      name: "Luis",
      email: "luis@test.com",
      password: "Password123",
      confirmPassword: "Password123",
    });
    expect(valid).toBe(true);
  });
});

describe("validateLoginPayload", () => {
  test("rechaza campos extra inyectados", () => {
    const { valid } = validateLoginPayload({
      email: "a@a.com",
      password: "x",
      isAdmin: true,
    });
    expect(valid).toBe(false);
  });

  test("rechaza email vacío o ausente", () => {
    expect(validateLoginPayload({ password: "x" }).valid).toBe(false);
  });

  test("rechaza email con formato inválido", () => {
    expect(
      validateLoginPayload({ email: "no-es-correo", password: "x" }).valid
    ).toBe(false);
  });

  test("acepta payload válido", () => {
    expect(
      validateLoginPayload({ email: "a@a.com", password: "x" }).valid
    ).toBe(true);
  });
});
