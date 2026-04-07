<template>
  <div class="app">
    <Navbar :sections="sections" />

    <main class="app__main">
      <div class="app__content">
        <Hero :profile="profile" />
        <NewsTicker />
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
import NewsTicker from './components/NewsTicker.vue';
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
  padding: 5.75rem 1.5rem 3.5rem;
}

.app__content {
  max-width: 78rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4.25rem;
}

@media (max-width: 640px) {
  .app__main {
    padding: 5rem 1rem 3rem;
  }

  .app__content {
    gap: 2.75rem;
  }
}
</style>
