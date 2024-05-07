globalThis.BeavMusic = {
  [Symbol.dispose]: [],
};

import getLogger from "./logger";
import "./db";
import "./app";

const log = getLogger("Main");

process.on("SIGINT", async () => {
  log.info("Stopped because of SIGINT");
  await Promise.all(globalThis.BeavMusic[Symbol.dispose].map((x) => x())).catch(
    (err) => {
      console.error("Error when stopping server.", err);
      process.exit(-1);
    },
  );
  process.exit(0);
});
process.on("SIGTERM", async () => {
  log.info("Stopped because of SIGTERM");
  await Promise.all(globalThis.BeavMusic[Symbol.dispose].map((x) => x())).catch(
    (err) => {
      console.error("Error when stopping server.", err);
      process.exit(-1);
    },
  );
  process.exit(0);
});
process.on("unhandledRejection", (r, p) => {
  log.error("Unhandled Rejection. Reason: ", p);
});
