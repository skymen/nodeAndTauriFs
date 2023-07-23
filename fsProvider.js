(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.returnExports = factory();
  }
})(typeof self !== "undefined" ? self : this, async function () {
  let fsProvider;
  let path;

  // Attempt Node.js module loading
  try {
    fsProvider = require("./nodeFsProvider");
    path = require("path");
  } catch (err) {
    // Node.js modules not available, attempt loading ES modules
    // This part of code will only work in environments that support dynamic import
    // syntax (import())
    try {
      fsProvider = await import("./tauriFsProvider.js");
      path = await import("@tauri-apps/api/path");
    } catch (err) {
      console.error("Failed to load either Node.js or ES modules");
      throw err;
    }
  }

  // Return the module
  return { fs: fsProvider, path };
});
