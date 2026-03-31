<template>
  <nav :class="['navbar', { 'navbar--scrolled': isScrolled }]">
    <div class="navbar__inner">
      <div class="navbar__brand">
        <div class="navbar__logo">
          <svg class="navbar__logo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span class="navbar__title">姚梓杰 | 个人作品集</span>
      </div>

      <div class="navbar__links">
        <a
          v-for="section in sections"
          :key="section.id"
          :href="`#${section.id}`"
          class="navbar__link"
        >
          {{ section.label }}
        </a>
      </div>

      <button class="navbar__menu-btn" @click="toggleMenu">
        <svg class="navbar__menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <div v-show="isMenuOpen" class="navbar__mobile">
      <div class="navbar__mobile-links">
        <a
          v-for="section in sections"
          :key="section.id"
          :href="`#${section.id}`"
          class="navbar__mobile-link"
          @click="closeMenu"
        >
          {{ section.label }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

defineProps({
  sections: {
    type: Array,
    required: true
  }
});

const isMenuOpen = ref(false);
const isScrolled = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const onScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<style scoped lang="scss">
@use '../styles/mixins.scss' as *;

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 1rem 1.5rem;
  background: rgba(2, 6, 23, 0.6);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-bottom: 1px solid rgba(34, 211, 238, 0.1);
  box-shadow: 0 4px 30px rgba(34, 211, 238, 0.05);
  transition: all 0.3s ease;
}

.navbar--scrolled {
  background: rgba(2, 6, 23, 0.85);
  border-bottom: 1px solid rgba(34, 211, 238, 0.2);
  box-shadow: 0 8px 40px rgba(34, 211, 238, 0.1);
}

.navbar__inner {
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar__brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.navbar__logo {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @include glass-strong;
  @include hover-lift;
}

.navbar__logo-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #818cf8;
}

.navbar__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.02em;
}

.navbar__links {
  display: none;
  align-items: center;
  gap: 2rem;
}

.navbar__link {
  color: #d1d5db;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.navbar__link:hover {
  color: #67e8f9;
}

.navbar__menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  background: transparent;
  @include glass-strong;
  @include hover-lift;
}

.navbar__menu-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #fff;
}

.navbar__mobile {
  margin-top: 1rem;
  border-radius: 1rem;
  padding: 1rem;
  @include glass-strong;
}

.navbar__mobile-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.navbar__mobile-link {
  color: #d1d5db;
  text-decoration: none;
  padding: 0.5rem 0;
  transition: color 0.2s ease;
}

.navbar__mobile-link:hover {
  color: #fff;
}

@media (min-width: 768px) {
  .navbar__links {
    display: flex;
  }

  .navbar__menu-btn {
    display: none;
  }

  .navbar__mobile {
    display: none;
  }
}

@media (max-width: 640px) {
  .navbar {
    padding: 0.75rem 1rem;
  }

  .navbar__title {
    font-size: 1rem;
  }
}
</style>

