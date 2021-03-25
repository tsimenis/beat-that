<template>
  <div class="view">
    <div class="card" :class="$style.content">
      <question />
      <question-loader v-show="false" />
    </div>
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
    justify-content: center;
  }

</style>
