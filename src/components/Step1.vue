<template>
  <div :class="$style.step1">
    <h1 :class="$style.title">Beat that!</h1>
    <h2 :class="$style.subtitle">
      Do you have what it takes to beat this trivia game?
    </h2>
    <u-button @click="$store.commit('SET_STEP', 2)">
      Let's go!
    </u-button>
  </div>
</template>

<style lang="scss" module>

.title {
  font-size: 5rem;
  line-height: 1;
  margin: 0 0 1rem 0;
}

.subtitle {
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 2rem;
}
</style>
