import "core-js/features/async-disposable-stack";

globalThis.BeavMusic = {
  disposes: new AsyncDisposableStack(),
};
globalThis.isDev = process.env.NODE_ENV === "development";

import getLogger from "./logger";
import "./db";
import "./app";

const log = getLogger("Main");

process.on("SIGINT", async () => {
  log.info("Stopped because of SIGINT");
  await globalThis.BeavMusic.disposes.disposeAsync();
  process.exit(0);
});
process.on("SIGTERM", async () => {
  log.info("Stopped because of SIGTERM");
  await globalThis.BeavMusic.disposes.disposeAsync();
  process.exit(0);
});

process.on("unhandledRejection", (r, p) => {
  log.error("Unhandled Rejection. \nPromise:", p, "\nReason:", r);
});
