<template>
  <div class="game-card">
    <div class="image-wrapper">
      <img :src="game.image" alt="{{ game.title }}" />
      <div class="overlay">
        <button class="play-button">Play</button>
      </div>
    </div>
    <div class="details">
      <h3 class="title">{{ game.title }}</h3>
      <div class="tags">
        <span v-for="tag in game.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
      <div class="rating">
        <span v-for="star in 5" :key="star" class="star" :class="{'filled': star <= game.rating}">&#9733;</span>
      </div>
      <div class="price">${{ game.price.toFixed(2) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    game: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.game-card {
    position: relative;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.2s;
}

.game-card:hover {
    transform: scale(1.05);
}

.image-wrapper {
    position: relative;
}

.image-wrapper img {
    width: 100%;
    height: auto;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.6);
    opacity: 0;
    transition: opacity 0.3s;
}

.image-wrapper:hover .overlay {
    opacity: 1;
}

.play-button {
    color: white;
    background-color: #007bff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.details {
    padding: 10px;
}

.title {
    font-size: 1.2em;
}

.tags {
    margin: 5px 0;
}

.tag {
    background-color: #e0e0e0;
    margin-right: 5px;
    padding: 5px;
    border-radius: 3px;
}

.rating {
    margin: 5px 0;
}

.star {
    color: gold;
}

.filled {
    color: gold;
}

.price {
    font-size: 1em;
    font-weight: bold;
}
</style>