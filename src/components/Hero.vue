<template>
  <section id="about" class="hero">
    <div class="hero__card">
      <div class="hero__grid">
        <div class="hero__avatar-wrap">
          <div class="hero__avatar-frame">
            <img :src="profile.avatar" alt="个人头像" class="hero__avatar" />
          </div>
        </div>

        <div class="hero__content">
          <div>
            <h1 class="hero__name">{{ profile.name }}</h1>
            <p class="hero__role">{{ profile.role }}</p>
          </div>

          <p class="hero__intro">
            {{ profile.intro }}
          </p>

          <div class="hero__tags">
            <span
              v-for="tag in profile.tags"
              :key="tag"
              class="hero__tag"
            >
              {{ tag }}
            </span>
          </div>

          <div class="hero__actions">
            <a href="#portfolio" class="hero__btn hero__btn--primary">
              查看作品陈列
            </a>
            <a href="#contact" class="hero__btn hero__btn--ghost">
              联系沟通
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  profile: {
    type: Object,
    required: true
  }
});
</script>

<style scoped lang="scss">
@use '../styles/mixins.scss' as *;

.hero {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

.hero__card {
  padding: 2rem;
  @include glass;
  @include hover-lift;
}

.hero__grid {
  display: grid;
  gap: 2rem;
  align-items: center;
}

.hero__avatar-wrap {
  display: flex;
  justify-content: center;
}

.hero__avatar-frame {
  width: 12rem;
  height: 12rem;
  border-radius: 999px;
  overflow: hidden;
  border: 2px solid rgba(129, 140, 248, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  @include glass-strong;
}

.hero__avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero__name {
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
}

.hero__role {
  font-size: 1.25rem;
  font-weight: 600;
  color: #818cf8;
}

.hero__intro {
  color: #d1d5db;
  line-height: 1.7;
}

.hero__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.hero__tag {
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.85rem;
  color: #a5b4fc;
  @include glass-strong;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 0.5rem;
}

.hero__btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  @include hover-lift;
}

.hero__btn--primary {
  background: #4f46e5;
  color: #fff;
}

.hero__btn--primary:hover {
  background: #4338ca;
}

.hero__btn--ghost {
  color: #fff;
  @include glass-strong;
}

@media (min-width: 768px) {
  .hero__card {
    padding: 3rem;
  }

  .hero__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hero__avatar-frame {
    width: 16rem;
    height: 16rem;
  }

  .hero__name {
    font-size: 3rem;
  }
}
</style>
