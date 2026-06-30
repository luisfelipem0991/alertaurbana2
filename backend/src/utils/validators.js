const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateLoginPayload(body = {}) {
  const errors = [];
  const allowedKeys = ["email", "password"];
  const hasExtraKeys = Object.keys(body).some((k) => !allowedKeys.includes(k));
  const { email, password } = body;

  if (hasExtraKeys || !isNonEmptyString(email) || !EMAIL_REGEX.test(email.trim())) {
    errors.push("Correo inválido");
  }
  if (!isNonEmptyString(password)) {
    errors.push("La contraseña es obligatoria");
  }

  return { valid: errors.length === 0, errors };
}
