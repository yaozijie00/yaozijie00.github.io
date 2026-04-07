<template>
  <section id="tech-stack" class="tech" style="animation-delay: 0.25s;">
    <div class="tech__header">
      <h2 class="tech__title">
        <span class="tech__title-accent">技术</span>栈
      </h2>
      <p class="tech__subtitle">熟练使用的创作工具</p>
    </div>

    <div class="tech__panel">
      <div class="tech__grid">
        <div
          v-for="item in items"
          :key="item.name"
          class="tech__item"
        >
          <div :class="['tech__icon', `tech__icon--${item.accent}`]">
            <span class="tech__abbr">{{ item.abbr || item.name.slice(0, 2) }}</span>
          </div>
          <span class="tech__name">
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
});
</script>

<style scoped lang="scss">
@use '../styles/mixins.scss' as *;

.tech {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

.tech__header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.tech__title {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
}

.tech__title-accent {
  color: #22d3ee;
}

.tech__subtitle {
  color: #9ca3af;
}

.tech__panel {
  padding: 2rem;
  @include glass-cold;
  @include hover-lift;
}

.tech__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
}

.tech__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.tech__icon {
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.25rem;
  border: 1px solid rgba(34, 211, 238, 0.2);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  @include glass-strong;
}

.tech__item:hover .tech__icon {
  animation: elasticBounce 0.5s ease forwards;
}

.tech__abbr {
  font-size: 0.85rem;
  font-weight: 600;
}

.tech__name {
  font-size: 0.75rem;
  color: #9ca3af;
  transition: color 0.2s ease;
}

.tech__item:hover .tech__name {
  color: #67e8f9;
}

.tech__icon--cyan {
  border-color: rgba(34, 211, 238, 0.4);
  color: #67e8f9;
}

.tech__icon--orange {
  border-color: rgba(251, 146, 60, 0.4);
  color: #fdba74;
}

.tech__icon--emerald {
  border-color: rgba(52, 211, 153, 0.4);
  color: #6ee7b7;
}

.tech__icon--blue {
  border-color: rgba(96, 165, 250, 0.4);
  color: #93c5fd;
}

.tech__icon--rose {
  border-color: rgba(251, 113, 133, 0.4);
  color: #fda4af;
}

.tech__icon--violet {
  border-color: rgba(167, 139, 250, 0.4);
  color: #c4b5fd;
}

.tech__icon--lime {
  border-color: rgba(163, 230, 53, 0.4);
  color: #d9f99d;
}

.tech__icon--slate {
  border-color: rgba(148, 163, 184, 0.4);
  color: #cbd5e1;
}

@media (min-width: 540px) {
  .tech__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 640px) {
  .tech__grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 2rem;
  }
}

@media (min-width: 768px) {
  .tech__panel {
    padding: 2.5rem;
  }

  .tech__title {
    font-size: 2.5rem;
  }

  .tech__icon {
    width: 5rem;
    height: 5rem;
  }
}
</style>
