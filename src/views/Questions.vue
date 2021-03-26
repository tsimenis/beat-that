<template>
  <div class="view">
    <question-timer />
    <div class="card" :class="$style.content">
      <p v-show="numOfQuestions > 0">
        Question {{activeQuestionDisplay}} / {{numOfQuestions}}
      </p>
      <question-loader v-if="!roundStarted && showQuestionLoader" />
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
      ...mapState(['activeQuestionIndex', 'playerProgress', 'roundStarted', 'showQuestionLoader']),
      ...mapGetters(['numOfQuestions', 'activeQuestionSubmitted']),
      activeQuestionDisplay () {
        return this.activeQuestionIndex + 1
      },
      buttonLabel () {
        return !this.activeQuestionSubmitted ? 'Skip Question' : 'Next Question'
      }
    },
    methods: {
      nextQuestion () {
        this.$store.dispatch('nextQuestion')
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
