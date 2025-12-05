import { Hono } from "hono";
import { env } from "./lib/env";
import { cors } from "hono/cors";
import { not_found } from "./lib/errors";
import { prettyJSON } from 'hono/pretty-json'
import { logger as hono_logger } from "hono/logger";

// Middlewares
import { bruno_the_rate_limiter } from "./middlewares/rate-limit";

// Routes 
import { chatbot_route } from "./routes/chatbot";

export const app = new Hono()
	.use(cors())
	.use(prettyJSON({ query: "", space: 3 }))
	.use(hono_logger())
	.use(bruno_the_rate_limiter)
	.notFound((c) => not_found(c));

app.get('/', (c) => {
	const responsePayload = {
		message: "Hello SWS Team !",
		gamer: { name: "Thomas", status: `Je consomme ${(Math.random() * 100).toFixed()} go/s` },
	};
	return c.json(responsePayload);
});

app.get('/ping', (c) => {
	return c.text('pong');
});
 
app.route('/', chatbot_route);

export default {
	port: 4500,
	fetch: app.fetch,
};
