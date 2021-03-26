<template>
  <div v-if="gameFinished" class="view">
    <div class="card">
      <div :class="$style.content">
        <div>
          <h2 :class="$style.title">
            Hey {{ name }} you've finished the game! <br/>
            Let's see how you did:
          </h2>
          <h3 :class="$style.subtitle">
            You got {{ statistics.correct }} / {{ numOfQuestions }} questions right! 🎉 👏
          </h3>
        </div>
        <ul :class="$style.statistics">
          <li v-if="roundTimer && statistics.correct > 0">
            <p>Your fastest response time was <span>{{ statistics.fastest / 1000 }}s</span> 🐇</p>
          </li>
          <li v-if="roundTimer && statistics.correct > 1">
            <p>Your slowest response time was <span>{{ statistics.slowest / 1000 }}s</span> 🐌</p>
          </li>
          <li v-if="roundTimer && statistics.timedOut">
            <p>
              You ran out of time in <span>{{ statistics.timedOut }}</span> {{pluralize('question', statistics.timedOut)}} ⏱️
            </p>
          </li>
          <li v-if="statistics.skipped">
            <p>
              You skipped <span>{{ statistics.skipped }}</span> {{pluralize('question', statistics.skipped)}} ⏭️
            </p>
          </li>
        </ul>
        <u-button @click="playAgain">
          Play again
        </u-button>
      </div>
    </div>
  </div>
</template>

<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapState(['name', 'playerProgress', 'roundTimer']),
      ...mapGetters(['numOfQuestions', 'gameFinished']),
      statistics () {
        const getResultLength = (value) =>
          this.playerProgress.filter(entry => entry.result === value).length

        const correct = getResultLength('correct')
        const timedOut = getResultLength('time-out')
        const skipped = getResultLength('skipped')

        const correctTimes = this.playerProgress.filter(entry => entry.result === 'correct').map(correct => correct.time)
        const fastest = correctTimes.reduce((acc, curr) => curr < acc ? curr : acc, correctTimes[0])
        const slowest = correctTimes.reduce((acc, curr) => curr > acc ? curr : acc, correctTimes[0])

        return {
          correct,
          timedOut,
          skipped,
          fastest,
          slowest
        }
      }
    },
    methods: {
      pluralize (word, length) {
        return length > 1 ? `${word}s` : word
      },
      playAgain () {
        this.$store.commit('RESET_STATE')
        this.$router.replace('/')
      }
    }
  }

</script>

<style lang="scss" module>

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 auto;

    @include screen(medium) {
      max-width: 65%;
    }

  }

  .title {
    font-size: 1.5rem;
    line-height: 1.5;
    margin-bottom: 2rem;

    @include screen(medium) {
      font-size: 2rem;
      text-align: center;
    }

  }

  .subtitle {
    font-size: 1.5rem;
    line-height: 1.5;
    margin-bottom: 2rem;

    @include screen(medium) {
      font-size: 2rem;
    }

  }

  .statistics {
    font-size: 1.125rem;
    list-style: none;
    padding: 0;
    margin: 0 0 2rem 0;

    @include screen(medium) {
      font-size: 1.5rem;
      margin: 0 0 4rem 0;
    }

    li:not(:last-child) {
      margin-bottom: 1rem;
    }

    span {
      font-size: 1.25rem;
      font-weight: 700;

      @include screen(medium) {
        font-size: 2rem;
      }

    }

  }

</style>
