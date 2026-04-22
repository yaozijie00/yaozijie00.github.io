<template>
  <section id="portfolio" ref="sectionRef" class="portfolio" style="animation-delay: 0.3s;">
    <div class="portfolio__header">
      <h2 class="portfolio__title">作品陈列</h2>
      <p class="portfolio__subtitle">精选项目呈现 · 点击缩略图切换内容</p>
    </div>

    <div class="portfolio__panel">
      <div class="portfolio__viewer">
        <figure v-if="currentItem" class="portfolio__figure">
          <transition name="fade" mode="out-in">
            <div :key="mediaRenderKey" class="portfolio__media">
              <video
                v-if="currentItem.type === 'video'"
                ref="activeVideoRef"
                :src="activeVideoSrc || undefined"
                :poster="currentItem.thumbnail"
                class="portfolio__media-asset"
                playsinline
                controls
                :preload="videoPreload"
                controlsList="nodownload noplaybackrate"
                disablePictureInPicture
                @play="onVideoPlay"
                @timeupdate="onVideoTimeUpdate"
                @loadedmetadata="onVideoLoadedMetadata"
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
                loading="eager"
                decoding="async"
                fetchpriority="high"
                draggable="false"
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
        <div v-else class="portfolio__empty">暂无可展示作品</div>
      </div>

      <div
        v-if="hasItems"
        ref="thumbsRef"
        class="portfolio__thumbs"
        @wheel.stop.prevent="onThumbWheel"
        @scroll="onThumbScroll"
      >
        <div class="portfolio__thumbs-row">
          <button
            v-for="(item, index) in props.items"
            :key="`${item.type}-${item.src}-${index}`"
            type="button"
            :aria-label="`${item.title} - ${mediaTypeLabel(item.type)}`"
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
              <p class="portfolio__thumb-type">{{ mediaTypeLabel(item.type) }}</p>
            </div>
            <div v-if="index === currentIndex" class="portfolio__thumb-border"></div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import MarmosetViewer from './MarmosetViewer.vue';
import { getMediaTypeLabel } from './portfolio/mediaTypes.js';
import { usePortfolioMedia } from '../composables/usePortfolioMedia.js';
import { usePortfolioThumbScroller } from '../composables/usePortfolioThumbScroller.js';

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
});

const currentIndex = ref(0);
const sectionRef = ref(null);
const activeVideoRef = ref(null);
const thumbsRef = ref(null);

const hasItems = computed(() => Array.isArray(props.items) && props.items.length > 0);

const currentItem = computed(() => {
  if (!hasItems.value) return null;
  const safeIndex = Math.min(Math.max(currentIndex.value, 0), props.items.length - 1);
  return props.items[safeIndex] || null;
});

const videoPreload = 'none';

const selectItem = (index) => {
  if (!hasItems.value) return;
  if (index < 0 || index >= props.items.length) return;
  if (index === currentIndex.value) return;
  currentIndex.value = index;
};

const mediaTypeLabel = (type) => {
  return getMediaTypeLabel(type);
};

const { bounceTarget, onThumbWheel, onThumbScroll, scrollActiveThumbIntoView } =
  usePortfolioThumbScroller(thumbsRef);

const { activeVideoSrc, mediaRenderKey, onVideoPlay, onVideoTimeUpdate, onVideoLoadedMetadata } =
  usePortfolioMedia({
    currentItem,
    currentIndex,
    activeVideoRef,
    sectionRef,
    onActiveItemReady: scrollActiveThumbIntoView
  });

watch(
  () => props.items.length,
  () => {
    if (!hasItems.value) {
      currentIndex.value = 0;
      return;
    }
    if (currentIndex.value >= props.items.length) {
      currentIndex.value = props.items.length - 1;
    }
    scrollActiveThumbIntoView('auto');
  }
);
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

.portfolio__empty {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
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
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x proximity;
  touch-action: pan-x;
  overscroll-behavior-x: contain;
  overscroll-behavior-y: contain;
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
  scroll-snap-align: start;
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
    bottom: 3.1rem;
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
