import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const shouldPreferLowSpecSource = () => {
  if (typeof window === 'undefined') return false;
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const isSmallViewport = window.matchMedia?.('(max-width: 768px)').matches;
  const lowMemory = Number(navigator.deviceMemory || 8) <= 4;
  const lowCpu = Number(navigator.hardwareConcurrency || 8) <= 4;
  const connection = navigator.connection;
  const saveData = Boolean(connection?.saveData);
  const slowNetwork = ['slow-2g', '2g', '3g'].includes(connection?.effectiveType || '');
  return reducedMotion || saveData || slowNetwork || lowMemory || (isSmallViewport && lowCpu);
};

const pickVideoSource = (item) => {
  if (!item || item.type !== 'video') return '';
  if (shouldPreferLowSpecSource() && item.srcLow) return item.srcLow;
  return item.src;
};

export const usePortfolioMedia = ({ currentItem, currentIndex, activeVideoRef, sectionRef, onActiveItemReady }) => {
  const activeVideoSrc = ref('');
  const sectionVisible = ref(true);
  const pageVisible = ref(typeof document === 'undefined' ? true : !document.hidden);
  const visibilityObserver = ref(null);
  const videoProgressMap = new Map();

  const isCurrentItemVideo = computed(() => currentItem.value?.type === 'video');
  const shouldKeepPlaybackActive = computed(
    () => isCurrentItemVideo.value && sectionVisible.value && pageVisible.value
  );
  const mediaRenderKey = computed(() => {
    if (!currentItem.value) return 'empty-item';
    if (currentItem.value.type === 'video') {
      return `${currentItem.value.title || 'video'}-${activeVideoSrc.value || 'poster'}`;
    }
    return currentItem.value.src || currentItem.value.title || 'media-item';
  });

  const pauseActiveVideo = () => {
    const video = activeVideoRef.value;
    if (!video) return;
    video.pause();
  };

  const syncVideoSource = () => {
    if (!isCurrentItemVideo.value) {
      activeVideoSrc.value = '';
      pauseActiveVideo();
      return;
    }
    activeVideoSrc.value = pickVideoSource(currentItem.value);
  };

  const onVideoPlay = () => {
    if (shouldKeepPlaybackActive.value) return;
    pauseActiveVideo();
  };

  const onVideoTimeUpdate = () => {
    const video = activeVideoRef.value;
    const key = activeVideoSrc.value;
    if (!video || !key) return;
    videoProgressMap.set(key, video.currentTime);
  };

  const onVideoLoadedMetadata = () => {
    const video = activeVideoRef.value;
    const key = activeVideoSrc.value;
    if (!video || !key) return;
    const savedTime = videoProgressMap.get(key);
    if (typeof savedTime !== 'number' || Number.isNaN(savedTime) || savedTime <= 0) return;
    const safeTime = Math.min(savedTime, Math.max((video.duration || 0) - 0.35, 0));
    if (safeTime > 0) {
      video.currentTime = safeTime;
    }
  };

  const handlePageVisibilityChange = () => {
    pageVisible.value = !document.hidden;
  };

  onMounted(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', handlePageVisibilityChange, { passive: true });
    }
    if (typeof window !== 'undefined' && sectionRef.value && 'IntersectionObserver' in window) {
      visibilityObserver.value = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          sectionVisible.value = Boolean(entry?.isIntersecting);
        },
        { threshold: 0.1 }
      );
      visibilityObserver.value.observe(sectionRef.value);
    }
    syncVideoSource();
    onActiveItemReady('auto');
  });

  watch(
    () => currentIndex.value,
    async () => {
      onVideoTimeUpdate();
      pauseActiveVideo();
      syncVideoSource();
      await nextTick();
      onActiveItemReady('smooth');
    }
  );

  watch(
    () => shouldKeepPlaybackActive.value,
    () => {
      if (!shouldKeepPlaybackActive.value) {
        onVideoTimeUpdate();
        pauseActiveVideo();
      }
    }
  );

  onBeforeUnmount(() => {
    onVideoTimeUpdate();
    pauseActiveVideo();
    if (visibilityObserver.value) {
      visibilityObserver.value.disconnect();
      visibilityObserver.value = null;
    }
    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', handlePageVisibilityChange);
    }
  });

  return {
    activeVideoSrc,
    mediaRenderKey,
    onVideoPlay,
    onVideoTimeUpdate,
    onVideoLoadedMetadata,
    syncVideoSource
  };
};
