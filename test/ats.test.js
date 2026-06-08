"use strict";

const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");

const { render } = require("..");
const example = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "example", "resume.json"), "utf8"),
);
const styles = fs.readFileSync(path.join(__dirname, "..", "style.css"), "utf8");
const html = render(example);

function decodeEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&ndash;", "-");
}

function visibleText(value) {
  return decodeEntities(
    value
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function headings(value) {
  return [...value.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((match) => ({
    level: Number(match[1]),
    text: visibleText(match[2]),
  }));
}

test("uses semantic HTML with a logical heading hierarchy", () => {
  assert.match(html, /^<!doctype html>/);
  assert.match(html, /<html lang="[a-z]{2,3}(?:-[a-z0-9]{2,8})*">/i);
  assert.match(html, /<main\b/);
  assert.match(html, /<header class="resume-header">/);
  assert.match(html, /<section\b/);
  assert.match(html, /<article\b/);

  const documentHeadings = headings(html);
  assert.equal(
    documentHeadings.filter((heading) => heading.level === 1).length,
    1,
    "the document should have exactly one h1",
  );
  assert.ok(documentHeadings.length >= 3, "the document should have descriptive section headings");

  for (const heading of documentHeadings) {
    assert.ok(heading.text.length >= 3, `heading should be descriptive: "${heading.text}"`);
  }

  for (let index = 1; index < documentHeadings.length; index += 1) {
    assert.ok(
      documentHeadings[index].level <= documentHeadings[index - 1].level + 1,
      `heading hierarchy skips from h${documentHeadings[index - 1].level} to h${documentHeadings[index].level}`,
    );
  }
});

test("avoids structures and resources that commonly impede ATS parsing", () => {
  for (const tag of ["table", "img", "svg", "canvas", "script", "iframe", "form"]) {
    assert.doesNotMatch(html, new RegExp(`<${tag}\\b`, "i"));
  }

  assert.doesNotMatch(styles, /@font-face|@import|column-count/i);
  assert.doesNotMatch(styles, /(?:^|[;{]\s*)columns\s*:/im);
  assert.doesNotMatch(styles, /(?:^|[;{]\s*)float\s*:/im);
  assert.doesNotMatch(styles, /(?:^|[;{]\s*)order\s*:/im);
  assert.doesNotMatch(styles, /grid-template-areas/i);

  const links = [...html.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)];
  const vagueLabels = new Set(["click here", "here", "read more", "link"]);

  for (const match of links) {
    const label = visibleText(match[1]).toLowerCase();
    assert.ok(label, "links should have visible text");
    assert.ok(!vagueLabels.has(label), `link text should be descriptive: "${label}"`);
  }
});

test("preserves representative text from every supported resume section", () => {
  const text = visibleText(html);
  const expectedBySection = {
    basics: ["Richard Hendricks", "richard@piedpiper.example", "Palo Alto", "GitHub"],
    work: ["Pied Piper", "Founder & CEO", "Designed and implemented the original compression engine"],
    projects: ["Pied Piper Compression Engine", "Benchmarking"],
    volunteer: ["Bay Area Code Mentors", "Volunteer Mentor"],
    education: ["Stanford University", "Bachelor of Science", "Distributed Systems"],
    skills: ["Systems & Infrastructure", "Performance optimization"],
    publications: ["A Practical Approach to Lossless Compression", "Journal of Fictional Computer Systems"],
    certificates: ["Distributed Systems Design Intensive", "Systems Lab Example"],
    awards: ["Startup Battlefield Winner", "Example Startup Conference"],
    languages: ["English", "Native speaker"],
    interests: ["Information theory", "Entropy coding"],
    references: ["Available upon request"],
  };

  for (const [section, expectedValues] of Object.entries(expectedBySection)) {
    if (section !== "basics") {
      assert.match(html, new RegExp(`<h2 id="${section}">`));
    }

    for (const expected of expectedValues) {
      assert.ok(text.includes(expected), `${section} should include "${expected}"`);
    }
  }
});

test("uses local standard font fallbacks and a single-column print layout", () => {
  assert.match(
    styles,
    /--font-body:[^;]*(?:system-ui|-apple-system|"Segoe UI"|Arial|Helvetica)/i,
  );

  const printStart = styles.indexOf("@media print");
  assert.notEqual(printStart, -1, "print styles should be present");

  const screenStyles = styles.slice(0, printStart);
  const printStyles = styles.slice(printStart);
  const rootFontMatch = screenStyles.match(/html\s*\{[^}]*font-size:\s*([0-9.]+)px/i);
  const rootFontSize = rootFontMatch ? Number(rootFontMatch[1]) : 16;

  for (const match of screenStyles.matchAll(/font-size:\s*([0-9.]+)(px|rem)/gi)) {
    const size = Number(match[1]);
    const pixels = match[2].toLowerCase() === "rem" ? size * rootFontSize : size;
    assert.ok(pixels >= 10, `screen font size should be at least 10px: ${match[0]}`);
  }

  assert.match(styles, /@page\s*\{/);
  assert.match(printStyles, /\.resume-section\s*\{[^}]*display:\s*block;/s);
  assert.match(printStyles, /\.page\s*\{[^}]*max-width:\s*none;/s);
});
