import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import idObj from 'identity-obj-proxy'
import Home from '@/views/Home.vue'
import Step1 from '@/components/Step1'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Home', () => {
  let build
  let store

  beforeEach(() => {
    build = (context = {}) => {
      store = new Vuex.Store({
        state: {
          step: 1
        }
      })
      return shallowMount(Home, {
        ...context,
        store,
        localVue,
        mocks: {
          $style: idObj
        }
      })
    }
  })
  it('renders the correct component', async () => {
    const wrapper = build()
    const component = wrapper.findComponent(Step1)
    expect(component.exists()).toBe(true)
  })
})
