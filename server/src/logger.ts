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
      appenders: globalThis.isDev ? ["console"] : ["console", "file"],
      level: globalThis.isDev ? "debug" : "info",
    },
  },
});

const getLogger = (s?: string) => G.getLogger(s);

const log = getLogger("logger");
globalThis.BeavMusic.disposes.defer(() => {
  log.info("Saving logs...");
  G.shutdown();
});

export default getLogger;
