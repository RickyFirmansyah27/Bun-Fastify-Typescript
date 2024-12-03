import Fastify from "fastify";
import registerRoutes from "./routes";
import { HttpLogger, Logger } from "./helper";

const fastify = Fastify();
const port = 8000;

fastify.addHook('onRequest', HttpLogger);

// Register all routes
registerRoutes(fastify);

// Start server
const start = async () => {
  try {
    await fastify.listen({ 
      port: port, 
      host: '0.0.0.0'
    });
    Logger.info(`[Fastify-Service] Server is running on port ${port}`);
  } catch (error) {
    if (error instanceof Error) {
      Logger.error(
        `Error starting server: Message: ${error.message} | Stack: ${error.stack}`
      );
    } else {
      Logger.error(`Error starting server: ${String(error)}`);
    }
    process.exit(1);
  }
};

start();