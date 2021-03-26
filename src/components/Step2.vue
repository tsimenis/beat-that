<template>
  <div :class="$style.step2">
    <h2 :class="$style.title">First tell me your name</h2>
    <p :class="$style.subtitle">Just so I know who I am cheering for!</p>
    <form @submit.prevent="handleSubmit">
      <p v-show="hasError" :class="$style.error">Please fill in your name</p>
      <div :class="$style['input-container']">
        <input
          v-model="playerName"
          :class="$style.input"
          type="text"
          placeholder="Name"
        />
      </div>
      <u-button :class="$style['form-button']">
        Next
      </u-button>
    </form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        playerName: '',
        submitAttempt: false
      }
    },
    computed: {
      hasError () {
        return this.submitAttempt && this.playerName === ''
      }
    },
    methods: {
      handleSubmit () {
        this.submitAttempt = true
        if (this.hasError) return false
        this.$store.commit('SET_NAME', this.playerName)
        this.$store.commit('SET_STEP', 3)
      }
    }
  }
</script>

<style lang="scss" module>

  .title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .subtitle {
    margin-bottom: 4rem;
  }

  .error {
    margin-bottom: 1rem;
  }

  .input-container {
    @include screen(medium) {
      max-width: 75%;
      margin: 0 auto;
    }

  }

  .input {
    width: 100%;
    height: 4rem;
    padding: 0 2rem;
    border-radius: $rounded-sm;
    border: 0;
    outline: none;
    margin-bottom: 2rem;
  }

  .form-button {
    width: 100%;
    @include screen(medium) {
      width: auto;
    }
  }

</style>
