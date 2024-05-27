import getLogger from "../logger";
import Mongoose from "mongoose";

const uri = process.env.DBuri || "";

const log = getLogger("db");
log.info("Starting connecting db...");

const mongoose = new Mongoose.Mongoose({
  debug:
    globalThis.isDev &&
    ((collectionName, methodName, ...args) =>
      log.debug(
        `Called ${collectionName}.${methodName}(${args.map((x) => JSON.stringify(x)).join(",")}))`,
      )),
  runValidators: true,
  sanitizeFilter: true,
});

mongoose
  .connect(uri)
  .then(() => {
    log.info("Connected db.");
  })
  .catch(async (err) => {
    log.error("Connect to db failed. Reason:", err);
    await globalThis.BeavMusic.disposes.disposeAsync();
    process.exit(-1);
  });

globalThis.BeavMusic.disposes.defer(async () => {
  log.info("Closing db...");
  await mongoose.disconnect();
});
