<template>
  <section id="portfolio" class="portfolio" style="animation-delay: 0.3s;">
    <div class="portfolio__header">
      <h2 class="portfolio__title">作品陈列</h2>
      <p class="portfolio__subtitle">精选项目呈现 · 点击缩略图切换内容</p>
    </div>

    <div class="portfolio__panel">
      <div class="portfolio__viewer">
        <figure class="portfolio__figure">
          <transition name="fade" mode="out-in">
            <div :key="currentItem.src || currentItem.title" class="portfolio__media">
              <video
                v-if="currentItem.type === 'video'"
                :src="currentItem.src"
                :poster="currentItem.thumbnail"
                class="portfolio__media-asset"
                loop
                playsinline
                controls
                preload="metadata"
              >
                您的浏览器不支持视频播放
              </video>
              <MarmosetViewer
                v-else-if="currentItem.type === 'marmoset'"
                :src="currentItem.src"
                :thumbnail="currentItem.thumbnail"
                class="portfolio__model"
              />
              <img
                v-else
                :src="currentItem.src"
                :alt="currentItem.title"
                class="portfolio__media-asset"
                loading="lazy"
                decoding="async"
              />
              <figcaption class="portfolio__caption">
                <h3 class="portfolio__caption-title">{{ currentItem.title }}</h3>
                <p class="portfolio__caption-text">
                  <span class="portfolio__caption-badge">{{ currentItem.description }}</span>
                </p>
              </figcaption>
            </div>
          </transition>
        </figure>
      </div>

      <div class="portfolio__thumbs" ref="thumbsRef" @wheel="onThumbWheel" @scroll="onThumbScroll">
        <div class="portfolio__thumbs-row">
          <button
            v-for="(item, index) in props.items"
            :key="`${item.type}-${item.src}-${index}`"
            type="button"
            :class="[
              'portfolio__thumb',
              index === currentIndex ? 'portfolio__thumb--active' : '',
              bounceTarget === 'start' && index === 0 ? 'portfolio__thumb--bounce-start' : '',
              bounceTarget === 'end' && index === props.items.length - 1 ? 'portfolio__thumb--bounce-end' : ''
            ]"
            @click="selectItem(index)"
          >
            <img
              :src="item.thumbnail"
              :alt="item.title"
              class="portfolio__thumb-img"
              loading="lazy"
              decoding="async"
            />
            <div class="portfolio__thumb-overlay"></div>
            <div class="portfolio__thumb-info">
              <p class="portfolio__thumb-title">{{ item.title }}</p>
              <p class="portfolio__thumb-type">
                {{ item.type === 'video' ? '视频' : item.type === 'marmoset' ? 'Marmoset' : '图片' }}
              </p>
            </div>
            <div v-if="index === currentIndex" class="portfolio__thumb-border"></div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue';
import MarmosetViewer from './MarmosetViewer.vue';

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
});

const currentIndex = ref(0);
const thumbsRef = ref(null);
const bounceTarget = ref(null);
const bounceTimer = ref(null);
const edgeRaf = ref(null);

const currentItem = computed(() => {
  return Array.isArray(props.items) && props.items.length > 0 ? props.items[currentIndex.value] : {};
});

const selectItem = (index) => {
  if (index === currentIndex.value) return;
  currentIndex.value = index;
};

const onThumbWheel = (event) => {
  const container = thumbsRef.value;
  if (!container) return;
  if (!hasThumbOverflow(container)) return;
  event.preventDefault();
  const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
  container.scrollLeft += delta;
  scheduleEdgeCheck();
};

const onThumbScroll = () => {
  scheduleEdgeCheck();
};

const hasThumbOverflow = (container) => {
  return container.scrollWidth > container.clientWidth + 1;
};

const scheduleEdgeCheck = () => {
  if (edgeRaf.value) return;
  edgeRaf.value = requestAnimationFrame(() => {
    edgeRaf.value = null;
    checkThumbEdges();
  });
};

const checkThumbEdges = () => {
  const container = thumbsRef.value;
  if (!container) return;
  if (!hasThumbOverflow(container)) return;
  const maxScroll = container.scrollWidth - container.clientWidth;
  const edgeTolerance = 2;
  if (container.scrollLeft <= edgeTolerance) {
    triggerBounce('start');
  } else if (container.scrollLeft >= maxScroll - edgeTolerance) {
    triggerBounce('end');
  }
};

const triggerBounce = (target) => {
  if (bounceTimer.value) {
    clearTimeout(bounceTimer.value);
    bounceTimer.value = null;
  }
  bounceTarget.value = target;
  bounceTimer.value = setTimeout(() => {
    bounceTarget.value = null;
  }, 420);
};

onBeforeUnmount(() => {
  if (bounceTimer.value) {
    clearTimeout(bounceTimer.value);
    bounceTimer.value = null;
  }
  if (edgeRaf.value) {
    cancelAnimationFrame(edgeRaf.value);
    edgeRaf.value = null;
  }
});
</script>

<style scoped lang="scss">
@use '../styles/mixins.scss' as *;

.portfolio {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

.portfolio__header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.portfolio__title {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
}

.portfolio__subtitle {
  color: #9ca3af;
}

.portfolio__panel {
  padding: 2rem;
  @include glass;
  @include hover-lift;
}

.portfolio__viewer {
  margin-bottom: 1.5rem;
}

.portfolio__figure {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  @include glass-strong;
}

.portfolio__media {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
}

.portfolio__media-asset {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.portfolio__model {
  width: 100%;
  height: 100%;
}

.portfolio__caption {
  position: absolute;
  left: 1rem;
  right: auto;
  bottom: 3.25rem;
  padding: 0.75rem 1rem;
  background: transparent;
  pointer-events: none;
  text-align: center;
  max-width: 60%;
}

.portfolio__caption-title {
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  margin-left: 0;
  opacity: 0.85;
}

.portfolio__caption-text {
  color: #d1d5db;
  font-size: 0.78rem;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  opacity: 0.75;
}

.portfolio__caption-badge {
  display: inline-block;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: rgba(2, 6, 23, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.portfolio__thumbs {
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.portfolio__thumbs-row {
  display: flex;
  gap: 1rem;
  min-width: max-content;
}

.portfolio__thumb {
  position: relative;
  flex-shrink: 0;
  width: 10rem;
  height: 6rem;
  border-radius: 0.75rem;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.3s ease;
  @include glass-strong;
}

.portfolio__thumb--active {
  border-color: rgba(34, 211, 238, 0.8);
  box-shadow: 0 0 25px rgba(34, 211, 238, 0.4);
}

.portfolio__thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.portfolio__thumb-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
}

.portfolio__thumb-info {
  position: absolute;
  left: 0.5rem;
  right: 0.5rem;
  bottom: 0.5rem;
  text-align: left;
}

.portfolio__thumb-title {
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.portfolio__thumb-type {
  color: #d1d5db;
  font-size: 0.7rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.portfolio__thumb-border {
  position: absolute;
  inset: 0;
  border: 2px solid #818cf8;
  border-radius: 0.75rem;
}

.portfolio__thumb--bounce-start {
  animation: bounce-start 0.42s ease;
}

.portfolio__thumb--bounce-end {
  animation: bounce-end 0.42s ease;
}

@keyframes bounce-start {
  0% {
    transform: translateX(0);
  }
  40% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes bounce-end {
  0% {
    transform: translateX(0);
  }
  40% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateX(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .portfolio__panel {
    padding: 1.25rem;
  }

  .portfolio__caption {
    left: 0.75rem;
    right: 0.75rem;
    bottom: 1rem;
    max-width: 100%;
  }

  .portfolio__caption-title {
    font-size: 0.9rem;
  }

  .portfolio__caption-text {
    font-size: 0.72rem;
  }

  .portfolio__thumb {
    width: 9rem;
    height: 5.25rem;
  }
}

@media (min-width: 768px) {
  .portfolio__title {
    font-size: 2.5rem;
  }

  .portfolio__panel {
    padding: 2rem;
  }

  .portfolio__thumb {
    width: 12rem;
    height: 7rem;
  }
}
</style>
