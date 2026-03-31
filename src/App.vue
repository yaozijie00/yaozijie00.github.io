<template>
  <div class="app">
    <Navbar :sections="sections" />

    <main class="app__main">
      <div class="app__content">
        <Hero :profile="profile" />
        <TechStack :items="techStack" />
        <Experience :items="timelineData" />
        <Portfolio :items="portfolioItems" />
        <PdfSections :sections="pdfSections" />
        <Contact :items="contactInfo" />
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import TechStack from './components/TechStack.vue';
import Experience from './components/Experience.vue';
import Portfolio from './components/Portfolio.vue';
import PdfSections from './components/PdfSections.vue';
import Contact from './components/Contact.vue';
import Footer from './components/Footer.vue';

import {
  sections,
  profile,
  techStack,
  timelineData,
  portfolioItems,
  pdfSections,
  contactInfo
} from './data/siteData.js';
</script>

<style scoped lang="scss">
.app__main {
  padding: 6rem 1.5rem 4rem;
}

.app__content {
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 5rem;
}

@media (max-width: 640px) {
  .app__main {
    padding: 5rem 1rem 3rem;
  }

  .app__content {
    gap: 3.5rem;
  }
}
</style>
