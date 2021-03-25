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
    countdown: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      intervalId: null
    }
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

  .fade-zoom-enter-active, .fade-zoom-leave-active {
    /* transition: all .35s ease-in-out; */
    /* transition: .3s cubic-bezier(0.68, -0.55, 0.27, 1.55); */
    transition: .5s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  }
  .fade-zoom-enter, .fade-zoom-leave-to {
    /* opacity: 0.5; */
    transform: scale(3);
  }

  .fade-zoom-leave-to {
    /* transform: scale(3); */
  }

</style>
