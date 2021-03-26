<template>
  <div :class="$style.component">
    <span :class="$style['progress-bar']" :style="{ width: `${percentage}%` }"></span>
  </div>
</template>

<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    data () {
      return {
        remainingTime: 0,
        intervalId: null
      }
    },
    created () {
      this.remainingTime = this.roundDurationMs
    },
    beforeDestroy () {
      clearInterval(this.intervalId)
    },
    computed: {
      ...mapState(['roundStarted']),
      ...mapGetters(['roundDuration', 'activeQuestionSubmitted']),
      roundDurationMs () {
        return this.roundDuration * 1000
      },
      percentage () {
        return (this.remainingTime / this.roundDurationMs) * 100
      }
    },
    watch: {
      roundStarted (val) {
        if (val) {
          this.startCountdown()
        } else {
          this.remainingTime = this.roundDurationMs
          clearInterval(this.intervalId)
        }
      },
      activeQuestionSubmitted (val) {
        if (val) {
          this.$store.commit('UPDATE_QUESTION_RESPONSE_TIME', this.roundDurationMs - this.remainingTime)
          clearInterval(this.intervalId)
        }
      }
    },
    methods: {
      startCountdown () {
        this.intervalId = setInterval(() => {
          if (this.remainingTime > 0) {
            this.remainingTime -= 10
          } else {
            this.$store.commit('UPDATE_PLAYER_PROGRESS', { result: 'time-out' })
            clearInterval(this.intervalId)
          }
        }, 10)
      }
    }
  }
</script>

<style lang="scss" module>

  .component {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: rgba(0,0,0, .15);
  }

  .progress-bar {
    display: block;
    height: 100%;
    background-color: $green-400;
  }

</style>
