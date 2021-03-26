<template>
  <div :class="$style['radio-group']">
    <span
      v-for="(option, i) in options"
      :key="`${name}-${i}`"
      :class="$style['radio-container']"
    >
      <input
        type="radio"
        :name="name"
        :id="`${name}-${i}`"
        :value="option.value"
        :checked="option.value === value"
        :class="$style.radio"
        @change="$emit('change', option.value)"
      >
      <label :for="`${name}-${i}`" :class="$style['radio-label']">
        <span :class="$style['radio-el']"></span>
        <span :class="$style['radio-label-text']">
          {{ option.label }}
        </span>
      </label>
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        required: true
      },
      value: {
        type: Boolean,
        required: true
      },
      options: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style lang="scss" module>

  .radio-group {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    margin: 2rem 0 4rem 0;

    @include screen(medium) {
      grid-template-columns: repeat(3, 1fr);
    }

  }

  .radio-container {
    position: relative;
  }

  .radio-label {
    display: inline-flex;
    font-family: $font-primary;
    font-weight: 700;
    justify-content: center;
    align-items: center;
    color: $gray-800;
    background-color: $white;
    padding: 1.25rem 2rem;
    border-radius: $rounded-sm;
    width: 100%;
    cursor: pointer;
  }

  .radio {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .radio-label {
      color: $indigo-300;

      .radio-el:before {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }

    }

  }

  .radio-el {
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    margin-right: .5rem;
    border: 2px solid;
    border-radius: 50%;

    &:before {
      content: '';
      position: absolute;
      width: .75rem;
      height: .75rem;
      top: 50%;
      left: 50%;
      background-color: $indigo-300;
      border-radius: 50%;
      opacity: 0;
      transform: translate(-50%, -50%) scale(1);
      transition: .2s cubic-bezier(0.390, 0.575, 0.565, 1.000);
    }

  }

</style>
