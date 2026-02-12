<template>
  <div class="game-grid">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GameGrid'
}
</script>

<style scoped>
.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

@media (min-width: 768px) {
  .game-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (min-width: 1024px) {
  .game-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
}
</style>