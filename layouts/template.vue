<template>
  <div id="page" :class="archive ? 'archived' : 'heritage'">
    <ArchiveBar v-if="archive" :archive="archive" />
    <NavBar />
    <ButtonScroll />

    <main id="body">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<style>
@import url("~/assets/css/heritage.css");

/* Room for the fixed archive bar shown above the nav on archived sites */
#page.archived {
  --archive-bar-height: 2.25rem;
  padding-top: var(--archive-bar-height);
}
</style>

<style scoped>
#body {
  max-width: min(var(--content-width), 100vw);
  --page-margin: 1.5rem;
  margin: 1rem auto 5rem;
  padding-inline: var(--page-margin);
  min-height: 110vh;
}
</style>

<script setup>
import ButtonScroll from "../components/button/scroll.vue";
import ArchiveBar from "../components/nav/archiveBar.vue";
import { useArchive } from "~/composables/useArchive";
import { ref, onMounted } from "vue";

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const archive = useArchive();
useHead(() => (archive.value ? { title: `${archive.value.title} (Archive)` } : {}));

const height = ref(0);
onMounted(() => {
  window.error = false;

  gsap.registerPlugin(ScrollTrigger);

  // Archived sites keep their original section fade-in; the main site's
  // content stays visible and its pages own their motion.
  if (!archive.value) return;

  const sections = gsap.utils.toArray("main section");

  sections.forEach((section) => {
    gsap.from(section, {
      opacity: 0.125,
      y: 15,
      duration: 0.375,
      delay: 0.125,
      ease: "power3.inOut",
      scrollTrigger: section,
    });
  });
});

</script>
