<template>
  <section id="experience" class="timeline" style="animation-delay: 0.3s;">
    <div class="timeline__header">
      <h2 class="timeline__title">
        <span class="timeline__title-accent">职业</span> 履历
      </h2>
      <p class="timeline__subtitle">实习与工作经历 · 成长轨迹</p>
    </div>

    <div class="timeline__panel">
      <div class="timeline__line"></div>

      <div class="timeline__list">
        <div
          v-for="(item, index) in items"
          :key="item.company + item.period"
          :class="[
            'timeline__item',
            index % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right',
            item.isLatest ? 'timeline__item--latest' : ''
          ]"
          :style="{ '--delay': `${index * 0.08}s` }"
        >
          <div :class="['timeline__dot', item.isLatest ? 'timeline__dot--pulse' : '']"></div>

          <div
            :class="[
              'timeline__card-wrap',
              index % 2 === 0 ? 'timeline__card-wrap--left' : 'timeline__card-wrap--right'
            ]"
          >
            <div class="timeline__card">
              <div class="timeline__meta">
                <span
                  :class="[
                    'timeline__badge',
                    item.type === 'work' ? 'timeline__badge--work' : 'timeline__badge--intern'
                  ]"
                >
                  {{ item.type === 'work' ? '正式工作' : '实习' }}
                </span>
                <span class="timeline__period">{{ item.period }}</span>
              </div>

              <h3 class="timeline__company">{{ item.company }}</h3>
              <p class="timeline__position">{{ item.position }}</p>

              <p class="timeline__desc">{{ item.description }}</p>
            </div>
          </div>
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

.timeline {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

.timeline__header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.timeline__title {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
}

.timeline__title-accent {
  color: #22d3ee;
}

.timeline__subtitle {
  color: #9ca3af;
}

.timeline__panel {
  position: relative;
  padding: 2rem;
  @include glass-cold;
  --timeline-line-x: 0.5rem;
  --timeline-dot-size: 1rem;
  --timeline-line-width: 2px;
}

.timeline__line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(var(--timeline-line-x) - (var(--timeline-line-width) / 2));
  width: var(--timeline-line-width);
  background: linear-gradient(to bottom, rgba(34, 211, 238, 0.5), rgba(34, 211, 238, 0.3), transparent);
}

.timeline__list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  width: 100%;
}

.timeline__item {
  position: relative;
  display: flex;
  align-items: center;
  animation: slideInLeft 0.6s ease forwards;
  animation-delay: var(--delay);
  opacity: 0;
  width: 100%;
}


.timeline__dot {
  position: absolute;
  left: calc(var(--timeline-line-x) - (var(--timeline-dot-size) / 2));
  width: var(--timeline-dot-size);
  height: var(--timeline-dot-size);
  border-radius: 50%;
  background: #22d3ee;
  border: 4px solid #0f172a;
  box-shadow: 0 0 16px rgba(34, 211, 238, 0.5);
  z-index: 2;
}

.timeline__dot--pulse {
  animation: pulseGlow 1.5s ease-in-out infinite;
}

.timeline__card-wrap {
  width: 100%;
  padding-left: 2rem;
}


.timeline__card {
  padding: 1.25rem;
  border-radius: 1.25rem;
  @include glass-cold;
  @include glass-cold-hover;
}

.timeline__meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.timeline__badge {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.timeline__badge--work {
  background: rgba(34, 211, 238, 0.2);
  color: #67e8f9;
  border: 1px solid rgba(34, 211, 238, 0.3);
}

.timeline__badge--intern {
  background: rgba(168, 85, 247, 0.2);
  color: #d8b4fe;
  border: 1px solid rgba(168, 85, 247, 0.3);
}

.timeline__period {
  font-size: 0.75rem;
  color: #9ca3af;
}

.timeline__company {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.25rem;
}

.timeline__position {
  font-size: 0.85rem;
  font-weight: 600;
  color: #22d3ee;
  margin-bottom: 0.75rem;
}

.timeline__desc {
  font-size: 0.85rem;
  color: #d1d5db;
  line-height: 1.6;
}

.timeline__item--latest {
  animation: fadeInUpGlow 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: var(--delay);
}

@media (min-width: 768px) {
  .timeline__panel {
    padding: 2.5rem;
  }

  .timeline__title {
    font-size: 2.5rem;
  }

  .timeline__line {
    left: var(--timeline-line-x);
    transform: translateX(-50%);
  }

  .timeline__dot {
    left: var(--timeline-line-x);
    transform: translateX(-50%);
  }

  .timeline__card-wrap {
    width: 50%;
    padding-left: 0;
    padding-right: 3rem;
  }

  .timeline__item--right {
    flex-direction: row-reverse;
  }

  .timeline__card-wrap--right {
    padding-right: 0;
    padding-left: 3rem;
  }

  .timeline__panel {
    --timeline-line-x: 50%;
  }
}
</style>
