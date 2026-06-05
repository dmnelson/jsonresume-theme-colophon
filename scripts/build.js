"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const sourcePath = path.join(root, "index.js");
const stylePath = path.join(root, "style.css");
const distDir = path.join(root, "dist");
const distPath = path.join(distDir, "index.js");

const source = fs.readFileSync(sourcePath, "utf8");
const styles = fs.readFileSync(stylePath, "utf8");

const runtimeStyleLoader = `"use strict";

const fs = require("node:fs");
const path = require("node:path");

const styles = fs.readFileSync(path.join(__dirname, "style.css"), "utf8");
`;

const bundledStyleLoader = `"use strict";

const styles = ${JSON.stringify(styles)};
`;

const output = source.replace(runtimeStyleLoader, bundledStyleLoader);

if (output === source) {
  throw new Error("Could not find the runtime style loader in index.js");
}

fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(distPath, output, "utf8");
console.log(`Wrote ${path.relative(root, distPath)}`);
