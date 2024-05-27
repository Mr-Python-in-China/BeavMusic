/* eslint-disable no-var */

declare global {
  namespace BeavMusic {
    type ServiceName = "db" | "log";
    let disposes: AsyncDisposableStack;
  }
  var isDev: boolean;
}

export {};
