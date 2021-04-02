import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import idObj from 'identity-obj-proxy'
import Step1 from '@/components/Step1.vue'
import UButton from '@/components/UButton.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('u-button', UButton)

describe('Step1', () => {
  let build
  let store
  let mutations

  beforeEach(() => {
    build = (context = {}) => {
      mutations = {
        SET_STEP: jest.fn()
      }
      store = new Vuex.Store({
        mutations
      })
      return mount(Step1, {
        ...context,
        store,
        localVue,
        mocks: {
          $style: idObj
        }
      })
    }
  })
  it('commits mutation with correct payload', async () => {
    const wrapper = build()
    const button = wrapper.find('button')

    await button.trigger('click')

    expect(mutations.SET_STEP).toHaveBeenCalledWith({}, 2)
  })
})
