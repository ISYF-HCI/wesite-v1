// Site-wide navigation, socials and redirects.
// Paths are relative to the site base (see composables/useBase.js).
import { upcoming } from "./editions.js";

export const socials = {
  instagram: { url: "https://www.instagram.com/isyf.2026/", handle: "@isyf.2026" },
  youtube: { url: "https://www.youtube.com/channel/UCs9CbJcxC2x8OPYiNx5QDTg", handle: "@isyfsg" },
  email: "reach_isyf@hci.edu.sg",
};

// Sections of the upcoming edition's site. Until a page exists at
// pages/<year>/<slug>.vue, visiting it redirects to the coming-soon page
// (middleware/redirects.global.js), so add pages here as they go live.
export const upcomingSections = [
  { slug: "about", label: "About", icon: "info", archived: "2026/about/about_isyf" },
  { slug: "programme", label: "Programme", icon: "event_note", archived: "2026/programme" },
  { slug: "profiles", label: "Profiles", icon: "person", archived: "2026/profiles/speakers" },
  { slug: "photos", label: "Photos", icon: "photo_library", archived: "2026/photos" },
  { slug: "faq", label: "FAQ", icon: "help_outline", archived: "2026/faq" },
];

// The forum's three goals, abridged for the home page. The full text is in
// components/goals.vue on the archived About page.
export const goals = [
  {
    title: "Inspire Passion for Science Among Youth",
    text: "Invited Nobel laureates and eminent scientists will inspire them through stories of their own life experiences and scientific discoveries.",
  },
  {
    title: "Establish Cooperation and Friendship Amongst Young Talented Science Students",
    text: "Students will have many opportunities to interact in different cross-cultural groups and forge strong bonds with each other throughout the Forum.",
  },
  {
    title: "Build Capacities of Science Educators",
    text: "Through professional sharing and discussions among Science educators, ISYF helps build the competencies of teachers who are navigating an evolving educational landscape.",
  },
];

export const mainMenu = [
  { label: "Home", href: "" },
  {
    label: `ISYF ${upcoming.year}`,
    children: [
      { label: "Overview", href: `${upcoming.year}`, icon: "campaign" },
      ...upcomingSections.map((s) => ({
        label: s.label,
        href: `${upcoming.year}/${s.slug}`,
        icon: s.icon,
      })),
    ],
  },
  {
    label: "History",
    children: [
      { label: "Editions & Themes", href: "history", icon: "history_edu" },
      { label: "Laureates & Scientists", href: "laureates", icon: "workspace_premium" },
    ],
  },
  {
    label: "Archive",
    children: [{ label: "ISYF 2026", href: "2026", icon: "inventory_2" }],
  },
];

// Archived edition websites, keyed by year. Each keeps its original menu.
export const archives = {
  2026: {
    title: "ISYF 2026",
    summary: "18th edition · 5–9 January 2026",
    // Shortcuts shown wherever the edition is listed
    highlights: [
      { label: "Website", href: "2026" },
      { label: "Programme", href: "2026/programme" },
      { label: "Speakers", href: "2026/profiles/speakers" },
      { label: "Photos", href: "2026/photos" },
      { label: "Infographics", href: "2026/archive/infographics" },
    ],
    menu: [
      { label: "Home", href: "2026" },
      {
        label: "About",
        children: [
          { label: "About ISYF", href: "2026/about/about_isyf" },
          { label: "About Singapore", href: "2026/about/about_singapore" },
        ],
      },
      { label: "Programme", href: "2026/programme" },
      {
        label: "Profiles",
        children: [
          { label: "Speakers", href: "2026/profiles/speakers", icon: "person" },
          { label: "Schools", href: "2026/profiles/schools", icon: "school" },
          { label: "Organising Team", href: "2026/profiles/organising-team", icon: "group" },
        ],
      },
      { label: "Photos", href: "2026/photos" },
      { label: "FAQ", href: "2026/faq" },
    ],
  },
};

// URLs from when the ISYF 2026 site lived at the root. Event pages now point
// at their ISYF 2027 counterparts, which link back to the same 2026 page.
const legacyEventPages = [
  "/about/about_isyf",
  "/about/about_singapore",
  "/programme",
  "/profiles/speakers",
  "/profiles/schools",
  "/profiles/organising-team",
  "/photos",
  "/faq",
];
export const legacyRedirects = {
  ...Object.fromEntries(legacyEventPages.map((p) => [p, `/${upcoming.year}${p}`])),
  "/archive/infographics": "/2026/archive/infographics",
  // The 2026 reflection page was never finished; its photos live on Photos
  "/reflection": "/2026/photos",
  "/2026/reflection": "/2026/photos",
};

// Pages of an archived site, flattened from its menu.
export function archivePages(year) {
  return (archives[year]?.menu ?? []).flatMap((entry) => entry.children ?? [entry]);
}
