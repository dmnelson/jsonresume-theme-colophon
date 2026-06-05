"use strict";

const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");

const theme = require("..");
const example = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "example", "resume.json"), "utf8"),
);

test("exports a render function and returns a complete HTML document", () => {
  assert.equal(typeof theme.render, "function");

  const html = theme.render(example);

  assert.match(html, /^<!doctype html>/);
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<style>[\s\S]+<\/style>/);
  assert.match(html, /<\/html>$/);

  for (const section of [
    "work",
    "projects",
    "volunteer",
    "education",
    "skills",
    "publications",
    "certificates",
    "awards",
    "languages",
    "interests",
    "references",
  ]) {
    assert.match(html, new RegExp(`<h2 id="${section}">`));
  }

  assert.match(html, /Apr 2014 &ndash; Dec 2019/);
  assert.match(html, /Oct 2015/);
  assert.doesNotMatch(html, />Advanced</);
});

test("does not crash when optional sections and fields are missing", () => {
  assert.doesNotThrow(() => theme.render());
  assert.doesNotThrow(() =>
    theme.render({
      basics: { name: "Sparse Example" },
      work: [{ position: "Engineer" }],
      skills: [{ name: "Clear writing" }],
    }),
  );

  const html = theme.render({ basics: { name: "Sparse Example" } });
  assert.doesNotMatch(html, /<h2 id="work">/);
  assert.doesNotMatch(html, /<h2 id="education">/);
});

test("does not normalize malformed date strings", () => {
  const html = theme.render({
    basics: { name: "Date Example" },
    work: [{ position: "Engineer", startDate: "2024-02-garbage" }],
  });

  assert.match(html, /2024-02-garbage &ndash; Present/);
  assert.doesNotMatch(html, /Feb 2024 &ndash; Present/);
});

test("does not render empty entry headers for content-only entries", () => {
  const html = theme.render({
    basics: { name: "Content Example" },
    work: [{ summary: "Content without a title or metadata." }],
  });

  assert.doesNotMatch(html, /<header class="entry-header">\s*<\/header>/);
  assert.match(html, /Content without a title or metadata\./);
});

test("renders unnamed detail-list items with a section fallback term", () => {
  const html = theme.render({
    basics: { name: "Detail Example" },
    skills: [{ keywords: ["Compression", "Distributed systems"] }],
  });

  assert.doesNotMatch(html, /<dt><\/dt>/);
  assert.match(html, /<dt>Skills<\/dt><dd>Compression \/ Distributed systems<\/dd>/);
});

test("normalizes common URL forms while preserving safe relative links", () => {
  const html = theme.render({
    basics: {
      name: "URL Example",
      url: "example.com",
      profiles: [{ network: "GitHub", url: "//github.com/example" }],
    },
    projects: [{ name: "Relative Project", url: "/projects/relative" }],
  });

  assert.match(html, /href="https:\/\/example\.com"/);
  assert.match(html, /href="https:\/\/github\.com\/example">GitHub<\/a>/);
  assert.match(html, /href="\/projects\/relative">Relative Project<\/a>/);
});

test("does not duplicate references as an entry heading", () => {
  const html = theme.render({
    basics: { name: "References Example" },
    references: [{ name: "References", reference: "Available on request." }],
  });

  assert.match(html, /<h2 id="references">References<\/h2>/);
  assert.doesNotMatch(html, /<h3>References<\/h3>/);
  assert.match(html, /Available on request\./);
});

test("escapes text and rejects unsafe URL protocols", () => {
  const html = theme.render({
    basics: {
      name: "<script>alert('name')</script>",
      summary: "<img src=x onerror=alert(1)>",
      url: "javascript:alert(1)",
    },
    projects: [
      {
        name: "<strong>Unsafe project</strong>",
        url: "data:text/html,unsafe",
        startDate: "<svg onload=alert(1)>",
      },
    ],
  });

  assert.doesNotMatch(html, /<script>alert/);
  assert.doesNotMatch(html, /<img src=x/);
  assert.doesNotMatch(html, /href="javascript:/);
  assert.doesNotMatch(html, /href="data:/);
  assert.doesNotMatch(html, /<svg onload/);
  assert.match(html, /&lt;strong&gt;Unsafe project&lt;\/strong&gt;/);
});
