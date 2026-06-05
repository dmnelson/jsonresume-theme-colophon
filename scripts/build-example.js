"use strict";

const fs = require("node:fs");
const path = require("node:path");
const resume = require("../example/resume.json");
const { render } = require("..");

const output = path.join(__dirname, "..", "example", "resume.html");
fs.writeFileSync(output, render(resume), "utf8");

console.log(`Wrote ${path.relative(process.cwd(), output)}`);
