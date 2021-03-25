<template>
  <div :class="$style.component">
    <h2 :class="$style.title">The term “battery”  to describe an electrical storage device was coined by?</h2>
    <div :class="$style.answers">
      <button :class="$style.button" v-for="i in 4" :key="i">
        Option {{i}}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" module>

  .component {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .title {
    padding-top: 1rem;
    font-size: 2.5rem;
  }

  .answers {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
  }

  .button {
    font-family: $font-primary;
    font-weight: 700;
    text-align: center;
    color: $gray-800;
    background-color: $white;
    border: 0;
    padding: 2rem 2rem;
    border-radius: $rounded-sm;
    outline: none;
    box-shadow: 0 4px 15px rgba(black, .25);
    transition: box-shadow .25s ease-out;
    cursor: pointer;

    &:active {
      box-shadow: 0 0 0 rgba(black, .25);
    }
  }

</style>
