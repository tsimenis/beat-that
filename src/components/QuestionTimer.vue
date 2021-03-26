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
      this.remainingTime = this.roundDuration * 1000
    },
    beforeDestroy () {
      this.clearInterval(this.intervalId)
    },
    computed: {
      ...mapState(['playerProgress', 'activeQuestionIndex', 'roundStarted']),
      ...mapGetters(['roundDuration']),
      percentage () {
        return (this.remainingTime / (this.roundDuration * 1000)) * 100
      }
    },
    watch: {
      roundStarted (val) {
        if (val) {
          this.startCountdown()
        } else {
          this.remainingTime = this.roundDuration * 1000
          clearInterval(this.intervalId)
        }
      },
      playerProgress (data) {
        if (data.length - 1 === this.activeQuestionIndex) {
          clearInterval(this.intervalId)
        }
      }
    },
    methods: {
      startCountdown () {
        this.intervalId = setInterval(() => {
          if (this.remainingTime > 0) {
            this.remainingTime -= 100
          } else {
            this.$store.commit('UPDATE_PLAYER_PROGRESS', { result: 'time-out' })
            clearInterval(this.intervalId)
          }
        }, 100)
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
    transition: .1s linear;
  }

</style>
