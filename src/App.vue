<template>
  <div :id="$style.app">
    <router-view />
  </div>
</template>

<style module>

  #app {
    display: flex;
    flex-direction: column;
    max-width: 1024px;
    min-height: 100vh;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

</style>
