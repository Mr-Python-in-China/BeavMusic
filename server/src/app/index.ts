import Koa from "koa";
import getLogger from "../logger";

const PORT = +(process.env.port || "1540"),
  HOSTNAME = process.env.hostname;

const app = new Koa();
const log = getLogger("koa");

app.use(async (ctx) => {
  ctx.body = "test";
});

app.listen(PORT, HOSTNAME, () => {
  log.info("Koa server started!");
});

export default app;
