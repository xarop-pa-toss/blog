import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => c.text('Hello from Hono on Deno Deploy!'))

await Deno.serve({port: 8787}, app.fetch);