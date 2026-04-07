<template>
  <section id="news-ticker" class="ticker">
    <div class="ticker__rows">
      <div class="ticker__row ticker__row--right">
        <div class="ticker__track">
          <div class="ticker__group">
            <span v-for="(item, index) in topMessages" :key="`top-${index}`" class="ticker__bubble">
              <span class="ticker__spark"></span>
              {{ item }}
            </span>
          </div>
          <div class="ticker__group" aria-hidden="true">
            <span v-for="(item, index) in topMessages" :key="`top-dup-${index}`" class="ticker__bubble">
              <span class="ticker__spark"></span>
              {{ item }}
            </span>
          </div>
        </div>
      </div>

      <div class="ticker__row ticker__row--left">
        <div class="ticker__track">
          <div class="ticker__group">
            <span v-for="(item, index) in bottomMessages" :key="`bottom-${index}`" class="ticker__bubble ticker__bubble--alt">
              <span class="ticker__spark"></span>
              {{ item }}
            </span>
          </div>
          <div class="ticker__group" aria-hidden="true">
            <span v-for="(item, index) in bottomMessages" :key="`bottom-dup-${index}`" class="ticker__bubble ticker__bubble--alt">
              <span class="ticker__spark"></span>
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { newsTicker } from '../data/siteData';

const { topMessages, bottomMessages } = newsTicker;
</script>

<style scoped lang="scss">
@use '../styles/mixins.scss' as *;

.ticker {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
  margin-top: -0.75rem;
  --ticker-gap: 1.2rem;
  --ticker-duration: 28s;
}

.ticker__rows {
  display: grid;
  gap: 1.25rem;
}

.ticker__row {
  position: relative;
  overflow: hidden;
  border-radius: 1.1rem;
  padding: 0.95rem 0;
  @include glass-cold;
  background: rgba(9, 14, 28, 0.7);
  border: 1px solid rgba(34, 211, 238, 0.12);
  box-shadow: 0 18px 45px rgba(2, 6, 23, 0.4);
}

.ticker__row::before,
.ticker__row::after {
  content: '';
  position: absolute;
  top: 0;
  width: 90px;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.ticker__row::before {
  left: 0;
  background: linear-gradient(90deg, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0));
}

.ticker__row::after {
  right: 0;
  background: linear-gradient(270deg, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0));
}

.ticker__track {
  display: flex;
  width: max-content;
  align-items: center;
  animation-duration: var(--ticker-duration);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform;
}

.ticker__row--left .ticker__track {
  animation-name: ticker-left;
}

.ticker__row--right .ticker__track {
  animation-name: ticker-right;
}

.ticker__row:hover .ticker__track {
  animation-play-state: paused;
}

.ticker__group {
  display: flex;
  gap: var(--ticker-gap);
  padding-right: var(--ticker-gap);
  flex: 0 0 auto;
}

.ticker__bubble {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 1.1rem 0.55rem 0.95rem;
  border-radius: 999px;
  background:
    radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.32), transparent 55%),
    radial-gradient(circle at 80% 0%, rgba(14, 116, 144, 0.36), transparent 45%),
    linear-gradient(135deg, rgba(14, 165, 233, 0.3), rgba(2, 132, 199, 0.14));
  color: #e0f2fe;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.04em;
  font-family: 'Archivo', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif;
  border: 1px solid rgba(56, 189, 248, 0.42);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.08),
    0 0 18px rgba(56, 189, 248, 0.32),
    0 10px 22px rgba(2, 6, 23, 0.28);
  white-space: nowrap;
}

.ticker__bubble::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: inherit;
  border: 1px dashed rgba(255, 255, 255, 0.12);
  opacity: 0.5;
  pointer-events: none;
}

.ticker__spark {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22d3ee;
  box-shadow: 0 0 8px rgba(34, 211, 238, 0.75), 0 0 16px rgba(56, 189, 248, 0.6);
}

.ticker__bubble--alt {
  background:
    radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.32), transparent 55%),
    radial-gradient(circle at 80% 0%, rgba(20, 184, 166, 0.34), transparent 45%),
    linear-gradient(135deg, rgba(16, 185, 129, 0.26), rgba(21, 128, 61, 0.12));
  color: #d1fae5;
  border-color: rgba(34, 197, 94, 0.42);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.08),
    0 0 18px rgba(34, 197, 94, 0.3),
    0 10px 22px rgba(2, 6, 23, 0.28);
}

@keyframes ticker-left {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
}

@keyframes ticker-right {
  from {
    transform: translate3d(-50%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}

@media (min-width: 640px) {
  .ticker__rows {
    gap: 1.5rem;
  }

  .ticker__row {
    padding: 1.1rem 0;
  }

  .ticker__track {
    --ticker-duration: 32s;
  }
}

@media (max-width: 640px) {
  .ticker {
    margin-top: -0.5rem;
    --ticker-gap: 0.75rem;
    --ticker-duration: 24s;
  }

  .ticker__rows {
    gap: 0.85rem;
  }

  .ticker__row {
    padding: 0.7rem 0;
    border-radius: 0.95rem;
  }

  .ticker__track {
    animation-duration: var(--ticker-duration);
  }

  .ticker__group {
    gap: var(--ticker-gap);
    padding-right: var(--ticker-gap);
  }

  .ticker__bubble {
    font-size: 0.8rem;
    letter-spacing: 0.02em;
    padding: 0.45rem 0.85rem 0.45rem 0.75rem;
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.06),
      0 0 14px rgba(56, 189, 248, 0.26),
      0 8px 16px rgba(2, 6, 23, 0.22);
  }

  .ticker__spark {
    width: 5px;
    height: 5px;
  }
}
</style>
