<template>
  <div :class="$style.component">
    <h2>
      <slot />
    </h2>
  </div>
</template>

<style lang="scss" module>

  .component {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;

    @include screen(medium) {
      font-size: 2rem;
    }

  }

</style>
