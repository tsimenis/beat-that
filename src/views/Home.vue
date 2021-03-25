<template>
  <div class="view">
    <div class="card">
      <div :class="$style.content">
        <component :is="componentLoader" />
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import Step1 from '@/components/Step1'
import Step2 from '@/components/Step2'
import Step3 from '@/components/Step3'

export default {
  name: 'Home',
  components: {
    Step1,
    Step2,
    Step3
  },
  computed: {
    ...mapState(['step']),
    componentLoader () {
      return `Step${this.step}`
    }
  }
}
</script>

<style lang="scss" module>

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    max-width: 75%;
    height: 45vh;
    margin: 0 auto;
  }

</style>
