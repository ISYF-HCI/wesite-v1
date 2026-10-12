<template>
  <div class="home">
    <header class="hero">
      <img
        class="hero-photo"
        :src="useBase('images/clocktower-3.webp')"
        alt="The clocktower building of Hwa Chong Institution, Singapore"
      />
      <div class="hero-shade" aria-hidden="true"></div>
      <div class="hero-text">
        <img class="hero-logo" :src="useBase('icon_light.webp')" alt="ISYF logo" />
        <div class="title-stack">
          <h1 class="hero-title">International Science Youth Forum</h1>
          <div class="hero-title hero-title-over" aria-hidden="true">
            International Science Youth Forum
          </div>
        </div>
        <p class="lede">
          Since {{ firstYear }}, Hwa Chong Institution in Singapore has brought
          young scientists from across the globe to meet Nobel laureates and
          eminent scientists, and to learn from the people who have shaped
          science.
        </p>
        <div class="hero-actions">
          <a class="plaque" :href="useBase(`${upcoming.year}`)">
            ISYF {{ upcoming.year }} <ArrowIcon />
          </a>
          <a class="text-link" :href="useBase('history')">
            {{ editions.length }} editions since {{ firstYear }} <ArrowIcon />
          </a>
        </div>
      </div>
    </header>

    <p class="record">
      <b>{{ editions.length }}</b> editions since {{ firstYear }}.
      <b>{{ nobelLaureates.length }}</b> Nobel laureates.
      <b>{{ scientists.length }}</b> laureates and eminent scientists in all.
      <b>120+</b> students and educators each year.
    </p>

    <section class="ruled split">
      <div class="split-head">
        <h2>ISYF {{ upcoming.year }}</h2>
        <span class="meta">{{ ordinal(upcoming.edition) }} edition</span>
      </div>
      <div>
        <p>
          The {{ ordinal(upcoming.edition) }} International Science Youth Forum
          is on its way. Dates, theme, programme and speakers will be announced
          here soon.
        </p>
        <a class="text-link" :href="useBase(`${upcoming.year}`)">
          Follow ISYF {{ upcoming.year }} <ArrowIcon />
        </a>
      </div>
    </section>

    <section class="ruled split">
      <div class="split-head">
        <h2>What is ISYF?</h2>
      </div>
      <div>
        <p>
          The International Science Youth Forum (ISYF) @ Singapore is a science
          enrichment programme for students from all over the world. First
          organised in {{ firstYear }} by students of Hwa Chong Institution, it is
          hosted by the Institution's Students' Science Research Club (SSRC) and
          co-organised by the Ministry of Education, Singapore.
        </p>
        <p>
          Each forum brings delegates face to face with Nobel laureates and
          eminent scientists through lectures, Masterclasses and dialogues, with
          laureates joining in conjunction with the Global Young Scientists
          Summit. Alongside research exchanges, poster presentations and cultural
          activities, delegates explore Singapore and build friendships that last
          well beyond the forum.
        </p>
        <ul class="goals">
          <li v-for="goal in goals" :key="goal.title">
            <h3>{{ goal.title }}</h3>
            <p>{{ goal.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="board">
      <div>
        <div class="board-head">
          <h2>Nobel laureates at ISYF</h2>
          <p>
            From physics to physiology, ISYF has invited
            {{ nobelLaureates.length }} Nobel laureates to share their journeys
            with delegates, alongside Fields medallists, Turing Award winners and
            many other eminent scientists. Listed by the year they first joined us.
          </p>
        </div>
        <ol class="roll">
          <li
            v-for="(group, i) in laureatesByFirstYear"
            :key="group.year"
            class="roll-year"
            :style="{ '--i': i }"
          >
            <span class="roll-numeral">{{ group.year }}</span>
            <ul>
              <li v-for="laureate in group.people" :key="laureate.name">
                <a :href="useBase(`laureates#${scientistId(laureate.name)}`)">
                  <span class="roll-name">{{ laureate.name }}</span>
                  <span class="roll-field">{{ field(laureate.honour) }}</span>
                </a>
              </li>
            </ul>
          </li>
        </ol>
        <a class="text-link" :href="useBase('laureates')">
          Meet all {{ scientists.length }} laureates and scientists <ArrowIcon />
        </a>
      </div>
    </section>

    <section class="ruled">
      <div class="section-head">
        <h2>Themes through the years</h2>
        <p>
          Every edition is anchored by a theme that frames its lectures,
          dialogues and activities.
        </p>
      </div>
      <ol class="themes">
        <li class="theme upcoming-theme">
          <a class="theme-year" :href="useBase(`${upcoming.year}`)">{{ upcoming.year }}</a>
          <div>
            <span class="theme-name missing">To be announced</span>
            <span class="meta">{{ ordinal(upcoming.edition) }} edition</span>
          </div>
        </li>
        <li class="theme" v-for="edition in editionsNewestFirst" :key="edition.year">
          <a class="theme-year" :href="useBase(`history#y${edition.year}`)">{{ edition.year }}</a>
          <div>
            <span class="theme-name" :class="{ missing: !edition.theme }">
              {{ edition.theme ?? edition.note }}
            </span>
            <span class="meta">
              {{ ordinal(edition.edition) }} edition<template v-if="edition.online"> · held online</template>
            </span>
          </div>
        </li>
      </ol>
      <a class="text-link" :href="useBase('history')">
        Explore every edition <ArrowIcon />
      </a>
    </section>

    <section class="ruled split">
      <div class="split-head">
        <h2>From the archive</h2>
      </div>
      <div>
        <article class="archive-entry" v-for="edition in archivedEditions" :key="edition.year">
          <h3>ISYF {{ edition.year }}</h3>
          <span class="meta">{{ ordinal(edition.edition) }} edition · {{ edition.dates }}</span>
          <p class="archive-theme">“{{ edition.theme }}”</p>
          <ul class="link-row">
            <li v-for="link in archives[edition.year].highlights" :key="link.href">
              <a :href="useBase(link.href)">{{ link.label }}</a>
            </li>
          </ul>
        </article>
        <p class="archive-note">
          Themes and speakers from every earlier edition are recorded in our
          <a :href="useBase('history')">history of ISYF</a>.
        </p>
      </div>
    </section>

    <section class="ruled">
      <div class="section-head">
        <h2>Who are the organisers?</h2>
        <p>
          ISYF is hosted and organised by Hwa Chong Institution’s very own
          Students' Science Research Club (SSRC), with the support of the
          Ministry of Education (MOE) and partners.
        </p>
      </div>
      <Supporters />
    </section>
  </div>
</template>

<style>
/* The hero runs up under the fixed nav */
#page.heritage .content:has(.home) {
  margin-top: 3.5rem;
}
</style>

<style scoped>
/* ========== HERO ========== */
.hero {
  --pad: max(1.5rem, calc(50vw - var(--content-width) / 2));
  /* The title runs about 4.3 of its own sizes wide; the photo starts a
     letter or so before its longest line ends, so the words cross into it */
  --title-size: clamp(56px, 7.5vw, 112px);
  --split: max(calc(var(--pad) + 3.5 * var(--title-size)), 36vw);

  position: relative;
  margin: -1rem calc(50% - 50vw) 0;
  min-height: min(calc(100svh - 3.5rem), 860px);
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--ink);
  overflow: hidden;
}

.hero-photo {
  position: absolute;
  top: 0;
  bottom: 0;
  left: var(--split);
  width: calc(100vw - var(--split));
  height: 100%;
  object-fit: cover;
  object-position: 50% 40%;
}

.hero-shade {
  position: absolute;
  top: 0;
  bottom: 0;
  left: var(--split);
  right: 0;
  background: linear-gradient(90deg, rgba(31, 26, 25, 0.55), rgba(31, 26, 25, 0) 40%);
}

.hero-text {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 3rem var(--pad) 4rem;
}

.hero-logo {
  width: 96px;
  height: 96px;
  margin: 0 0 0.5rem -0.75rem;
}

.title-stack {
  position: relative;
}

.hero-title {
  margin: 0 0 1.75rem;
  font-family: var(--font-display);
  font-size: var(--title-size);
  line-height: 0.98;
  letter-spacing: -0.02em;
  max-width: 11ch;
  text-wrap: balance;
}

/* The same words over the photograph, clipped to it, in plaster white */
.hero-title-over {
  position: absolute;
  inset: 0;
  margin: 0;
  --fg: var(--plaster);
  clip-path: inset(-20% -50vw -20% calc(var(--split) - var(--pad)));
  text-shadow: 0 2px 18px rgba(31, 26, 25, 0.45);
  pointer-events: none;
}

#page.heritage .hero .lede {
  max-width: min(30rem, calc(var(--split) - var(--pad) - 2rem));
}

.hero-actions {
  max-width: calc(var(--split) - var(--pad) - 2rem);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.75rem;
  margin-top: 2rem;
}

@media screen and (max-width: 760px) {
  .hero {
    flex-direction: column;
    align-items: stretch;
    min-height: 0;
  }

  .hero-photo {
    position: static;
    width: 100%;
    height: 42svh;
    min-height: 260px;
  }

  .hero-text {
    padding-block: 1.5rem 2.5rem;
  }

  .hero-logo {
    width: 72px;
    height: 72px;
  }

  .hero-title {
    font-size: clamp(42px, 12vw, 64px);
  }

  .hero-title-over,
  .hero-shade {
    display: none;
  }

  .hero-actions {
    max-width: none;
  }

  #page.heritage .hero .lede {
    max-width: none;
    font-size: 17px;
  }
}

/* ========== RECORD ========== */
.record {
  max-width: none;
  margin: 0;
  padding-block: 3rem 3.5rem;
  font-family: var(--font-display);
  font-size: clamp(26px, 3.1vw, 40px);
  line-height: 1.3;
  text-wrap: pretty;
}

.record b {
  --fg: var(--crimson);
  font-weight: 400;
  font-variant-numeric: lining-nums;
}

/* ========== RULED SECTIONS ========== */
.split {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
  gap: 1rem 3rem;
}

.split-head .meta {
  margin-top: 0.25rem;
}

.section-head {
  margin-bottom: 2rem;
}

@media screen and (max-width: 760px) {
  .split {
    grid-template-columns: 1fr;
  }
}

/* ========== GOALS ========== */
.goals {
  list-style: none;
  padding: 0;
  margin: 2.5rem 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
  gap: 2rem;
}

.goals li {
  margin: 0;
  padding-top: 1rem;
  border-top: 1px solid var(--rule);
}

.goals h3 {
  font-size: 20px;
}

.goals p {
  margin: 0;
  font-size: 15px;
  line-height: 1.55;
  --fg: var(--ink-soft);
}

/* ========== HONOUR BOARD ========== */
.board {
  margin-block: 0 0;
}

.board-head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
  gap: 1rem 3rem;
  align-items: end;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--rule);
}

.board-head h2 {
  margin: 0;
  font-size: clamp(36px, 4.4vw, 60px);
}

.board-head p {
  margin: 0;
  --fg: var(--ink-soft);
}

.roll {
  list-style: none;
  padding: 0;
  margin: 2rem 0 1.5rem;
  columns: 3 15rem;
  column-gap: 3rem;
  column-rule: 1px solid var(--rule);
}

.roll-year {
  break-inside: avoid;
  margin: 0 0 1.75rem;
  transition: opacity 900ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* Stagger each year a little after the one before it */
.roll-year:nth-child(n) {
  transition-delay: calc(var(--i, 0) * 60ms);
}

.roll.waiting .roll-year {
  opacity: 0.2;
  transform: translateY(10px);
  transition: none;
}

.roll-numeral {
  display: block;
  margin-bottom: 0.375rem;
  font-family: var(--font-display);
  font-size: 28px;
  line-height: 1;
  --fg: var(--crimson);
}

.roll-year ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.roll-year li {
  margin: 0;
}

.roll-year a {
  display: block;
  padding-block: 0.3rem;
  text-decoration: none;
}

.roll-name {
  display: block;
  font-family: var(--font-serif);
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1.35;
}

.roll-field {
  display: block;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 14px;
  --fg: var(--ink-mute);
}

.roll-year a:hover .roll-name {
  --fg: var(--crimson-deep);
}

@media screen and (max-width: 760px) {
  .board-head {
    grid-template-columns: 1fr;
  }
}

/* ========== THEMES ========== */
.themes {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 28rem), 1fr));
  column-gap: 3rem;
}

.theme {
  margin: 0;
  padding-block: 0.875rem;
  border-top: 1px solid var(--rule);
  display: grid;
  grid-template-columns: 4.5rem 1fr;
  gap: 1rem;
  align-items: baseline;
}

.theme-year {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  margin-block: -0.6rem;
  font-family: var(--font-display);
  font-size: 26px;
  --fg: var(--crimson);
  text-decoration: none;
}

.theme-year:hover {
  text-decoration: underline;
}

.theme-name {
  display: block;
  margin-top: 0.125rem;
  font-family: var(--font-serif);
  font-size: 17px;
  line-height: 1.4;
}

.theme-name.missing {
  font-family: var(--font);
  font-size: 15px;
  --fg: var(--ink-mute);
}

/* ========== ARCHIVE ========== */
.archive-entry h3 {
  font-size: 32px;
  margin: 0;
}

.archive-theme {
  margin-block: 0.75rem 1rem;
  font-family: var(--font-serif);
  font-size: 19px;
}

.archive-note {
  font-size: 15px;
  --fg: var(--ink-soft);
}
</style>

<script setup>
import { onMounted } from "vue";
import { useBase } from "~/composables/useBase";
import Supporters from "~/components/supporters.vue";
import ArrowIcon from "~/components/icons/arrow.vue";
import { editions, upcoming, firstYear, ordinal } from "~/data/editions";
import { scientists, scientistId } from "~/data/scientists";
import { archives, goals } from "~/data/site";

const editionsNewestFirst = [...editions].reverse();
const archivedEditions = editionsNewestFirst.filter((e) => e.archive);

const nobelLaureates = scientists
  .filter((s) => s.category === "nobel")
  .sort((a, b) => a.years[0] - b.years[0]);

// Nobel laureates grouped under the year they first joined ISYF
const laureatesByFirstYear = Object.values(
  nobelLaureates.reduce((groups, person) => {
    const year = person.years[0];
    (groups[year] ??= { year, people: [] }).people.push(person);
    return groups;
  }, {})
);

// "Nobel Prize in Physics, 2003" -> "Physics, 2003"
const field = (honour) => honour.replace("Nobel Prize in ", "");

// The laureate roll's one moment: names settle in, year by year, the first
// time the board scrolls into view. Without JS the names are simply shown.
onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const roll = document.querySelector(".roll");
  if (!roll || !("IntersectionObserver" in window)) return;
  if (roll.getBoundingClientRect().top < window.innerHeight) return;

  roll.classList.add("waiting");
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      roll.classList.remove("waiting");
      observer.disconnect();
    },
    { rootMargin: "0px 0px -15% 0px" }
  );
  observer.observe(roll);
});
</script>
