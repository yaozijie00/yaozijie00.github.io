import { onBeforeUnmount, ref } from 'vue';

const EDGE_TOLERANCE = 2;
const LINE_DELTA_PX = 18;
const PAGE_DELTA_MULTIPLIER = 0.8;
const WHEEL_SCROLL_MULTIPLIER = 1.15;

export const usePortfolioThumbScroller = (thumbsRef) => {
  const bounceTarget = ref(null);
  const bounceTimer = ref(null);
  const edgeRaf = ref(null);

  const hasThumbOverflow = (container) => {
    return container.scrollWidth > container.clientWidth + 1;
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

  const checkThumbEdges = () => {
    const container = thumbsRef.value;
    if (!container || !hasThumbOverflow(container)) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (container.scrollLeft <= EDGE_TOLERANCE) {
      triggerBounce('start');
    } else if (container.scrollLeft >= maxScroll - EDGE_TOLERANCE) {
      triggerBounce('end');
    }
  };

  const scheduleEdgeCheck = () => {
    if (edgeRaf.value) return;
    edgeRaf.value = requestAnimationFrame(() => {
      edgeRaf.value = null;
      checkThumbEdges();
    });
  };

  const normalizeWheelDelta = (event, container) => {
    const hasHorizontalIntent = Math.abs(event.deltaX) > Math.abs(event.deltaY);
    const baseDelta = hasHorizontalIntent ? event.deltaX : event.deltaY;

    if (event.deltaMode === 1) {
      return baseDelta * LINE_DELTA_PX;
    }
    if (event.deltaMode === 2) {
      return baseDelta * container.clientWidth * PAGE_DELTA_MULTIPLIER;
    }
    return baseDelta;
  };

  const onThumbWheel = (event) => {
    const container = event.currentTarget || thumbsRef.value;
    if (!container || !hasThumbOverflow(container)) return;
    const delta = normalizeWheelDelta(event, container);
    if (Math.abs(delta) < 0.1) return;
    event.preventDefault();
    event.stopPropagation();
    container.scrollBy({
      left: delta * WHEEL_SCROLL_MULTIPLIER,
      behavior: 'auto'
    });
    scheduleEdgeCheck();
  };

  const onThumbScroll = () => {
    scheduleEdgeCheck();
  };

  const scrollActiveThumbIntoView = (behavior = 'smooth') => {
    const container = thumbsRef.value;
    if (!container) return;
    const activeThumb = container.querySelector('.portfolio__thumb--active');
    if (!activeThumb) return;
    activeThumb.scrollIntoView({
      behavior,
      inline: 'center',
      block: 'nearest'
    });
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

  return {
    bounceTarget,
    onThumbWheel,
    onThumbScroll,
    scrollActiveThumbIntoView
  };
};
