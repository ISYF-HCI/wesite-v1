<template>
  <div>
    <h1>{{ yearsOfIsyf }} years of ISYF</h1>
    <p class="lede">
      From the first forum in {{ firstYear }} to the
      {{ ordinal(upcoming.edition) }} edition in {{ upcoming.year }}, every ISYF
      has gathered young scientists around a theme, and around the laureates
      and scientists who came to share their journeys. Here is how the story
      has unfolded.
    </p>

    <nav class="year-jump" aria-label="Jump to year">
      <div v-for="decade in decades" :key="decade.label" class="decade">
        <span class="decade-label">{{ decade.label }}</span>
        <a v-for="year in decade.years" :key="year" :href="`#y${year}`">{{ year }}</a>
      </div>
    </nav>

    <ol class="timeline">
      <li v-for="edition in editions" :key="edition.year" :id="`y${edition.year}`" class="entry">
        <div class="entry-year">
          {{ edition.year }}
          <span class="meta">
            {{ ordinal(edition.edition) }} edition<template v-if="edition.online"><br />held online</template>
          </span>
        </div>
        <div class="entry-body">
          <h2 v-if="edition.theme" class="entry-theme">“{{ edition.theme }}”</h2>
          <p v-else class="entry-theme missing">Theme not on record</p>
          <p v-if="edition.archive" class="entry-note">Its website is kept as an archive.</p>
          <p v-if="edition.dates || edition.note" class="entry-note">
            <template v-if="edition.dates">{{ edition.dates }}. </template>{{ edition.note }}
          </p>

          <dl v-if="guestGroups(edition.year).length" class="guests">
            <template v-for="group in guestGroups(edition.year)" :key="group.id">
              <dt>{{ group.label }}</dt>
              <dd>
                <template v-for="(guest, i) in group.people" :key="guest.name">
                  <a :href="useBase(`laureates#${scientistId(guest.name)}`)" :title="guest.honour">{{ guest.name }}</a><template v-if="i < group.people.length - 1">, </template>
                </template>
              </dd>
            </template>
          </dl>

          <ul v-if="edition.archive" class="link-row archive-links">
            <li v-for="link in archives[edition.year].highlights" :key="link.href">
              <a :href="useBase(link.href)">{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </li>

      <li :id="`y${upcoming.year}`" class="entry upcoming">
        <div class="entry-year">
          {{ upcoming.year }}
          <span class="meta">{{ ordinal(upcoming.edition) }} edition</span>
        </div>
        <div class="entry-body">
          <p class="entry-theme missing">Coming soon. Theme to be announced</p>
          <a class="text-link" :href="useBase(`${upcoming.year}`)">
            Follow ISYF {{ upcoming.year }} <ArrowIcon />
          </a>
        </div>
      </li>
    </ol>

    <p class="source-note">
      Compiled from the published records of past editions. Spotted something
      missing? Let us know at
      <a :href="`mailto:${socials.email}`">{{ socials.email }}</a>.
    </p>
  </div>
</template>

<style scoped>
h1 {
  margin-top: 1.5rem;
}

/* ========== YEAR JUMP ========== */
.year-jump {
  margin: 2.5rem 0 1rem;
  border-top: 1px solid var(--ink);
}

/* One row per decade, so new years never strand alone on a row */
.decade {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid var(--rule);
}

.decade-label {
  width: 4.5rem;
  font-family: var(--font-serif);
  font-variant: small-caps;
  text-transform: lowercase;
  letter-spacing: 0.06em;
  font-size: 14px;
  --fg: var(--ink-mute);
}

.year-jump a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 3.75rem;
  min-height: 44px;
  font-family: var(--font-display);
  font-size: 18px;
  text-decoration: none;
  font-variant-numeric: lining-nums;
}

.year-jump a:hover {
  --fg: var(--crimson-deep);
  text-decoration: underline;
}

/* ========== TIMELINE ========== */
.timeline {
  list-style: none;
  padding: 0;
  margin: 3rem 0;
}

.entry {
  scroll-margin-top: 5rem;
  margin: 0;
  display: grid;
  grid-template-columns: 7rem 1fr;
  gap: 2rem;
}

.entry-year {
  font-family: var(--font-display);
  font-size: 44px;
  line-height: 1;
  text-align: right;
  --fg: var(--crimson);
  font-variant-numeric: lining-nums;
}

.entry-year .meta {
  margin-top: 0.5rem;
  line-height: 1.3;
}

.entry-body {
  position: relative;
  padding: 0.375rem 0 3rem 2rem;
  border-left: 1px solid var(--ink);
}

.entry.upcoming .entry-body {
  border-left-style: dashed;
  padding-bottom: 0;
}

/* A small lozenge marks each edition on the spine */
.entry-body::before {
  content: "";
  position: absolute;
  top: 0.9rem;
  left: -5px;
  width: 9px;
  height: 9px;
  background-color: var(--crimson);
  transform: rotate(45deg);
}

.entry:target .entry-body::before,
.entry.upcoming .entry-body::before {
  background-color: var(--plaster);
  outline: 1px solid var(--crimson);
}

.entry:target .entry-year {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 8px;
}

.entry-theme {
  font-family: var(--font-serif);
  font-size: 26px;
  line-height: 1.3;
  margin-block: 0.5rem 0.75rem;
  max-width: 34ch;
}

.entry-theme.missing {
  font-family: var(--font);
  font-size: 18px;
  --fg: var(--ink-mute);
}

.entry-note {
  margin-block: 0 1rem;
}

/* ========== GUESTS ========== */
.guests {
  display: grid;
  grid-template-columns: 9.5rem 1fr;
  gap: 0.5rem 1.25rem;
  margin: 1.25rem 0 0;
  padding-top: 1rem;
  border-top: 1px solid var(--rule);
  font-size: 15px;
  line-height: 1.6;
}

.guests dt {
  font-family: var(--font-serif);
  font-variant: small-caps;
  text-transform: lowercase;
  letter-spacing: 0.06em;
  --fg: var(--ink-mute);
}

.guests dd {
  margin: 0;
  max-width: 62ch;
}

.guests a {
  text-decoration-color: var(--rule);
}

.guests a:hover {
  text-decoration-color: var(--crimson);
}

.archive-links {
  margin-top: 1.5rem;
}

.source-note {
  font-size: 14px;
  --fg: var(--ink-mute);
}

@media screen and (max-width: 640px) {
  .entry {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .entry-year {
    text-align: left;
    font-size: 36px;
    padding: 0 0 0.75rem 2rem;
    display: flex;
    align-items: baseline;
    gap: 1rem;
    border-left: 1px solid var(--ink);
    margin-left: 0;
  }

  .entry.upcoming .entry-year {
    border-left-style: dashed;
  }

  .entry-body {
    padding-top: 0;
  }

  .entry-body::before {
    top: -2.6rem;
  }

  .entry-year .meta br {
    display: none;
  }

  .decade-label {
    width: 100%;
    padding-top: 0.5rem;
  }

  .entry-theme {
    font-size: 22px;
  }

  .guests {
    grid-template-columns: 1fr;
    gap: 0.125rem;
  }

  .guests dd + dt {
    margin-top: 0.5rem;
  }
}
</style>

<script setup>
import { useBase } from "~/composables/useBase";
import ArrowIcon from "~/components/icons/arrow.vue";
import { editions, upcoming, firstYear, ordinal } from "~/data/editions";
import { categories, scientistsInYear, scientistId } from "~/data/scientists";
import { archives, socials } from "~/data/site";

useHead({ title: "Editions & Themes · ISYF" });

const yearsOfIsyf = upcoming.year - firstYear + 1;
const allYears = [...editions.map((e) => e.year), upcoming.year];

// Year links grouped by decade: "2000s", "2010s", ...
const decades = Object.values(
  allYears.reduce((groups, year) => {
    const label = `${Math.floor(year / 10) * 10}s`;
    (groups[label] ??= { label, years: [] }).years.push(year);
    return groups;
  }, {})
);

// A year's guests, grouped by distinction ("Nobel laureates", ...)
function guestGroups(year) {
  const guests = scientistsInYear(year);
  return categories
    .map((c) => ({
      id: c.id,
      label: c.label,
      people: guests.filter((g) => g.category === c.id),
    }))
    .filter((g) => g.people.length);
}
</script>
