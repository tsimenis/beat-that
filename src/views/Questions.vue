<template>
  <div class="view">
    <div class="card" :class="$style.content">
      <p>Question 1 / 10</p>
      <question v-show="true" />
      <question-loader v-show="false" />
    </div>
    <u-button
      :class="$style['button-next']"
      size="large"
    >
      Skip Question
    </u-button>
  </div>
</template>

<script>
  import Question from '@/components/Question'
  import QuestionLoader from '@/components/QuestionLoader'

  export default {
    components: {
      Question,
      QuestionLoader
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
