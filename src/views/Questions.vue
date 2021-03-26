<template>
  <message v-if="loadingQuestions">
    Creating new game...
  </message>
  <message v-else-if="!loadingQuestions && numOfQuestions === 0">
    Failed creating new game, <br/> please try again :(
  </message>
  <div v-else class="view">
    <question-timer />
    <div class="card" :class="$style.content">
      <current-question-display />
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
  import Message from '@/components/Message'
  import CurrentQuestionDisplay from '@/components/CurrentQuestionDisplay'
  import Question from '@/components/Question'
  import QuestionLoader from '@/components/QuestionLoader'
  import QuestionTimer from '@/components/QuestionTimer'

  export default {
    components: {
      Message,
      CurrentQuestionDisplay,
      Question,
      QuestionLoader,
      QuestionTimer
    },
    computed: {
      ...mapState([
        'loadingQuestions',
        'activeQuestionIndex',
        'playerProgress',
        'roundStarted',
        'showQuestionLoader'
      ]),
      ...mapGetters(['numOfQuestions', 'activeQuestionSubmitted', 'gameFinished']),
      buttonLabel () {
        return !this.activeQuestionSubmitted ? 'Skip Question' : 'Next Question'
      }
    },
    watch: {
      gameFinished () {
        this.$router.replace('/summary')
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
  }

  .button-next {
    margin-top: 1rem;
  }

</style>
