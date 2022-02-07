import Fastify, { FastifyInstance } from "fastify";
import fastifyHttpProxy from "fastify-http-proxy";
import dotenv from "dotenv";

dotenv.config();

const server: FastifyInstance = Fastify({ logger: true });
console.log(process.env.API_PREFIX);
// server
server.register(fastifyHttpProxy, {
    upstream: process.env.API_SERVICE,
    prefix: process.env.API_PREFIX,
});

// client
server.register(fastifyHttpProxy, {
    upstream: process.env.CLIENT_SERVICE,
    prefix: "/",
});

(async () => {
    try {
        await server.listen(process.env.GATEWAY_PORT);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
})();
