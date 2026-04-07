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

      <div class="navbar__links" ref="linksRef">
        <div class="navbar__indicator" :style="indicatorStyle" aria-hidden="true"></div>
        <a
          v-for="section in sections"
          :key="section.id"
          :href="`#${section.id}`"
          :class="['navbar__link', activeSectionId === section.id ? 'navbar__link--active' : '']"
        >
          <span :ref="(el) => setLinkRef(el, section.id)" class="navbar__link-text">
            {{ section.label }}
          </span>
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
import { nextTick, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  sections: {
    type: Array,
    required: true
  }
});

const isMenuOpen = ref(false);
const isScrolled = ref(false);
const activeSectionId = ref('');
const linksRef = ref(null);
const linkRefs = ref({});
const indicatorStyle = ref({});
let observer;
let resizeTimer;
let resizeHandler;

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const onScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

const setLinkRef = (el, id) => {
  if (el) {
    linkRefs.value[id] = el;
  }
};

const updateIndicator = () => {
  const container = linksRef.value;
  const link = linkRefs.value[activeSectionId.value];
  if (!container || !link) return;

  const containerRect = container.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  const padding = 10;
  const left = linkRect.left - containerRect.left - padding;
  const width = linkRect.width + padding * 2;
  const height = linkRect.height + 6;
  const centerY = linkRect.top - containerRect.top + linkRect.height / 2;

  indicatorStyle.value = {
    left: `${left}px`,
    top: `${centerY}px`,
    width: `${width}px`,
    height: `${height}px`
  };
};

const pickActiveFromViewport = (sectionsInDom) => {
  if (!sectionsInDom.length) return;
  let bestId = sectionsInDom[0].id;
  let bestScore = Infinity;

  sectionsInDom.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top - window.innerHeight * 0.32);
    if (distance < bestScore) {
      bestScore = distance;
      bestId = section.id;
    }
  });

  if (bestId && bestId !== activeSectionId.value) {
    activeSectionId.value = bestId;
  }
};

onMounted(() => {
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const sectionsInDom = props.sections
    .map((section) => document.getElementById(section.id))
    .filter(Boolean);

  if (sectionsInDom.length) {
    activeSectionId.value = sectionsInDom[0].id;
  }

  const ratioMap = new Map();

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          ratioMap.set(entry.target.id, entry.intersectionRatio);
        } else {
          ratioMap.delete(entry.target.id);
        }
      });

      if (ratioMap.size) {
        let bestId = '';
        let bestRatio = 0;
        ratioMap.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        if (bestId) {
          activeSectionId.value = bestId;
        }
      } else {
        pickActiveFromViewport(sectionsInDom);
      }

      nextTick(updateIndicator);
    },
    {
      threshold: [0.15, 0.3, 0.5, 0.75],
      rootMargin: '-20% 0px -55% 0px'
    }
  );

  sectionsInDom.forEach((section) => observer.observe(section));

  nextTick(updateIndicator);
  resizeHandler = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateIndicator();
    }, 120);
  };
  window.addEventListener('resize', resizeHandler);
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
  }
  if (observer) {
    observer.disconnect();
  }
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
  background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.02) 45%,
      rgba(0, 0, 0, 0.1) 100%
    ),
    rgba(8, 12, 28, 0.35);
  backdrop-filter: blur(28px) saturate(160%);
  -webkit-backdrop-filter: blur(28px) saturate(160%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 12px 40px rgba(5, 10, 25, 0.35);
  transition: all 0.3s ease;
  overflow: hidden;
}

.navbar--scrolled {
  background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0.04) 55%,
      rgba(0, 0, 0, 0.18) 100%
    ),
    rgba(8, 12, 28, 0.55);
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 18px 50px rgba(5, 10, 25, 0.45);
}

.navbar::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.08) 0, transparent 35%),
    radial-gradient(circle at 80% 0%, rgba(255, 255, 255, 0.06) 0, transparent 40%),
    repeating-linear-gradient(
      125deg,
      rgba(255, 255, 255, 0.06) 0px,
      rgba(255, 255, 255, 0.06) 1px,
      transparent 1px,
      transparent 3px
    );
  opacity: 0.55;
  mix-blend-mode: screen;
  pointer-events: none;
}

.navbar--scrolled::before {
  opacity: 0.75;
}

.navbar__inner {
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
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
  gap: 1.6rem;
  position: relative;
  padding: 0.35rem 0.45rem;
  border-radius: 999px;
}

.navbar__indicator {
  position: absolute;
  top: 50%;
  left: 0;
  height: 2.3rem;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(6, 10, 24, 0.96), rgba(15, 23, 42, 0.78));
  border: 1px solid rgba(56, 189, 248, 0.16);
  box-shadow:
    0 10px 22px rgba(2, 6, 23, 0.45),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05),
    0 0 18px rgba(56, 189, 248, 0.22);
  transform: translateX(0) translateY(-50%);
  transition:
    transform 0.55s cubic-bezier(0.34, 1.4, 0.64, 1),
    width 0.45s cubic-bezier(0.34, 1.4, 0.64, 1),
    height 0.35s cubic-bezier(0.34, 1.4, 0.64, 1);
  pointer-events: none;
  z-index: 0;
  filter: saturate(120%);
}

.navbar__indicator::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(circle at 25% 50%, rgba(56, 189, 248, 0.22), transparent 55%);
  opacity: 0.7;
}

.navbar__indicator::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -18px;
  width: 36px;
  height: 70%;
  transform: translateY(-50%);
  border-radius: 999px;
  background: radial-gradient(circle at 30% 50%, rgba(56, 189, 248, 0.26), transparent 65%);
  filter: blur(8px);
  opacity: 0.65;
  transition: width 0.45s cubic-bezier(0.34, 1.4, 0.64, 1);
}

.navbar__link {
  color: #d1d5db;
  text-decoration: none;
  font-size: 0.95rem;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  position: relative;
  z-index: 1;
  transition: color 0.2s ease;
}

.navbar__link:hover {
  color: #67e8f9;
}

.navbar__link--active {
  color: #e0f2fe;
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
  position: relative;
  z-index: 1;
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

