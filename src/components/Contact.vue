<template>
  <section id="contact" class="contact" style="animation-delay: 0.5s;">
    <div class="contact__header">
      <h2 class="contact__title">
        <span class="contact__title-accent">联系</span> 方式
      </h2>
      <p class="contact__subtitle">期待与您的合作</p>
    </div>

    <div class="contact__panel">
      <div class="contact__inner">
        <div class="contact__grid">
          <component
            :is="item.href ? 'a' : 'div'"
            v-for="item in items"
            :key="item.label"
            :href="item.href"
            class="contact__card"
          >
            <div class="contact__icon">
              <span class="contact__icon-text">{{ item.label.slice(0, 1) }}</span>
            </div>
            <div class="contact__info">
              <p class="contact__label">{{ item.label }}</p>
              <p class="contact__value">
                {{ item.value }}
              </p>
            </div>
          </component>
        </div>

        <div class="contact__note">
          <p class="contact__note-main">工作时间：周一至周五 9:00 - 18:00</p>
          <p class="contact__note-sub">工作日 24 小时内回复，周末 48 小时内回复</p>
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

.contact {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

.contact__header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.contact__title {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
}

.contact__title-accent {
  color: #22d3ee;
}

.contact__subtitle {
  color: #9ca3af;
}

.contact__panel {
  padding: 2rem;
  @include glass-cold;
  @include hover-lift;
}

.contact__inner {
  max-width: 64rem;
  margin: 0 auto;
}

.contact__grid {
  display: grid;
  gap: 1.5rem;
}

.contact__card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 1.5rem;
  text-decoration: none;
  color: inherit;
  @include glass-strong;
  @include hover-lift;
}

.contact__icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(34, 211, 238, 0.2);
  @include glass-strong;
  transition: border-color 0.2s ease;
}

.contact__card:hover .contact__icon {
  border-color: rgba(34, 211, 238, 0.5);
}

.contact__icon-text {
  color: #22d3ee;
  font-weight: 600;
}

.contact__info {
  flex: 1;
  min-width: 0;
}

.contact__label {
  color: #9ca3af;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
}

.contact__value {
  color: #fff;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.2s ease;
}

.contact__card:hover .contact__value {
  color: #67e8f9;
}

.contact__note {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(34, 211, 238, 0.2);
  text-align: center;
}

.contact__note-main {
  color: #9ca3af;
  font-size: 0.85rem;
}

.contact__note-sub {
  color: #6b7280;
  font-size: 0.75rem;
  margin-top: 0.5rem;
}

@media (min-width: 768px) {
  .contact__title {
    font-size: 2.5rem;
  }

  .contact__panel {
    padding: 3rem;
  }

  .contact__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .contact__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
