<template>
  <div :class="$style.step3">
    <h2 :class="$style.title">Choose difficulty</h2>
    <p :class="$style.subtitle">I won't tell anyone if you choose easy (or am I?)</p>
    <div :class="$style.grid">
      <button
        v-for="difficulty in difficulties"
        :key="difficulty"
        :class="[$style.button, {[$style['is-active']]: difficulty === selectedDifficulty}]"
        @click="setDifficulty(difficulty)"
      >
        {{ capitalize(difficulty) }}
      </button>
    </div>
    <h3>Countdown timer between questions</h3>
    <URadioGroup
      name="countdown"
      :value="showQuestionLoader"
      :options="[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]"
      @change="setQuestionLoader"
    />
    <h3>Game mode</h3>
    <URadioGroup
      name="roundtimer"
      :value="roundTimer"
      :options="[{ value: true, label: 'Time attack' }, { value: false, label: 'Lazy' }]"
      @change="setRoundTimer"
    />
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
  import URadioGroup from '@/components/URadioGroup'

  export default {
    components: {
      URadioGroup
    },
    computed: {
      ...mapState(['difficulties', 'selectedDifficulty', 'showQuestionLoader', 'roundTimer'])
    },
    methods: {
      capitalize (string) {
        return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
      },
      setDifficulty (difficulty) {
        this.$store.commit('SET_DIFFICULTY', difficulty.toLowerCase())
      },
      setQuestionLoader (val) {
        this.$store.commit('SET_QUESTION_LOADER', val)
      },
      setRoundTimer (val) {
        this.$store.commit('SET_ROUND_TIMER', val)
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

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    margin: 2rem 0 4rem 0;

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
