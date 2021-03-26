<template>
  <div :class="$style.step3">
    <h2 :class="$style.title">Choose difficulty</h2>
    <p :class="$style.subtitle">I won't tell anyone if you choose easy (or am I?)</p>
    <div :class="$style['difficulty-options']">
      <button
        v-for="difficulty in difficulties"
        :key="difficulty"
        :class="[$style.button, {[$style['is-active']]: difficulty === selectedDifficulty}]"
        @click="setDifficulty(difficulty)"
      >
        {{ capitalize(difficulty) }}
      </button>
    </div>
    <u-button
      :class="$style['start-button']"
      :disabled="!selectedDifficulty"
      @click="startGame"
    >
      Start Game
    </u-button>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState(['difficulties', 'selectedDifficulty'])
    },
    methods: {
      capitalize (string) {
        return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
      },
      setDifficulty (difficulty) {
        this.$store.commit('SET_DIFFICULTY', difficulty.toLowerCase())
      },
      startGame () {
        this.$store.dispatch('getQuestions', {})
        this.$router.push('/questions')
      }
    }
  }
</script>

<style lang="scss" module>

  .title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .subtitle {
    margin-bottom: 4rem;
  }

  .difficulty-options {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    margin: 4rem 0;

    @include screen(medium) {
      grid-template-columns: repeat(3, 1fr);
    }

  }

  .button {
    font-family: $font-primary;
    font-weight: 700;
    text-align: center;
    color: $gray-800;
    background-color: $white;
    border: 0;
    padding: 1.25rem 2rem;
    border-radius: $rounded-sm;
    outline: none;
    box-shadow: 0 4px 15px rgba(black, .25);
    transition: box-shadow .25s ease-out;
    cursor: pointer;

    &:active {
      box-shadow: 0 0 0 rgba(black, .25);
    }
  }

  .is-active {
    background-color: $indigo-300;
    color: $white;
  }

  .start-button {
    width: 100%;
    @include screen(medium) {
      width: auto;
    }
  }

</style>
