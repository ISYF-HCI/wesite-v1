<template>
  <div>
    <h1>Laureates &amp; eminent scientists</h1>
    <p class="lede">
      Across {{ editions.length }} editions, ISYF has invited {{ count("nobel") }} Nobel
      laureates, {{ count("fields") }} Fields medallists and many other
      distinguished scientists to share their journeys with delegates. Here is
      everyone who has joined us, edition by edition.
    </p>

    <div class="filters">
      <div class="category-filter" role="group" aria-label="Filter by distinction">
        <button
          v-for="option in categoryOptions"
          :key="option.id"
          :class="{ selected: category === option.id }"
          :aria-pressed="category === option.id"
          @click="category = option.id"
        >
          {{ option.label }} <span class="count">{{ option.count }}</span>
        </button>
      </div>
      <label class="year-filter">
        <span class="year-label">Edition</span>
        <select v-model="year" aria-label="Filter by year">
          <option :value="null">All years</option>
          <option v-for="y in years" :key="y" :value="y">ISYF {{ y }}</option>
        </select>
      </label>
    </div>

    <div>
      <section v-for="group in groups" :key="group.id" class="group">
        <div>
          <h2>
            {{ group.label }}
            <span class="count">{{ group.people.length }}</span>
          </h2>
          <ul class="people">
            <li
              v-for="person in group.people"
              :key="person.name"
              :id="scientistId(person.name)"
              class="person"
            >
              <h3>{{ person.name }}</h3>
              <p class="honour">{{ person.honour }}</p>
              <ul class="years" :aria-label="`Editions attended by ${person.name}`">
                <li v-for="y in person.years" :key="y">
                  <a :href="useBase(`history#y${y}`)" :class="{ current: y === year }">{{ y }}</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section>

      <p v-if="!groups.length" class="empty">
        No one matches these filters.
        <button class="reset" @click="resetFilters">Show everyone</button>
      </p>
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin-top: 1.5rem;
}

.count {
  font-family: var(--font);
  font-size: 0.45em;
  vertical-align: 0.35em;
  margin-left: 0.25rem;
  --fg: var(--ink-mute);
}


/* ========== FILTERS ========== */
.filters {
  position: sticky;
  top: 3.5rem;
  z-index: 10;
  margin: 2.5rem 0 0;
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--rule);
  background-color: var(--plaster);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0 1.5rem;
}

@media screen and (max-width: 700px) {
  .filters {
    position: static;
  }
}

.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0 1.5rem;
}

.category-filter button {
  min-height: 48px;
  padding: 0;
  border-bottom: 2px solid transparent;
  font-size: 15px;
  font-weight: 400;
  transition: border-color 200ms, color 200ms;
}

.category-filter button:hover {
  --fg: var(--crimson-deep);
}

.category-filter button.selected {
  --fg: var(--crimson-deep);
  border-bottom-color: var(--crimson);
  font-weight: 500;
}

.category-filter .count {
  font-size: 13px;
  vertical-align: 0;
  margin-left: 0.125rem;
}

.category-filter button.selected .count {
  --fg: var(--crimson-deep);
}

.year-filter {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 48px;
}

.year-label {
  font-family: var(--font-serif);
  font-variant: small-caps;
  text-transform: lowercase;
  letter-spacing: 0.06em;
  --fg: var(--ink-mute);
}

.year-filter select {
  min-height: 40px;
  padding: 0 2rem 0 0.75rem;
  border: 1px solid var(--ink);
  border-radius: 2px;
  background: var(--plaster) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%231f1a19' stroke-width='1.5'/%3E%3C/svg%3E") no-repeat right 0.75rem center / 10px;
  appearance: none;
  font: inherit;
  font-size: 15px;
  color: var(--ink);
}

/* ========== GROUPS ========== */
.group {
  padding-block: 3rem 1rem;
}


.group + .group {
  padding-top: 2rem;
}

.group h2 {
  margin-bottom: 1.5rem;
}

/* ========== PEOPLE: an honour-board ledger ========== */
.people {
  list-style: none;
  padding: 0;
  margin: 0;
  border-top: 1px solid var(--ink);
}


.person {
  scroll-margin-top: 9rem;
  margin: 0;
  padding: 1rem 0.5rem;
  border-bottom: 1px solid var(--rule);
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.2fr) minmax(0, 1fr);
  gap: 0.25rem 2rem;
  align-items: baseline;
}


.person:target {
  background-color: var(--primary-50);
}


.person h3 {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 18px;
  line-height: 1.35;
  letter-spacing: 0;
}


.honour {
  margin: 0;
  font-size: 15px;
  line-height: 1.45;
  --fg: var(--ink-soft);
}


.years {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0 0.25rem;
}

.years li {
  margin: 0;
}

.years a {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding-inline: 0.375rem;
  font-family: var(--font-display);
  font-size: 18px;
  font-variant-numeric: lining-nums;
  text-decoration: none;
  --fg: var(--crimson-deep);
}


.years a:hover {
  text-decoration: underline;
}

.years a.current {
  --fg: var(--plaster);
  background-color: var(--crimson);
  border-radius: 2px;
}


@media screen and (max-width: 760px) {
  .person {
    grid-template-columns: 1fr;
    padding-inline: 0;
  }

  .years {
    margin-left: -0.375rem;
  }

  .years a {
    min-height: 40px;
  }
}

/* ========== MISC ========== */
.empty {
  margin-block: 3rem;
}

.reset {
  min-height: 44px;
  margin-left: 0.5rem;
  --fg: var(--crimson-deep);
  font-weight: 500;
  text-decoration: underline;
}
</style>

<script setup>
import { ref, computed } from "vue";
import { useBase } from "~/composables/useBase";
import { editions, firstYear } from "~/data/editions";
import { categories, scientists, scientistId } from "~/data/scientists";

useHead({ title: "Laureates & Scientists · ISYF" });

const years = editions.map((e) => e.year).reverse();
const count = (id) => scientists.filter((s) => s.category === id).length;

const categoryOptions = [
  { id: "all", label: "All", count: scientists.length },
  ...categories.map((c) => ({ id: c.id, label: c.label, count: count(c.id) })),
];

// ?year=2014 opens the page filtered to one edition
const route = useRoute();
const initialYear = Number(route.query.year);
const category = ref("all");
const year = ref(years.includes(initialYear) ? initialYear : null);

function resetFilters() {
  category.value = "all";
  year.value = null;
}

// Each distinction's guests, in the order they were first invited
const groups = computed(() =>
  categories
    .filter((c) => category.value === "all" || category.value === c.id)
    .map((c) => ({
      ...c,
      people: scientists
        .filter((s) => s.category === c.id && (!year.value || s.years.includes(year.value)))
        .sort((a, b) => a.years[0] - b.years[0]),
    }))
    .filter((g) => g.people.length)
);
</script>
