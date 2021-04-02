import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import idObj from 'identity-obj-proxy'
import Step3 from '@/components/Step3.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Step3', () => {
  let build
  let store
  let mutations

  beforeEach(() => {
    build = (context = {}) => {
      mutations = {
        SET_DIFFICULTY: jest.fn(),
        SET_QUESTION_LOADER: jest.fn()
      }
      store = new Vuex.Store({
        state: {
          difficulties: [
            'easy',
            'medium',
            'hard'
          ],
          selectedDifficulty: 'easy',
          showQuestionLoader: true,
          roundTimer: true
        },
        mutations
      })
      return mount(Step3, {
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
  it('renders correctly with default store state', () => {
    const wrapper = build()
    const difficulty = wrapper.find('.is-active')
    const countdownLabel = wrapper.find('input[name="countdown"]:checked + label')
    const roundTimerLabel = wrapper.find('input[name="roundtimer"]:checked + label')

    expect(difficulty.text()).toBe('Easy')
    expect(countdownLabel.text()).toBe('Yes')
    expect(roundTimerLabel.text()).toBe('Time attack')
  })
  it('updates difficulty when clicking on button', async () => {
    const wrapper = build()
    const buttons = wrapper.findAll('.button')

    await buttons.at(1).trigger('click')

    expect(mutations.SET_DIFFICULTY).toHaveBeenCalledWith(expect.any(Object), 'medium')
  })
  // TODO: More tests, also not happy with how the current tests look, would have to split components differently to make
  // testing easier and "proper"
})
