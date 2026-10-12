---
name: ISYF @ Singapore
description: Hwa Chong heritage, the look of the ISYF-wide pages, taken from the clocktower building, the school's logo red and its honour boards.
colors:
  plaster: "#f6f5f1"
  ink: "#1f1a19"
  ink-soft: "#4d4542"
  ink-mute: "#6b625e"
  rule: "#d6d0c6"
  crimson: "#e10a19"
  crimson-deep: "#b0101a"
  crimson-wash: "#fbeaeb"
  slate: "#21282c"
  gilt: "#e6c878"
typography:
  display:
    fontFamily: "Libre Caslon Display, Libre Caslon Text, Georgia, serif"
    fontSize: "clamp(44px, 6vw, 76px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Libre Caslon Display, Libre Caslon Text, Georgia, serif"
    fontSize: "clamp(30px, 3.4vw, 44px)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Libre Caslon Display, Libre Caslon Text, Georgia, serif"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: 1.25
  serif-text:
    fontFamily: "Libre Caslon Text, Georgia, serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.4
  engraved-name:
    fontFamily: "Libre Caslon Text, Georgia, serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "0.08em"
  lede:
    fontFamily: "Lexend, Helvetica Neue, Arial, sans-serif"
    fontSize: "19px"
    fontWeight: 350
    lineHeight: 1.6
  body:
    fontFamily: "Lexend, Helvetica Neue, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 350
    lineHeight: 1.65
  label:
    fontFamily: "Libre Caslon Text, Georgia, serif"
    fontSize: "15px"
    fontWeight: 400
    letterSpacing: "0.06em"
    fontFeature: "smcp"
rounded:
  corner: "2px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "2rem"
  lg: "3rem"
  section-top: "2.5rem"
  section-bottom: "4rem"
  content-width: "1100px"
components:
  plaque:
    backgroundColor: "{colors.crimson}"
    textColor: "{colors.plaster}"
    rounded: "{rounded.corner}"
    padding: "0 1.375rem"
    height: "48px"
  plaque-hover:
    backgroundColor: "{colors.crimson-deep}"
    textColor: "{colors.plaster}"
  text-link:
    textColor: "{colors.crimson-deep}"
    height: "44px"
  honour-board:
    backgroundColor: "{colors.plaster}"
    textColor: "{colors.ink}"
    padding: "2.5rem 0 4rem"
  notice:
    backgroundColor: "{colors.crimson-wash}"
    textColor: "{colors.ink}"
    padding: "1.5rem 1.75rem 0.5rem"
  year-chip-current:
    backgroundColor: "{colors.crimson}"
    textColor: "{colors.plaster}"
    rounded: "{rounded.corner}"
    height: "32px"
  select:
    backgroundColor: "{colors.plaster}"
    textColor: "{colors.ink}"
    rounded: "{rounded.corner}"
    height: "40px"
  footer:
    backgroundColor: "{colors.slate}"
    textColor: "{colors.plaster}"
  mobile-menu:
    backgroundColor: "{colors.slate}"
    textColor: "{colors.plaster}"
---

# Design System: ISYF @ Singapore

## Overview

**Creative North Star: "The Clocktower Honour Board"**

The ISYF-wide pages (home, history, laureates, the upcoming-edition page) borrow their materials from Hwa Chong Institution's clocktower building: cool plaster-white walls, the school's red (matched to the Hwa Chong logo), and the honour boards where names are engraved year by year. The proof ISYF offers is lineage, so the system is built to set records: editions, years, themes and laureate names, ruled and ordered like a ledger rather than dressed up like a summit landing page.

Density is editorial and calm. Plaster carries most of every page (roughly 60%), charcoal ink carries the text (roughly 30%), and red is an accent only (roughly 10%): years, rules, the one primary plaque, links. There are no red sections or pages. Ink hairlines divide the plaster into ruled sections with a heading column; the honour board is set apart by a 2px red rule and red numerals, not by a field or a frame. The only dark surface is the dark grey footer and mobile menu, shared with the archived sites. Corners are nearly square, nothing floats on shadows, and motion is limited to one settling moment on the honour board and small arrow nudges.

**Scope.** This world applies only where `layouts/template.vue` sets `#page.heritage`, which is every page that is not an archived edition. Archived edition sites (currently `/2026`) carry `#page.archived` and deliberately keep their original look from `assets/css/index.css` (Fraunces / Lexend, blue primary). Do not restyle them, and do not move heritage rules out of the `#page.heritage` scope: shared components (nav, footer, masthead, supporters) must render unchanged in archives. Heritage achieves its look by re-pointing the shared tokens (`--fg`, `--bg`, `--primary-*`, `--gray-*`, `--gold`) inside that scope.

**Yearly handover.** A new student committee takes over each year and edits only `data/` (`editions.js`, `scientists.js`, `site.js`). Every pattern here must accept any count of editions, laureates or years without hand tuning: lists flow into auto-fill grids and CSS columns, counts are computed from data, and no layout depends on a specific entry.

**Key Characteristics:**
- Cool plaster ground, charcoal-ink text, Hwa Chong red as the single accent (about 60 / 30 / 10)
- No red fields and no double frames; gilt survives only as a hover colour in the dark nav
- Hairline rules (1px ink and stone, 2px red for a featured section) instead of cards and shadows
- Libre Caslon Display for headings and years; Libre Caslon Text for themes, names and small-caps labels; Lexend for running text
- 2px corners everywhere; no pills
- Data-driven lists that grow with each edition

## Colors

A restrained plaster-and-ink ground with one bright Hwa Chong red used only as an accent, never as a field.

### Primary
- **Hwa Chong Red** (crimson, #e10a19): the school's logo red, for large or graphic marks only: large year numerals (themes list, honour board, history timeline), the 2px rule that opens the honour board and the /2027 notice, the primary plaque, the selected filter underline, the current year chip, the timeline lozenges, link underlines, scrollbar thumb and the focus ring. Plaster on it reaches 4.5:1, so it carries plaque and chip text.
- **Deep Red** (crimson-deep, #b0101a): small red text, which needs more contrast than the logo red gives: text links, filter tabs, laureate year links, reset links, hover colour of links and names on plaster, the plaque's hover state and the selection highlight (6.6:1 on plaster).
- **Red Wash** (crimson-wash, #fbeaeb): the only tint. Marks a targeted laureate row (`:target`), a highlighted coming-soon section, and the ground of the /2027 notice.

### Secondary
- **Honour Gilt** (gilt, #e6c878): survives only as the hover and open colour of nav items on dark grounds (the dark grey mobile menu and the translucent nav over photography). Never on page content.

### Neutral
- **Clocktower Plaster** (plaster): page ground and nav, text on the plaque, on the footer and on photography. Cool, not cream.
- **Archive Slate** (slate, #21282c): the footer and the mobile menu panel, the same dark grey as the archived sites. The only dark surface.
- **Lacquer Ink** (ink): body text, engraved names on the honour board, headings, and the 1px rule that opens every section, the nav underline and the timeline spine.
- **Soft Ink** (ink-soft): ledes and secondary paragraphs.
- **Muted Ink** (ink-mute): small-caps meta lines, the italic prize lines on the honour board, "to be announced" placeholders, source notes.
- **Hairline Stone** (rule): the quiet 1px rules between rows inside a section.

### Named Rules
**The Accent-Only Rule.** Red is a mark, never a field: a numeral, a rule, a link, one plaque per view. Aim for roughly 60% plaster, 30% charcoal ink, 10% red on any screen. No red sections, pages or panels, no red side stripes; the Red Wash is the only red-tinted ground.

**The Small-Red-Is-Deep Rule.** Red text under about 24px uses Deep Red (#b0101a); the logo red (#e10a19) is for large numerals, rules and filled shapes.

**The Gilt-in-the-Dark Rule.** Gilt appears only as a nav hover colour on the dark grey menu or over photography. Never on plaster, never as a frame.

## Typography

**Display Font:** Libre Caslon Display (with Libre Caslon Text, Georgia)
**Serif Text Font:** Libre Caslon Text (with Georgia), regular and italic
**Body Font:** Lexend (with Helvetica Neue, Arial), weight 350 at rest, 500 for actions

**Character:** A high-contrast engraved Caslon for headings and numerals, set against a soft, open Lexend for reading. The serif carries the record (years, themes, names); the sans carries explanation.

### Hierarchy
- **Display** (400, clamp(44px, 6vw, 76px), 1.02): page h1. The home hero goes larger (clamp(56px, 8.2vw, 136px), 0.98, -0.02em) and the 2027 masthead larger still (clamp(64px, 11vw, 150px)).
- **Headline** (400, clamp(30px, 3.4vw, 44px), 1.1): section h2, balanced wrap. The honour board heading steps up to clamp(36px, 4.4vw, 60px).
- **Title** (400, 22px, 1.25): h3 for rows and sub-items (20px in the goals grid, 32px for archive entries).
- **Record numerals** (Caslon Display, 26-44px, lining numerals, Hwa Chong Red): edition years in the themes list, the timeline and the board. Smaller 18px year links use Deep Red.
- **Serif text** (Libre Caslon Text 17-26px): edition themes, quoted in curly quotes on history.
- **Engraved name** (Libre Caslon Text 14px, uppercase, 0.08em, Lacquer Ink): laureate names on the home honour board only, with the prize line beneath in italic Muted Ink.
- **Lede** (Lexend 350, 19px, 1.6, Soft Ink): the opening paragraph of a page (17px on mobile).
- **Body** (Lexend 350, 16px, 1.65, max 68ch).
- **Label** (Libre Caslon Text 15px, small caps via lowercase + `font-variant: small-caps`, 0.06em, Muted Ink): edition numbers and meta lines placed beside or after the thing they describe. Footer group labels use the same treatment in plaster (weight 600, 0.08em).

### Named Rules
**The Engraved Names Rule.** Uppercase tracked serif is reserved for names on the home honour board (and the nav's tracked Lexend items). Do not set headings or running text in caps.

**The Serif Holds the Record Rule.** Years, themes and names are set in Caslon; explanatory prose is Lexend. Do not swap them.

## Layout

A single centred column (content width 1100px, 1.5rem page margin) of ruled sections. Each section opens with a 1px ink rule and pads 2.5rem above, 4rem below. Wide sections use a split: heading column at 1fr, content at 2fr, 3rem gap, collapsing to one column at 760px.

Full-bleed moments break the column with `margin-inline: calc(50% - 50vw)` and pad back to the content edge with `max(1.5rem, calc(50vw - 1100px / 2))`: the home hero, the 2027 masthead and the footer. The honour board stays inside the column on plaster.

Lists are ledgers: rows separated by Hairline Stone, with a year or name column and a content column (themes: 4.5rem year column in `auto-fill minmax(28rem)` columns; laureates: three-column name / honour / years grid; history: 7rem right-aligned year beside a 1px ink spine). The honour board flows year groups through CSS columns (`columns: 3 15rem`, 3rem gap, Hairline Stone column rule) so any number of years fits without hand layout.

Breakpoints observed: 560px, 640px, 700px, 760px and 1100px (desktop nav). Tap targets are at least 44px (plaque 48px).

## Elevation & Depth

Flat. Depth comes from rules (1px ink, 1px stone, 2px red), the pale Red Wash and the dark grey footer, not from shadows or frames. Three functional exceptions exist in the build: a soft drop under the desktop nav dropdown, a text-shadow that keeps the hero title legible where it crosses the photograph, and a blurred translucent ink nav over photography.

### Shadow Vocabulary
- **Dropdown drop** (`box-shadow: 0 12px 24px -12px rgba(31, 26, 25, 0.35)`): desktop nav submenu only.
- **Photo legibility** (`text-shadow: 0 2px 18px rgba(31, 26, 25, 0.45)`): plaster text over photography only.

### Named Rules
**The Rule-Not-Shadow Rule.** To set something apart, open it with a 2px red rule, and if it must stand out further, lay it on the Red Wash. Never lift it on a shadow, never box it in a frame.

## Shapes

Nearly square. Every corner that exists is 2px: plaque, select, current-year chip, focus ring, logo tiles, nav dropdown. Structure is drawn with lines: 1px ink rules opening sections, 1px stone rules between rows, a 1px vertical spine on the history timeline marked by small 9px diamond lozenges (filled red, or plaster with a red outline for the targeted and upcoming entries, whose spine turns dashed). A 2px red top rule is the heritage silhouette for something featured: the home honour board and the /2027 notice. There are no frames or double borders.

## Components

### Buttons
- **Plaque (primary):** a Hwa Chong Red plaque, 2px corners, 48px tall, 0 1.375rem padding, Lexend 500 in plaster, followed by the arrow. Hover deepens to Deep Red over 200ms (cubic-bezier(0.16, 1, 0.3, 1)) and nudges the arrow 4px right. One per view.
- **Text link (secondary):** Deep Red Lexend 500 with a 1px underline and the arrow, 44px tall. Plain links in running text stay ink with a red underline and turn Deep Red on hover.
- **Arrow:** a single drawn 20x20 SVG stroke (1.5px, square caps) at 1.125em, inheriting text colour. It is the only action glyph.

### Chips
- **Year links (laureates):** Caslon Display 18px numerals in Deep Red, no box. The year matching the active filter becomes a filled 2px-corner chip: Hwa Chong Red with plaster text.

### Inputs / Fields
- **Select:** plaster ground, 1px ink border, 2px corners, 40px tall, Lexend 15px, drawn chevron.
- **Filter buttons:** bare text in a ruled, sticky bar (ink rule above, stone rule below). Hover and selected text is Deep Red; selected adds weight 500 and a 2px Hwa Chong Red underline; counts follow in small Muted Ink (Deep Red when selected).
- **Focus:** 2px Hwa Chong Red outline, 3px offset, everywhere.

### Navigation
Plaster bar with a 1px ink underline; Caslon Display wordmark at 26px; Lexend 500 items at 14px, 0.08em tracking. Over photography it becomes translucent ink (rgba(31,26,25,0.35)) with 12px blur and plaster items whose hover is gilt. On plaster, hover and open items turn Deep Red. The mobile menu is an Archive Slate panel (#21282c) whose active and hovered links turn gilt.

### Honour Board (signature)
A section on the plaster ground, inside the content column, opened by a 2px Hwa Chong Red rule (2.5rem above, 4rem below). Inside: a heading (clamp(36px, 4.4vw, 60px)) and Soft Ink intro split above a Hairline Stone rule, then Nobel laureates grouped under the year they first joined, flowed through columns with stone column rules. Year numerals are Hwa Chong Red Caslon Display (28px); names are charcoal engraved caps that turn Deep Red on hover, with the prize line in italic Muted Ink. On first scroll into view, year groups settle in once (opacity and 10px rise, 900ms, 60ms stagger per year); reduced motion and no-JS show them immediately. The laureates page does not repeat the board: its Nobel group is an ordinary ledger on plaster like every other group.

### Ledger Rows
The default list: rows ruled by Hairline Stone under an ink top rule, a numeral or name column in Caslon, content in serif text or Lexend, an optional small-caps meta line. Used for themes, laureates (sentence-case 18px Caslon names, Soft Ink honour, Deep Red year links; Red Wash on the targeted row), coming-soon sections and the "while you wait" links (ink-ruled columns whose title turns Deep Red and whose arrow nudges on hover).

### Notice
A featured message (the /2027 page's "not published yet" note): a 2px Hwa Chong Red top rule over a Red Wash ground, 1.5rem 1.75rem padding, a 26px heading and Deep Red links. No frame.

### Link Row
A ruled strip of plain links between two stone rules, items divided by 1px stone verticals, 44px tall. Used for an archived edition's pages and for socials.

### Footer
Archive Slate field (#21282c), the same dark grey as the archived sites; plaster text, plaster small-caps group labels, logo tiles with 2px corners.

## Do's and Don'ts

### Do:
- **Do** scope every heritage rule under `#page.heritage` and re-point shared tokens there; leave `assets/css/index.css` and the `/2026` archive untouched.
- **Do** open each section with a 1px ink rule and separate rows with 1px Hairline Stone.
- **Do** set years, themes and names in Caslon, with large numerals in Hwa Chong Red (#e10a19) and small red text in Deep Red (#b0101a).
- **Do** keep red to about 10% of a screen; set a featured section apart with a 2px red top rule, and a featured message with a red rule over the Red Wash.
- **Do** drive every list and count from `data/` and lay lists out with auto-fill grids or CSS columns so the next committee never hand-tunes layout.
- **Do** keep corners at 2px and tap targets at 44px or more.

### Don't:
- **Don't** use red fields or double gold frames: no red sections, pages, panels or footers, and no gilt borders or offset-outline frames. Large saturated red tires the eye and reads as a warning; red stops meaning anything as an accent once it fills a field; and red with gold frames reads dated.
- **Don't** put gilt on page content; it is only a nav hover colour on dark grounds.
- **Don't** use pills, badges, stat boxes, chip clouds, side-stripe cards or shadowed cards.
- **Don't** place a small-caps label above a heading as a kicker; meta lines sit beside or after what they describe.
- **Don't** use icon glyphs or emoji as decoration; the drawn arrow and the social marks are the only icons.
- **Don't** restyle archived edition sites or let heritage styles leak outside `#page.heritage`.
- **Don't** add statistics, testimonials or counts that are not in `data/`.
