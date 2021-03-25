<template>
  <div :class="$style.component">
    <h2 :class="$style.title">Get Ready!</h2>
    <div>
      <transition name="fade-zoom" mode="out-in">
        <h3 :class="$style.countdown" :key="countdown">{{ countdownText }}</h3>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      time: {
        type: Number,
        default: 3
      }
    },
    data () {
      return {
        countdown: 0,
        intervalId: null
      }
    },
    created () {
      this.countdown = this.time
    },
    mounted () {
      this.startCountdown()
    },
    computed: {
      countdownText () {
        return this.countdown === 0 ? 'GO' : this.countdown
      }
    },
    methods: {
      startCountdown () {
        this.intervalId = setInterval(() => {
          if (this.countdown > 0) {
            this.countdown -= 1
          } else {
            clearInterval(this.intervalId)
            this.$store.commit('SET_ROUND_STARTED', true)
          }
        }, 1000)
      }
    }
  }
</script>

<style lang="scss" module>

  .component {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 2rem 0;
  }

  .title {
    position: absolute;
    top: 2rem;
    left: 0;
    width: 100%;
    font-size: 5rem;
    margin-bottom: 3rem;
  }

  .countdown {
    display: inline-block;
    font-size: 6rem;
  }

</style>

<style lang="scss">

  .fade-zoom-enter-active,
  .fade-zoom-leave-active {
    transition: 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  }
  .fade-zoom-enter,
  .fade-zoom-leave-to {
    transform: scale(3);
  }

</style>
