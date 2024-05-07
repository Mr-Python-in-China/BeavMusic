import { MongoClient } from "mongodb";
import getLogger from "../logger";

const uri = process.env.DBuri || "";

const log = getLogger("db");

log.info("Starting connecting db...");
const client = new MongoClient(uri);
globalThis.BeavMusic[Symbol.dispose].push(() => {
  log.info("Closing db...");
  client.close();
});
const db = client.db();

export default db;
