<template>
  <div v-if="loadingQuestions" :class="$style.message">
    <h2>
      Creating new game...
    </h2>
  </div>
  <div v-else-if="!loadingQuestions && numOfQuestions === 0" :class="$style.message">
    <h2>
      Failed creating new game, <br/> please try again :(
    </h2>
  </div>
  <div v-else class="view">
    <question-timer />
    <div class="card" :class="$style.content">
      <p>
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
      ...mapState([
        'loadingQuestions',
        'activeQuestionIndex',
        'playerProgress',
        'roundStarted',
        'showQuestionLoader'
      ]),
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

  .message {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;

    @include screen(medium) {
      font-size: 2rem;
    }

  }

  .content {
    display: flex;
    flex-direction: column;
  }

  .button-next {
    margin-top: 1rem;
  }

</style>
