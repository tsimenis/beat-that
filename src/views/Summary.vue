<template>
  <div class="view">
    <div class="card">
      <div :class="$style.content">
        <div>
          <h2 :class="$style.title">
            Hey {{ name }} you've finished the game! <br/>
            Let's see how you did:
          </h2>
          <h3 :class="$style.subtitle">
            You got 7/10 questions right! 🎉 👏
          </h3>
        </div>
        <ul :class="$style.statistics">
          <li>
            <p>Your fastest response time was <span>0.35s</span> 🐇</p>
          </li>
          <li>
            <p>Your slowest response time was <span>5.5s</span> 🐌</p>
          </li>
          <li>
            <p>
              You ran out of time in <span>2</span> questions ⏱️
            </p>
          </li>
          <li>
            <p>
              You skipped <span>3</span> questions ⏭️
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

  import { mapState } from 'vuex'

  export default {
    name: 'Home',
    computed: {
      ...mapState(['name'])
    },
    methods: {
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
