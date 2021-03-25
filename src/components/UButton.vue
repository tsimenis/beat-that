<template>
  <button :class="[$style.button, $style[size]]" v-on="$listeners" v-bind="$attrs">
    <slot />
  </button>
</template>

<script>
  export default {
    props: {
      size: {
        type: String,
        default: 'normal',
        validator: (val) => ['normal', 'large'].includes(val)
      }
    }
  }
</script>

<style lang="scss" module>

  .button {
    font-family: $font-primary;
    font-weight: 700;
    text-align: center;
    color: $white;
    background-color: $green-400;
    border: 0;
    padding: 1.25rem 2rem;
    border-radius: $rounded-sm;
    outline: none;
    min-width: 15rem;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(black, .25);
    transition: box-shadow .25s ease-out;

    &:active {
      box-shadow: 0 0 0 rgba(black, .25);
    }

    &:disabled {
      background-color: $gray-400;
    }
  }

  .large {
    font-size: 1.25rem;
    padding: 2rem;
  }

</style>
