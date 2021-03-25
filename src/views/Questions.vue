<template>
  <div class="view">
    <div class="card" :class="$style.content">
      <question-loader />
    </div>
  </div>
</template>

<script>
import QuestionLoader from '@/components/QuestionLoader'
export default {
  components: {
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
