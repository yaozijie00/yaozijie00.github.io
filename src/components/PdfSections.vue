<template>
  <section
    v-for="section in sections"
    :key="section.id"
    :id="section.id"
    class="pdf"
    style="animation-delay: 0.4s;"
  >
    <div class="pdf__header">
      <h2 class="pdf__title">{{ section.title }}</h2>
      <p class="pdf__subtitle">{{ section.subtitle }}</p>
    </div>

    <div class="pdf__panel">
      <div class="pdf__viewer">
        <iframe
          :src="section.file"
          class="pdf__frame"
          :title="section.title"
          loading="lazy"
        >
          您的浏览器不支持内嵌 PDF 预览，请点击下方按钮下载。
        </iframe>
      </div>

      <div class="pdf__actions">
        <a
          :href="section.file"
          download
          class="pdf__btn pdf__btn--primary"
        >
          <svg class="pdf__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>{{ section.downloadLabel }}</span>
        </a>
        <button
          type="button"
          class="pdf__btn pdf__btn--ghost"
          @click="openNewTab(section.file)"
        >
          <svg class="pdf__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          <span>{{ section.openLabel }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  sections: {
    type: Array,
    required: true
  }
});

const openNewTab = (url) => {
  const win = window.open(url, '_blank', 'noopener');
  if (win) win.opener = null;
};
</script>

<style scoped lang="scss">
@use '../styles/mixins.scss' as *;

.pdf {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

.pdf__header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.pdf__title {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
}

.pdf__subtitle {
  color: #9ca3af;
}

.pdf__panel {
  padding: 2rem;
  @include glass;
  @include hover-lift;
}

.pdf__viewer {
  margin-bottom: 1.5rem;
}

.pdf__frame {
  width: 100%;
  height: 24rem;
  border: none;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.05);
}

.pdf__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.pdf__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  border-radius: 999px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  @include hover-lift;
}

.pdf__btn--primary {
  background: #4f46e5;
  color: #fff;
}

.pdf__btn--primary:hover {
  background: #4338ca;
}

.pdf__btn--ghost {
  color: #fff;
  @include glass-strong;
}

.pdf__icon {
  width: 1.25rem;
  height: 1.25rem;
}

@media (min-width: 768px) {
  .pdf__title {
    font-size: 2.5rem;
  }

  .pdf__frame {
    height: 31.25rem;
  }
}
</style>
