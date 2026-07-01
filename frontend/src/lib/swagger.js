import path from "path";
import { fileURLToPath } from "url";
import swaggerJsdoc from "swagger-jsdoc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoutesGlob = path
  .resolve(__dirname, "../../../backend/src/routes/**/*.js")
  .replace(/\\/g, "/");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Alerta Urbana",
      version: "1.0.0",
      description:
        "Documentación de la API del proyecto Alerta Urbana. Permite gestionar usuarios, alertas, reportes y autenticación."
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Backend express"
      }
    ],
    components: {
      schemas: {
        Alerta: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            titulo: {
              type: "string",
              example: "Accidente de tránsito"
            },
            descripcion: {
              type: "string",
              example: "Se presenta congestión por accidente en la vía principal."
            },
            ubicacion: {
              type: "string",
              example: "Carrera 7 con Calle 72"
            },
            tipo: {
              type: "string",
              example: "Movilidad"
            },
            estado: {
              type: "string",
              example: "Activa"
            },
            fecha: {
              type: "string",
              format: "date-time",
              example: "2026-06-24T13:00:00.000Z"
            }
          }
        },

        Usuario: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            nombre: {
              type: "string",
              example: "Juan Pérez"
            },
            correo: {
              type: "string",
              format: "email",
              example: "juan@email.com"
            },
            rol: {
              type: "string",
              example: "ciudadano"
            }
          }
        },

        Error: {
          type: "object",
          properties: {
            mensaje: {
              type: "string",
              example: "No se encontró el recurso solicitado."
            }
          }
        }
      }
    }
  },

  apis: [backendRoutesGlob]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;