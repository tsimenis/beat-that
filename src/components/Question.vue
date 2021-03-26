<template>
  <div v-if="hasActiveQuestion" :class="$style.component">
    <h2 :class="$style.title" v-html="activeQuestion.question"></h2>
    <div :class="$style.answers">
      <button
        v-for="(answer, i) in answers"
        :key="`answer-${i}`"
        :class="[
          $style.button,
          buttonClasses(answer)
        ]"
        v-html="answer"
        @click="handleSubmitAnswer(answer)"
      >
      </button>
    </div>
  </div>
</template>

<script>
    /* eslint-disable camelcase */
  import { mapState, mapGetters } from 'vuex'

  const shuffleArray = (array) =>
    array.sort(() => Math.random() - 0.5)

  const sortBooleanArray = (array) =>
    array.sort((value) => value === 'True' ? -1 : 1)

  export default {
    data () {
      return {
        playerAnswer: ''
      }
    },
    mounted () {
      if (!this.showQuestionLoader) {
        this.$nextTick(() => {
          this.$store.commit('SET_ROUND_STARTED', true)
        })
      }
    },
    computed: {
      ...mapState(['activeQuestionIndex', 'playerProgress', 'showQuestionLoader']),
      ...mapGetters(['activeQuestion']),
      hasAnswered () {
        return this.activeQuestionIndex === this.playerProgress.length - 1
      },
      hasActiveQuestion () {
        return Object.keys(this.activeQuestion).length !== 0
      },
      answers () {
        if (!this.hasActiveQuestion) return []
        const { correct_answer, incorrect_answers } = this.activeQuestion
        const answersArray = [correct_answer, ...incorrect_answers]
        // For boolean questions alwasy return True/False
        if (this.activeQuestion.type === 'boolean') return sortBooleanArray(answersArray)
        // For mutliple shuffle
        return shuffleArray(answersArray)
      }
    },
    methods: {
      handleSubmitAnswer (answer) {
        if (this.playerAnswer !== '') return false
        this.playerAnswer = answer
        const result = this.playerAnswer === this.activeQuestion.correct_answer ? 'correct' : 'incorrect'
        this.$store.commit('UPDATE_PLAYER_PROGRESS', { result: result })
      },
      buttonClasses (answer) {
        if (!this.hasAnswered) return ''
        return {
          [this.$style.correct]: answer === this.activeQuestion.correct_answer,
          [this.$style.incorrect]: answer === this.playerAnswer && answer !== this.activeQuestion.correct_answer
        }
      }
    }
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

  .correct {
    background-color: $green-500;
    color: $white;
  }

  .incorrect {
    background-color: $red-500;
    color: $white;
  }

</style>
