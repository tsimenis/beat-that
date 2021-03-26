<template>
  <p :class="$style.component">
    Question
    <transition name="slide">
      <span :key="activeQuestionIndex" :class="$style.number">
        {{ activeQuestionDisplay }}
      </span>
    </transition>
    / {{numOfQuestions}}
  </p>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapState(['activeQuestionIndex']),
      ...mapGetters(['numOfQuestions']),
      activeQuestionDisplay () {
        return this.activeQuestionIndex + 1
      }
    }
  }
</script>

<style lang="scss" module>

  .component {
    position: relative;
    overflow: hidden;
  }

  .number {
    display: inline-block;
  }

</style>

<style lang="scss">

  .slide-enter-active,
  .slide-leave-active {
    transition: 0.25s ease-out;
  }

  .slide-leave-active {
    position: absolute;
  }

  .slide-enter {
    transform: translateY(100%);
  }

  .slide-leave-to {
    transform: translateY(-100%);
  }

</style>
