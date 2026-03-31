<template>
  <footer class="footer">
    <div class="footer__inner">
      <p class="footer__text">© {{ year }} 姚梓杰 · All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>

<style scoped lang="scss">
.footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 1.5rem;
}

.footer__inner {
  max-width: 80rem;
  margin: 0 auto;
  text-align: center;
}

.footer__text {
  color: #9ca3af;
}
</style>
