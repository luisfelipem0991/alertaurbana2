import path from "path";
import { pathToFileURL } from "url";

export async function getSwagger(req, res) {
  const previousCwd = process.cwd();
  const frontendDir = path.resolve(previousCwd, "../frontend");

  try {
    process.chdir(frontendDir);

    const swaggerModuleUrl = pathToFileURL(
      path.resolve(frontendDir, "src/lib/swagger.js")
    ).href;

    const { default: swaggerSpec } = await import(swaggerModuleUrl);

    return res.json(swaggerSpec);
  } finally {
    process.chdir(previousCwd);
  }
}
