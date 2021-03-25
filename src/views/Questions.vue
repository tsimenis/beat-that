<template>
  <div class="view">
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

  export default {
    components: {
      Question,
      QuestionLoader
    },
    computed: {
      ...mapState(['activeQuestionIndex', 'playerProgress', 'roundStarted']),
      ...mapGetters(['numOfQuestions']),
      activeQuestionDisplay () {
        return this.activeQuestionIndex + 1
      },
      buttonLabel () {
        return this.activeQuestionIndex > this.playerProgress.length - 1 ? 'Skip Question' : 'Next Question'
      }
    },
    methods: {
      nextQuestion () {
        if (this.activeQuestionIndex + 1 >= this.numOfQuestions) return false
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
