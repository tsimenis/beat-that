import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import idObj from 'identity-obj-proxy'
import Step2 from '@/components/Step2.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Step2', () => {
  let build
  let store
  let mutations

  beforeEach(() => {
    build = (context = {}) => {
      mutations = {
        SET_NAME: jest.fn(),
        SET_STEP: jest.fn()
      }
      store = new Vuex.Store({
        mutations
      })
      return shallowMount(Step2, {
        ...context,
        store,
        localVue,
        stubs: ['u-button'],
        mocks: {
          $style: idObj
        }
      })
    }
  })

  it('it renders correctly', () => {
    const wrapper = build()
    expect(wrapper.element).toMatchSnapshot()
  })
  it('it displays validation error when form is submitted with empty name', async () => {
    const wrapper = build()
    const error = wrapper.find('.error')

    expect(error.isVisible()).toBe(false)

    const form = wrapper.find('form')
    await form.trigger('submit')

    expect(error.isVisible()).toBe(true)
  })
  it('hides validation error when name is updated after form submit', async () => {
    const wrapper = build()
    const input = wrapper.find('input')
    const error = wrapper.find('.error')
    const form = wrapper.get('form')

    await form.trigger('submit')
    expect(error.isVisible()).toBe(true)

    input.element.value = 'George'
    await input.trigger('input')
    await input.trigger('blur')

    expect(error.isVisible()).toBe(false)
  })
  it('submits the form and commits mutations with correct payload', async () => {
    const wrapper = build()
    const input = wrapper.find('input')
    const form = wrapper.get('form')

    input.element.value = 'George'
    await input.trigger('input')
    await form.trigger('submit')

    expect(mutations.SET_NAME).toHaveBeenCalledWith({}, 'George')
    expect(mutations.SET_STEP).toHaveBeenCalledWith({}, 3)
  })
})
