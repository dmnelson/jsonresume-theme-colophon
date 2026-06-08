"use strict";

const fs = require("node:fs");
const path = require("node:path");

const styles = fs.readFileSync(path.join(__dirname, "style.css"), "utf8");

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const DATE_PATTERN = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/;

function text(value) {
  if (typeof value === "string" || typeof value === "number") {
    return String(value).trim();
  }

  return "";
}

function hasText(value) {
  return text(value).length > 0;
}

function entries(value) {
  return Array.isArray(value) ? value.filter((item) => item && typeof item === "object") : [];
}

function strings(value) {
  return Array.isArray(value) ? value.map(text).filter(Boolean) : [];
}

function joinHtml(parts) {
  return parts.filter(Boolean).join("");
}

function escapeHtml(value) {
  return text(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function safeUrl(value) {
  const url = text(value).replace(/[\u0000-\u001f\u007f]/g, "");

  if (!url) {
    return "";
  }

  if (url.startsWith("//")) {
    return `https:${url}`;
  }

  if (url.startsWith("/") || url.startsWith("#")) {
    return url;
  }

  const protocol = url.match(/^([a-z][a-z0-9+.-]*):/i);
  if (protocol) {
    return ["http", "https", "mailto", "tel"].includes(protocol[1].toLowerCase()) ? url : "";
  }

  return `https://${url}`;
}

function link(label, url, className = "") {
  const content = escapeHtml(label);
  const href = safeUrl(url);

  if (!content || !href) {
    return content;
  }

  const classAttribute = className ? ` class="${escapeHtml(className)}"` : "";
  return `<a${classAttribute} href="${escapeHtml(href)}">${content}</a>`;
}

function formatDate(value) {
  const date = text(value);

  if (!date) {
    return "";
  }

  const match = date.match(DATE_PATTERN);
  if (!match) {
    return date;
  }

  const year = match[1];
  const month = Number(match[2]);

  if (!month || month < 1 || month > 12) {
    return year;
  }

  return `${MONTHS[month - 1]} ${year}`;
}

function dateRange(startDate, endDate) {
  const start = escapeHtml(formatDate(startDate));
  const end = escapeHtml(formatDate(endDate));

  if (start && end) {
    return `${start} &ndash; ${end}`;
  }

  if (start) {
    return `${start} &ndash; Present`;
  }

  return end;
}

function formatLocation(location) {
  if (hasText(location)) {
    return text(location);
  }

  if (!location || typeof location !== "object") {
    return "";
  }

  return [
    location.address,
    location.city,
    location.region,
    location.postalCode,
    location.countryCode,
  ]
    .map(text)
    .filter(Boolean)
    .join(", ");
}

function languageTag(value) {
  const language = text(value);

  return /^[a-z]{2,3}(?:-[a-z0-9]{2,8})*$/i.test(language) ? language : "en";
}

function prose(value, className = "prose") {
  const content = text(value);

  if (!content) {
    return "";
  }

  const paragraphs = content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replaceAll("\n", "<br>")}</p>`)
    .join("");

  return paragraphs ? `<div class="${escapeHtml(className)}">${paragraphs}</div>` : "";
}

function highlights(value) {
  const items = strings(value);

  if (!items.length) {
    return "";
  }

  return `<ul class="highlights">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

// Accepts already-rendered safe HTML fragments, such as escaped text or link() output.
function entryMeta(items) {
  const content = items.filter(Boolean);

  if (!content.length) {
    return "";
  }

  return `<p class="entry-meta">${content.map((item) => `<span>${item}</span>`).join("")}</p>`;
}

function keywords(value, label = "") {
  const items = strings(value);

  if (!items.length) {
    return "";
  }

  const prefix = label ? `<span class="detail-label">${escapeHtml(label)}</span>` : "";
  return `<p class="detail-line">${prefix}${escapeHtml(items.join(" / "))}</p>`;
}

function section(id, title, content) {
  if (!content) {
    return "";
  }

  return `<section class="resume-section resume-section-${id}" aria-labelledby="${id}">
    <h2 id="${id}">${escapeHtml(title)}</h2>
    <div class="section-content">${content}</div>
  </section>`;
}

function entry(title, metadata, content, url = "") {
  if (!title && !metadata && !content) {
    return "";
  }

  const heading = title ? `<h3>${url ? link(title, url) : escapeHtml(title)}</h3>` : "";
  const header = heading || metadata ? `<header class="entry-header">${heading}${metadata}</header>` : "";

  return `<article class="entry">
    ${header}
    ${content}
  </article>`;
}

function renderEntrySection(id, title, value, renderItem) {
  return section(id, title, joinHtml(entries(value).map(renderItem)));
}

function renderBasics(basics) {
  const resumeLabel = text(basics.label);
  const name = text(basics.name) || resumeLabel || "Resume";
  const label = resumeLabel && resumeLabel !== name ? `<p class="role">${escapeHtml(resumeLabel)}</p>` : "";
  const contact = [];
  const location = formatLocation(basics.location);
  const email = text(basics.email);
  const phone = text(basics.phone);
  const website = text(basics.url || basics.website);

  if (location) {
    contact.push(escapeHtml(location));
  }
  if (email) {
    contact.push(link(email, `mailto:${email}`));
  }
  if (phone) {
    const phoneHref = phone.replace(/[^\d+]/g, "");
    contact.push(phoneHref ? link(phone, `tel:${phoneHref}`) : escapeHtml(phone));
  }
  if (website) {
    contact.push(link(website.replace(/^https?:\/\//, "").replace(/\/$/, ""), website));
  }

  for (const profile of entries(basics.profiles)) {
    const network = text(profile.network);
    const username = text(profile.username);
    const profileLabel = network || username || text(profile.url);

    if (profileLabel) {
      contact.push(link(profileLabel, profile.url));
    }
  }

  const contactList = contact.length
    ? `<ul class="contact-list" aria-label="Contact details">${contact.map((item) => `<li>${item}</li>`).join("")}</ul>`
    : "";

  return `<header class="resume-header">
    <h1>${escapeHtml(name)}</h1>
    ${label}
    ${contactList}
    ${prose(basics.summary, "introduction")}
  </header>`;
}

function renderWork(value) {
  return renderEntrySection("work", "Work", value, (item) => {
    const position = text(item.position);
    const organization = text(item.name);
    const title = position || organization;
    const organizationMeta = organization && organization !== title ? link(organization, item.url) : "";
    const metadata = entryMeta([
      organizationMeta,
      escapeHtml(formatLocation(item.location)),
      dateRange(item.startDate, item.endDate),
    ]);
    const body = joinHtml([prose(item.summary || item.description), highlights(item.highlights)]);

    return entry(title, metadata, body, !position ? item.url : "");
  });
}

function renderVolunteer(value) {
  return renderEntrySection("volunteer", "Volunteer", value, (item) => {
    const position = text(item.position);
    const organization = text(item.organization);
    const title = position || organization;
    const metadata = entryMeta([
      organization && organization !== title ? link(organization, item.url) : "",
      escapeHtml(formatLocation(item.location)),
      dateRange(item.startDate, item.endDate),
    ]);
    const body = joinHtml([prose(item.summary), highlights(item.highlights)]);

    return entry(title, metadata, body, !position ? item.url : "");
  });
}

function renderEducation(value) {
  return renderEntrySection("education", "Education", value, (item) => {
    const studyType = text(item.studyType);
    const area = text(item.area);
    const title = studyType && area ? `${studyType}, ${area}` : studyType || area || text(item.institution);
    const institution = text(item.institution);
    const metadata = entryMeta([
      institution && institution !== title ? link(institution, item.url) : "",
      escapeHtml(formatLocation(item.location)),
      dateRange(item.startDate, item.endDate),
      hasText(item.score) ? `Score: ${escapeHtml(item.score)}` : "",
    ]);
    const body = joinHtml([prose(item.summary), keywords(item.courses, "Courses")]);

    return entry(title, metadata, body, !studyType && !area ? item.url : "");
  });
}

function renderProjects(value) {
  return renderEntrySection("projects", "Projects", value, (item) => {
    const roles = strings(item.roles);
    const entity = text(item.entity);
    const projectMeta = [
      entity ? escapeHtml(entity) : "",
      roles.length ? escapeHtml(roles.join(", ")) : "",
      dateRange(item.startDate, item.endDate),
    ];
    const body = joinHtml([
      prose(item.description || item.summary),
      highlights(item.highlights),
      keywords(item.keywords, "Built with"),
    ]);

    return entry(text(item.name), entryMeta(projectMeta), body, item.url);
  });
}

function renderPublications(value) {
  return renderEntrySection("publications", "Publications", value, (item) =>
    entry(
      text(item.name || item.title),
      entryMeta([escapeHtml(item.publisher), escapeHtml(formatDate(item.releaseDate || item.date))]),
      prose(item.summary),
      item.url,
    ),
  );
}

function renderAwards(value) {
  return renderEntrySection("awards", "Awards", value, (item) =>
    entry(
      text(item.title),
      entryMeta([escapeHtml(item.awarder), escapeHtml(formatDate(item.date))]),
      prose(item.summary),
      item.url,
    ),
  );
}

function renderCertificates(value) {
  return renderEntrySection("certificates", "Certificates", value, (item) =>
    entry(
      text(item.name),
      entryMeta([escapeHtml(item.issuer), escapeHtml(formatDate(item.date))]),
      prose(item.summary),
      item.url,
    ),
  );
}

function renderDetailList(id, title, value, options) {
  const content = joinHtml(
    entries(value).map((item) => {
      const name = text(item[options.name]);
      const primary = strings(item[options.items]);
      const secondary = text(item[options.secondary]);

      if (!name && !primary.length && !secondary) {
        return "";
      }

      const detail = [
        primary.length ? escapeHtml(primary.join(" / ")) : "",
        secondary ? `<span class="quiet">${escapeHtml(secondary)}</span>` : "",
      ]
        .filter(Boolean)
        .join(" ");

      const term = escapeHtml(name || title);
      return `<div class="detail-item"><dt>${term}</dt><dd>${detail}</dd></div>`;
    }),
  );

  return section(id, title, content ? `<dl class="detail-list">${content}</dl>` : "");
}

function renderReferences(value) {
  return renderEntrySection("references", "References", value, (item) => {
    const name = text(item.name);
    const reference = text(item.reference);

    if (!name && !reference) {
      return "";
    }

    const heading = name && name.toLowerCase() !== "references" ? `<h3>${escapeHtml(name)}</h3>` : "";
    const quote = reference ? `<blockquote>${escapeHtml(reference)}</blockquote>` : "";

    return `<article class="entry reference">
      ${heading}
      ${quote}
    </article>`;
  });
}

function render(resume = {}) {
  const data = resume && typeof resume === "object" ? resume : {};
  const basics = data.basics && typeof data.basics === "object" ? data.basics : {};
  const meta = data.meta && typeof data.meta === "object" ? data.meta : {};
  const name = text(basics.name) || "Resume";
  const language = languageTag(meta.language);
  const sections = joinHtml([
    renderWork(data.work),
    renderProjects(data.projects),
    renderVolunteer(data.volunteer),
    renderEducation(data.education),
    renderDetailList("skills", "Skills", data.skills, {
      name: "name",
      items: "keywords",
      secondary: "_unused",
    }),
    renderPublications(data.publications),
    renderCertificates(data.certificates),
    renderAwards(data.awards),
    renderDetailList("languages", "Languages", data.languages, {
      name: "language",
      items: "_unused",
      secondary: "fluency",
    }),
    renderDetailList("interests", "Interests", data.interests, {
      name: "name",
      items: "keywords",
      secondary: "_unused",
    }),
    renderReferences(data.references),
  ]);

  return `<!doctype html>
<html lang="${escapeHtml(language)}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${escapeHtml(text(basics.summary) || `${name}'s resume`)}">
    <meta name="theme-color" content="#f3f0e8">
    <title>${escapeHtml(name)} - Resume</title>
    <style>${styles}</style>
  </head>
  <body>
    <a class="skip-link" href="#resume-content">Skip to resume content</a>
    <main class="page" id="resume-content">
      ${renderBasics(basics)}
      ${sections}
    </main>
  </body>
</html>`;
}

module.exports = { render };
