import log4js from "log4js";

const G = log4js.configure({
  appenders: {
    console: { type: "stdout" },
    file: {
      type: "dateFile",
      compress: true,
      filename: "./logs/server",
      pattern: "yyyy-MM-dd-hh.log",
      alwaysIncludePattern: true,
    },
  },
  categories: {
    default: {
      appenders:
        process.env.NODE_ENV === "development"
          ? ["console"]
          : ["console", "file"],
      level: process.env.NODE_ENV === "development" ? "debug" : "info",
    },
  },
});

const getLogger = (s?: string) => G.getLogger(s);

const log = getLogger("logger");
globalThis.BeavMusic[Symbol.dispose].push(() => {
  log.info("Saving logs...");
  G.shutdown();
});

export default getLogger;
