<template>
  <div>
    <Masthead :background="useBase('images/night-clocktower.webp')" :dim="0.55">
      <h1>ISYF {{ upcoming.year }}</h1>
      <p class="masthead-lede">
        The {{ ordinal(upcoming.edition) }} International Science Youth Forum,
        marking {{ yearsOfIsyf }} years of ISYF. Coming soon.
      </p>
    </Masthead>

    <div>
      <section v-if="requested" class="notice">
        <h2>{{ requested.label }} for ISYF {{ upcoming.year }} is coming soon</h2>
        <p>
          This page will go live once details for ISYF {{ upcoming.year }} are
          confirmed.
          <template v-if="requested.archived">
            In the meantime, look back at ISYF {{ previous.year }}'s
            <a :href="useBase(requested.archived.href)">{{ requested.archived.label }}</a> page.
          </template>
        </p>
      </section>

      <section class="ruled">
        <h2>The next chapter</h2>
        <p>
          Since {{ firstYear }}, ISYF has brought young scientists from around the
          world to Singapore to meet Nobel laureates and eminent scientists, share
          their research and make friends across cultures. Planning for the
          {{ ordinal(upcoming.edition) }} edition is under way, and the theme,
          dates, programme and speakers will be announced here.
        </p>

        <ul class="sections">
          <li
            v-for="section in upcomingSections"
            :key="section.slug"
            :class="{ highlighted: requested?.slug === section.slug }"
          >
            <h3>{{ section.label }}</h3>
            <span class="meta">coming soon</span>
            <a class="text-link" :href="useBase(section.archived)">
              See ISYF {{ previous.year }} <ArrowIcon />
            </a>
          </li>
        </ul>
      </section>

      <section class="ruled">
        <h2>While you wait</h2>
        <ul class="explore">
          <li>
            <a :href="useBase('history')">
              <h3>{{ yearsOfIsyf }} years of themes <ArrowIcon /></h3>
              <p>Every edition since {{ firstYear }}, from its theme to its guests.</p>
            </a>
          </li>
          <li>
            <a :href="useBase('laureates')">
              <h3>Laureates &amp; scientists <ArrowIcon /></h3>
              <p>The Nobel laureates and eminent scientists ISYF has welcomed.</p>
            </a>
          </li>
          <li>
            <a :href="useBase(previous.archive)">
              <h3>ISYF {{ previous.year }} archive <ArrowIcon /></h3>
              <p>Revisit the programme, speakers and photos of the {{ ordinal(previous.edition) }} edition.</p>
            </a>
          </li>
        </ul>
      </section>

      <section class="ruled">
        <h2>Stay updated</h2>
        <p>
          Announcements will be shared here and on our socials. For enquiries,
          write to us at <a :href="`mailto:${socials.email}`">{{ socials.email }}</a>.
        </p>
        <ul class="link-row socials">
          <li>
            <a :href="socials.instagram.url" target="_blank" rel="noopener">
              <InstagramIcon /> {{ socials.instagram.handle }}
            </a>
          </li>
          <li>
            <a :href="socials.youtube.url" target="_blank" rel="noopener">
              <YoutubeIcon /> {{ socials.youtube.handle }}
            </a>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
.masthead-lede {
  max-width: 34ch;
  margin: 0 auto;
  font-family: var(--font-serif);
  font-size: clamp(19px, 2vw, 24px);
  line-height: 1.45;
  --fg: var(--plaster);
}

/* ========== NOTICE (redirected from an unpublished page) ========== */
.notice {
  margin-block: 2rem 0;
  padding: 1.5rem 1.75rem 0.5rem;
  border-top: 2px solid var(--crimson);
  background-color: var(--primary-50);
}

.notice h2 {
  font-size: 26px;
  margin-bottom: 0.5rem;
}

.notice a {
  --fg: var(--crimson-deep);
  font-weight: 500;
}

/* ========== SECTIONS ========== */
.sections {
  list-style: none;
  padding: 0;
  margin: 2rem 0 0;
  border-top: 1px solid var(--ink);
}

.sections li {
  margin: 0;
  padding: 0.5rem 0.5rem;
  border-bottom: 1px solid var(--rule);
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 0.5rem 2rem;
}

.sections li.highlighted {
  background-color: var(--primary-50);
}

.sections h3 {
  margin: 0;
  font-size: 22px;
}

.sections .text-link {
  font-size: 15px;
  white-space: nowrap;
}

@media screen and (max-width: 560px) {
  .sections li {
    grid-template-columns: 1fr auto;
  }

  .sections .text-link {
    grid-column: 1 / -1;
    margin-top: -0.5rem;
  }
}

/* ========== EXPLORE ========== */
.explore {
  list-style: none;
  padding: 0;
  margin: 2rem 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 0 2.5rem;
}

.explore li {
  margin: 0;
  border-top: 1px solid var(--ink);
}

.explore a {
  display: block;
  padding-block: 1rem 0.5rem;
  text-decoration: none;
}

.explore h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.explore a:hover h3 {
  --fg: var(--crimson-deep);
}

.explore a:hover .arrow {
  transform: translateX(4px);
}

.explore .arrow {
  transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1);
}

.explore p {
  font-size: 15px;
  line-height: 1.55;
  --fg: var(--ink-soft);
}

/* ========== SOCIALS ========== */
.socials a {
  gap: 0.625rem;
}

.socials :deep(svg) {
  height: 18px;
  width: 18px;
  fill: var(--fg);
}
</style>

<script setup>
import { computed } from "vue";
import { useBase } from "~/composables/useBase";
import { editions, upcoming, firstYear, ordinal } from "~/data/editions";
import { upcomingSections, archivePages, socials } from "~/data/site";
import InstagramIcon from "~/components/icons/instagram.vue";
import YoutubeIcon from "~/components/icons/youtube.vue";
import ArrowIcon from "~/components/icons/arrow.vue";

useHead({ title: `ISYF ${upcoming.year} · Coming Soon` });

const route = useRoute();
const yearsOfIsyf = upcoming.year - firstYear + 1;
const previous = editions[editions.length - 1];

// Unpublished pages redirect here with ?from=<page>. Point visitors to the
// same page on the previous edition's site, or the section's closest match.
const requested = computed(() => {
  const from = String(route.query.from ?? "");
  const section = upcomingSections.find(
    (s) => from === s.slug || from.startsWith(s.slug + "/")
  );
  if (!section) return null;
  const pages = archivePages(previous.year);
  const archived =
    pages.find((p) => p.href === `${previous.year}/${from}`) ??
    pages.find((p) => p.href === section.archived);
  return { slug: section.slug, label: section.label, archived };
});
</script>
