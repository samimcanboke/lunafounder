const processPolyfill = {
  env: { DEBUG: undefined },
  version: "",
  nextTick: (cb) => setTimeout(cb, 0),
  platform: "browser",
  browser: true,
  versions: {
    node: "16.0.0",
    v8: "9.0.0",
  },
};

export default processPolyfill;
