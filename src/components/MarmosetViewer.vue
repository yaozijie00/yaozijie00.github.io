<template>
  <div class="marmoset-viewer">
    <div ref="container" class="marmoset-viewer__stage"></div>

    <div v-if="showPlayOverlay" class="marmoset-viewer__overlay">
      <button type="button" class="marmoset-viewer__play" @click="startLoading">
        ▶
      </button>
      <div class="marmoset-viewer__overlay-text">点击播放预览</div>
    </div>

    <div v-if="isLoading" class="marmoset-viewer__loading">
      <div class="marmoset-viewer__spinner"></div>
      <div class="marmoset-viewer__loading-text">加载中…</div>
    </div>

    <div v-if="errorMessage" class="marmoset-viewer__error">
      <div class="marmoset-viewer__error-title">模型加载失败</div>
      <div class="marmoset-viewer__error-text">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  autoStart: {
    type: Boolean,
    default: false
  },
  transparent: {
    type: Boolean,
    default: true
  },
  noUI: {
    type: Boolean,
    default: true
  },
  thumbnail: {
    type: String,
    default: ''
  }
});

const container = ref(null);
const errorMessage = ref('');
const isLoading = ref(false);
const hasStarted = ref(false);

const showPlayOverlay = computed(() => !hasStarted.value && !isLoading.value && !errorMessage.value);

let viewerInstance = null;
let resizeObserver = null;
let initRequestId = 0;

const loadMarmoset = (() => {
  let promise;
  return () => {
    if (promise) return promise;
    promise = new Promise((resolve, reject) => {
      if (window.marmoset) {
        resolve(window.marmoset);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://viewer.marmoset.co/main/marmoset.js';
      script.async = true;
      script.onload = () => resolve(window.marmoset);
      script.onerror = () => reject(new Error('Marmoset viewer script failed to load'));
      document.head.appendChild(script);
    });
    return promise;
  };
})();

const clearViewer = () => {
  if (viewerInstance && viewerInstance.domRoot && viewerInstance.domRoot.parentNode) {
    viewerInstance.unload?.();
    viewerInstance.domRoot.parentNode.removeChild(viewerInstance.domRoot);
  }
  viewerInstance = null;
};

const clearResizeObserver = () => {
  if (!resizeObserver) return;
  resizeObserver.disconnect();
  resizeObserver = null;
};

const startLoading = () => {
  if (!viewerInstance) return;
  if (hasStarted.value || isLoading.value) return;
  isLoading.value = true;
  viewerInstance.loadScene();
};

const initViewer = async () => {
  if (!container.value) return;
  const currentRequestId = ++initRequestId;
  errorMessage.value = '';
  isLoading.value = false;
  hasStarted.value = false;
  clearResizeObserver();
  clearViewer();

  if (!props.src) {
    errorMessage.value = '模型文件缺失';
    return;
  }

  try {
    const marmoset = await loadMarmoset();
    if (currentRequestId !== initRequestId || !container.value) return;
    marmoset.transparentBackground = props.transparent;
    marmoset.noUserInterface = props.noUI;

    const rect = container.value.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width || 1));
    const height = Math.max(1, Math.floor(rect.height || 1));

    viewerInstance = new marmoset.WebViewer(width, height, props.src);
    if (props.thumbnail) {
      viewerInstance.thumbnailURL = props.thumbnail;
    }
    viewerInstance.onLoad = () => {
      isLoading.value = false;
      hasStarted.value = true;
    };
    viewerInstance.onError = () => {
      isLoading.value = false;
      errorMessage.value = '模型加载失败，请检查文件路径或资源是否存在';
    };
    container.value.appendChild(viewerInstance.domRoot);

    if (props.autoStart) {
      startLoading();
    }

    resizeObserver = new ResizeObserver(() => {
      const rectNow = container.value.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rectNow.width || 1));
      const h = Math.max(1, Math.floor(rectNow.height || 1));
      viewerInstance?.resize?.(w, h);
    });
    resizeObserver.observe(container.value);
  } catch {
    errorMessage.value = '模型加载失败，请检查文件路径或资源是否存在';
    isLoading.value = false;
  }
};

watch(
  () => props.src,
  async () => {
    await initViewer();
  }
);

onMounted(initViewer);
onBeforeUnmount(() => {
  initRequestId += 1;
  clearResizeObserver();
  clearViewer();
});
</script>

<style scoped lang="scss">
@use '../styles/mixins.scss' as *;

.marmoset-viewer {
  position: relative;
  width: 100%;
  height: 100%;
}

.marmoset-viewer__stage {
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  overflow: hidden;
  @include glass-strong;
}

.marmoset-viewer__overlay,
.marmoset-viewer__loading,
.marmoset-viewer__error {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
  background: rgba(2, 6, 23, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #f8fafc;
  padding: 1rem;
}

.marmoset-viewer__play {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 999px;
  border: 1px solid rgba(125, 211, 252, 0.5);
  background: rgba(15, 23, 42, 0.7);
  color: #e2e8f0;
  font-size: 1.25rem;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.marmoset-viewer__play:hover {
  transform: scale(1.05);
  border-color: rgba(125, 211, 252, 0.9);
}

.marmoset-viewer__overlay-text {
  font-size: 0.85rem;
  color: #cbd5f5;
}

.marmoset-viewer__spinner {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top-color: rgba(125, 211, 252, 0.9);
  animation: marmosetSpin 0.9s linear infinite;
}

.marmoset-viewer__loading-text {
  font-size: 0.85rem;
  color: #cbd5f5;
}

.marmoset-viewer__error-title {
  font-size: 1rem;
  font-weight: 700;
}

.marmoset-viewer__error-text {
  font-size: 0.85rem;
  color: #cbd5f5;
}

@keyframes marmosetSpin {
  to {
    transform: rotate(360deg);
  }
}
</style>
