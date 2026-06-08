"use strict";

const styles = ":root {\n  color-scheme: light;\n  --background: #f3f0e8;\n  --paper: #f7f4ed;\n  --text: #242321;\n  --text-soft: #4d4943;\n  --muted: #6b675f;\n  --accent: #a8442d;\n  --accent-hover: #98591d;\n  --focus: #98591d;\n  --rule: #d8d2c7;\n  --content-width: 53rem;\n  --font-body: \"Avenir Next\", Avenir, \"Segoe UI\", system-ui, -apple-system,\n    BlinkMacSystemFont, sans-serif;\n  --font-serif: Baskerville, \"Iowan Old Style\", \"Palatino Linotype\", Palatino,\n    Georgia, serif;\n  --font-mono: ui-monospace, \"SFMono-Regular\", Consolas, \"Liberation Mono\",\n    monospace;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nhtml {\n  background: var(--background);\n  color: var(--text);\n  font-family: var(--font-body);\n  font-size: 16.5px;\n  font-kerning: normal;\n  line-height: 1.66;\n  text-rendering: optimizeLegibility;\n}\n\nbody {\n  margin: 0;\n}\n\na {\n  color: var(--accent);\n  text-decoration-color: color-mix(in srgb, var(--accent) 42%, transparent);\n  text-decoration-thickness: 1px;\n  text-underline-offset: 0.2em;\n}\n\na:hover {\n  color: var(--accent-hover);\n  text-decoration-color: currentColor;\n}\n\na:focus-visible {\n  border-radius: 2px;\n  outline: 3px solid var(--focus);\n  outline-offset: 4px;\n}\n\n::selection {\n  background: #ead5aa;\n  color: var(--text);\n}\n\n.skip-link {\n  background: var(--text);\n  color: var(--background);\n  font-size: 0.78rem;\n  left: 1rem;\n  padding: 0.45rem 0.7rem;\n  position: fixed;\n  top: 1rem;\n  transform: translateY(-200%);\n  z-index: 10;\n}\n\n.skip-link:focus {\n  transform: translateY(0);\n}\n\n.page {\n  margin: 0 auto;\n  max-width: var(--content-width);\n  padding: 4.45rem 1.4rem 5.2rem;\n  width: 100%;\n}\n\n.resume-header {\n  margin-bottom: 3.65rem;\n}\n\nh1,\nh2,\nh3,\np,\nul,\ndl,\nblockquote {\n  margin-top: 0;\n}\n\nh1 {\n  font-family: var(--font-serif);\n  font-size: clamp(3.15rem, 9vw, 4.6rem);\n  font-weight: 400;\n  letter-spacing: -0.025em;\n  line-height: 0.98;\n  margin-bottom: 1rem;\n  overflow-wrap: break-word;\n  text-wrap: balance;\n}\n\n.role {\n  color: var(--text-soft);\n  font-size: 1.06rem;\n  margin-bottom: 0.45rem;\n}\n\n.contact-list {\n  align-items: baseline;\n  color: var(--muted);\n  display: flex;\n  flex-wrap: wrap;\n  font-family: var(--font-mono);\n  font-size: 0.73rem;\n  gap: 0.15rem 0;\n  line-height: 1.6;\n  list-style: none;\n  margin-bottom: 1.75rem;\n  padding: 0;\n}\n\n.contact-list li + li::before,\n.entry-meta span + span::before {\n  color: var(--rule);\n  content: \"/\";\n  display: inline-block;\n  margin: 0 0.58rem;\n}\n\n.contact-list li {\n  max-width: 100%;\n  min-width: 0;\n}\n\n.contact-list a {\n  overflow-wrap: anywhere;\n}\n\n.introduction {\n  color: #35322e;\n  font-size: 1.06rem;\n  line-height: 1.72;\n}\n\n.prose p,\n.introduction p {\n  margin-bottom: 0.75rem;\n}\n\n.prose p:last-child,\n.introduction p:last-child {\n  margin-bottom: 0;\n}\n\n.resume-section {\n  display: grid;\n  gap: 2.4rem;\n  grid-template-columns: 7rem minmax(0, 1fr);\n  margin-top: 3.05rem;\n}\n\nh2 {\n  color: var(--muted);\n  font-family: var(--font-mono);\n  font-size: 0.69rem;\n  font-weight: 500;\n  letter-spacing: 0;\n  line-height: 1.3;\n  margin: 0;\n  padding-top: 0.4rem;\n}\n\n.section-content {\n  min-width: 0;\n}\n\n.entry {\n  break-inside: avoid;\n  page-break-inside: avoid;\n}\n\n.entry + .entry {\n  margin-top: 2.12rem;\n}\n\n.entry-header {\n  margin-bottom: 0.58rem;\n}\n\nh3,\n.detail-item dt {\n  color: var(--text);\n  font-size: 1.03rem;\n  font-weight: 600;\n  letter-spacing: -0.006em;\n  line-height: 1.36;\n  margin-bottom: 0.16rem;\n}\n\nh3 a {\n  font-weight: inherit;\n}\n\n.entry-meta {\n  color: var(--muted);\n  display: flex;\n  flex-wrap: wrap;\n  font-family: var(--font-mono);\n  font-size: 0.7rem;\n  line-height: 1.55;\n  margin-bottom: 0;\n}\n\n.entry-meta span {\n  max-width: 100%;\n  min-width: 0;\n  overflow-wrap: anywhere;\n}\n\n.prose {\n  color: var(--text-soft);\n  font-size: 0.94rem;\n  line-height: 1.64;\n}\n\n.highlights {\n  color: var(--text-soft);\n  font-size: 0.92rem;\n  line-height: 1.58;\n  margin: 0.76rem 0 0;\n  padding-left: 1.12rem;\n}\n\n.highlights li {\n  padding-left: 0.16rem;\n}\n\n.highlights li + li {\n  margin-top: 0.32rem;\n}\n\n.highlights li::marker {\n  color: var(--muted);\n}\n\n.detail-line {\n  color: var(--muted);\n  font-size: 0.82rem;\n  line-height: 1.55;\n  margin: 0.72rem 0 0;\n}\n\n.detail-label {\n  color: var(--text-soft);\n  font-family: var(--font-mono);\n  font-size: 0.67rem;\n  margin-right: 0.65rem;\n}\n\n.detail-list {\n  display: grid;\n  gap: 0.82rem;\n  margin-bottom: 0;\n}\n\n.detail-item {\n  display: grid;\n  gap: 0.8rem;\n  grid-template-columns: minmax(7rem, 0.42fr) minmax(0, 1fr);\n}\n\n.detail-item dt,\n.detail-item dd {\n  margin: 0;\n}\n\n.detail-item dd {\n  color: var(--text-soft);\n  font-size: 0.88rem;\n  line-height: 1.52;\n  padding-top: 0.05rem;\n}\n\n.detail-item .quiet {\n  color: var(--muted);\n  font-family: var(--font-mono);\n  font-size: 0.65rem;\n  margin-left: 0.35rem;\n  white-space: nowrap;\n}\n\n.resume-section-skills .detail-list {\n  gap: 0.95rem;\n  max-width: 39rem;\n}\n\n.resume-section-skills .detail-item {\n  display: block;\n}\n\n.resume-section-skills .detail-item dt {\n  margin-bottom: 0.14rem;\n}\n\n.resume-section-skills .detail-item dd {\n  font-size: 0.9rem;\n  line-height: 1.55;\n}\n\n.resume-section-languages,\n.resume-section-interests,\n.resume-section-references {\n  margin-top: 2.45rem;\n}\n\n.resume-section-languages .detail-list,\n.resume-section-interests .detail-list {\n  gap: 0.58rem;\n}\n\n.resume-section-references .entry + .entry {\n  margin-top: 1.4rem;\n}\n\n.reference blockquote {\n  color: var(--text-soft);\n  font-family: var(--font-serif);\n  font-size: 1rem;\n  line-height: 1.58;\n  margin: 0;\n}\n\n@media (max-width: 40rem) {\n  .page {\n    max-width: 100%;\n    overflow-wrap: break-word;\n    padding: 2.7rem 1.1rem 3.5rem;\n  }\n\n  .resume-header {\n    margin-bottom: 3rem;\n  }\n\n  h1 {\n    font-size: 3rem;\n  }\n\n  .resume-section {\n    display: block;\n    margin-top: 2.65rem;\n  }\n\n  h2 {\n    margin-bottom: 1rem;\n    padding-top: 0;\n  }\n\n  .contact-list,\n  .entry-meta {\n    display: block;\n  }\n\n  .contact-list li,\n  .entry-meta span {\n    display: inline;\n  }\n\n  .entry + .entry {\n    margin-top: 1.75rem;\n  }\n\n  .detail-item {\n    display: block;\n  }\n\n  .detail-item dt {\n    margin-bottom: 0.05rem;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    scroll-behavior: auto !important;\n    transition: none !important;\n  }\n}\n\n@page {\n  margin: 10mm 12mm 11mm;\n  size: auto;\n}\n\n@media print {\n  :root {\n    --background: #ffffff;\n    --text: #161616;\n    --text-soft: #303030;\n    --muted: #575757;\n    --accent: #722f21;\n    --rule: #bdbdbd;\n  }\n\n  html {\n    background: #ffffff;\n    font-size: 10pt;\n    line-height: 1.52;\n    print-color-adjust: exact;\n    -webkit-print-color-adjust: exact;\n  }\n\n  body {\n    background: #ffffff;\n  }\n\n  .skip-link {\n    display: none;\n  }\n\n  .page {\n    margin: 0;\n    max-width: none;\n    padding: 0;\n  }\n\n  .resume-header {\n    margin-bottom: 18pt;\n  }\n\n  h1 {\n    font-size: 28pt;\n    letter-spacing: -0.02em;\n    margin-bottom: 6pt;\n  }\n\n  .role {\n    font-size: 9.4pt;\n    margin-bottom: 2pt;\n  }\n\n  .contact-list {\n    font-size: 6.9pt;\n    line-height: 1.52;\n    margin-bottom: 8.5pt;\n  }\n\n  .introduction {\n    font-size: 9.15pt;\n    line-height: 1.56;\n    max-width: none;\n  }\n\n  .resume-section {\n    display: block;\n    margin-top: 14.5pt;\n    padding-left: 0;\n    position: static;\n  }\n\n  .resume-section:not(.resume-section-work) {\n    border-top: 0.5pt solid rgba(120, 112, 100, 0.18);\n    padding-top: 5.8pt;\n  }\n\n  .resume-header + .resume-section {\n    border-top: 0;\n    padding-top: 0;\n  }\n\n  h2 {\n    color: #4b4741;\n    font-size: 7pt;\n    font-weight: 600;\n    letter-spacing: 0.01em;\n    margin-bottom: 4.5pt;\n    padding-top: 0;\n    position: static;\n    width: auto;\n  }\n\n  h3,\n  .detail-item dt {\n    font-size: 9.65pt;\n    font-weight: 650;\n    letter-spacing: -0.004em;\n  }\n\n  .entry + .entry {\n    margin-top: 12pt;\n  }\n\n  .entry-header {\n    margin-bottom: 4pt;\n  }\n\n  .entry-meta {\n    color: #67625b;\n    font-size: 6.35pt;\n    line-height: 1.45;\n  }\n\n  .prose {\n    font-size: 8.75pt;\n    line-height: 1.52;\n  }\n\n  .prose p,\n  .introduction p {\n    margin-bottom: 4.2pt;\n  }\n\n  .highlights {\n    font-size: 8.5pt;\n    line-height: 1.46;\n    margin-top: 5pt;\n    padding-left: 11.5pt;\n  }\n\n  .highlights li {\n    padding-left: 1.2pt;\n  }\n\n  .highlights li + li {\n    margin-top: 2.8pt;\n  }\n\n  .detail-line,\n  .detail-item dd {\n    font-size: 8.4pt;\n    line-height: 1.48;\n  }\n\n  .detail-label,\n  .detail-item .quiet {\n    color: #67625b;\n    font-size: 6.15pt;\n  }\n\n  .detail-list {\n    display: block;\n    gap: 0;\n  }\n\n  .detail-item {\n    display: block;\n  }\n\n  .detail-item + .detail-item {\n    margin-top: 6.2pt;\n  }\n\n  .resume-section-skills .detail-list {\n    gap: 5.2pt;\n  }\n\n  .resume-section-skills .detail-item + .detail-item {\n    margin-top: 5.8pt;\n  }\n\n  .resume-section-skills .detail-item dd {\n    font-size: 8.45pt;\n    line-height: 1.48;\n  }\n\n  .resume-section-languages,\n  .resume-section-interests,\n  .resume-section-references {\n    display: block;\n    margin-top: 7.5pt;\n  }\n\n  .resume-section-languages .detail-list,\n  .resume-section-interests .detail-list {\n    gap: 4pt;\n  }\n\n  .resume-section-languages .detail-item + .detail-item,\n  .resume-section-interests .detail-item + .detail-item {\n    margin-top: 4.8pt;\n  }\n\n  .resume-section-languages h2,\n  .resume-section-interests h2,\n  .resume-section-references h2 {\n    margin-bottom: 4pt;\n    padding-top: 0;\n  }\n\n  .reference blockquote {\n    font-size: 8.4pt;\n    line-height: 1.5;\n  }\n\n  a {\n    color: var(--text);\n    text-decoration-color: #8f8a82;\n    text-decoration-thickness: 0.35pt;\n    text-underline-offset: 0.16em;\n  }\n\n  .resume-section-education,\n  .resume-section-skills,\n  .resume-section-publications {\n    break-inside: avoid;\n    page-break-inside: avoid;\n  }\n\n  h2 {\n    break-after: avoid;\n    page-break-after: avoid;\n  }\n\n  h3,\n  .entry-header {\n    break-after: avoid;\n    page-break-after: avoid;\n  }\n\n  .entry {\n    break-inside: avoid;\n    page-break-inside: avoid;\n  }\n\n  .resume-section-work .entry {\n    break-inside: auto;\n    page-break-inside: auto;\n  }\n\n  .detail-item {\n    break-inside: avoid;\n    page-break-inside: avoid;\n  }\n}\n";

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
