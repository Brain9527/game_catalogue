<template>
  <nav class="sticky-nav">
    <div class="logo">🎮 Game Catalogue</div>
    <div class="search-container">
      <input type="text" placeholder="Search..." class="search-input" />
      <button class="search-button">🔍</button>
    </div>
    <div class="menu-buttons">
      <button class="menu-button">Home</button>
      <button class="menu-button">About</button>
      <button class="menu-button">Contact</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style scoped>
.sticky-nav {
  position: sticky;
  top: 0;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.5em;
}

.search-container {
  display: flex;
  align-items: center;
}

.search-input {
  padding: 5px;
  margin-right: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.menu-buttons {
  display: flex;
}

.menu-button {
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
}

.menu-button:hover {
  background-color: #f0f0f0;
}
</style>