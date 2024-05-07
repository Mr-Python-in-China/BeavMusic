/* eslint-disable no-var */
interface BeavMusicGlobal {
  [Symbol.dispose]: (() => void | PromiseLike<void>)[];
}

declare global {
  var BeavMusic: BeavMusicGlobal;
}

export {};
