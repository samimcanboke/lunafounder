import { Buffer } from "buffer";
import processPolyfill from "./process-polyfill";

// Buffer polyfill
window.Buffer = Buffer;

// Global polyfill
window.global = window;

// Process polyfill
if (typeof window.process === "undefined") {
  window.process = processPolyfill;
}

// Crypto polyfill
if (typeof window.crypto === "undefined") {
  window.crypto = {
    getRandomValues: (arr) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
      return arr;
    },
  };
}

// Stream polyfill
if (typeof window.Stream === "undefined") {
  window.Stream = {
    Readable: class Readable {
      constructor() {}
    },
    Writable: class Writable {
      constructor() {}
    },
  };
}
