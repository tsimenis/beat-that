<template>
  <div class="view">
    <question-timer />
    <div class="card" :class="$style.content">
      <p v-show="numOfQuestions > 0">
        Question {{activeQuestionDisplay}} / {{numOfQuestions}}
      </p>
      <question-loader v-if="!roundStarted" />
      <question v-else :key="activeQuestionIndex" />
    </div>
    <u-button
      :class="$style['button-next']"
      size="large"
      @click="nextQuestion"
    >
      {{ buttonLabel }}
    </u-button>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import Question from '@/components/Question'
  import QuestionLoader from '@/components/QuestionLoader'
  import QuestionTimer from '@/components/QuestionTimer'

  export default {
    components: {
      Question,
      QuestionLoader,
      QuestionTimer
    },
    computed: {
      ...mapState(['activeQuestionIndex', 'playerProgress', 'roundStarted']),
      ...mapGetters(['numOfQuestions']),
      activeQuestionDisplay () {
        return this.activeQuestionIndex + 1
      },
      playerHasNotAnswered () {
        return this.activeQuestionIndex > this.playerProgress.length - 1
      },
      buttonLabel () {
        return this.playerHasNotAnswered ? 'Skip Question' : 'Next Question'
      }
    },
    methods: {
      nextQuestion () {
        if (this.activeQuestionIndex + 1 >= this.numOfQuestions) return false
        if (this.playerHasNotAnswered) {
          this.$store.commit('UPDATE_PLAYER_PROGRESS', { result: 'skipped' })
        }
        this.$store.commit('SET_ACTIVE_QUESTION_INDEX', this.activeQuestionIndex + 1)
        this.$store.commit('SET_ROUND_STARTED', false)
      }
    }
  }

</script>

<style lang="scss" module>

  .content {
    display: flex;
    flex-direction: column;
    min-height: 75vmin;

    @include screen(xxlarge) {
      min-height: 60vmin;
    }

  }

  .button-next {
    margin-top: 1rem;
  }

</style>
