import mutations from '@/store/mutations'

test('"SET_NAME" sets user name', () => {
  const state = {
    name: ''
  }
  mutations.SET_NAME(state, 'George')
  expect(state.name).toBe('George')
})

test('"UPDATE_PLAYER_PROGRESS" adds a new entry in the array', () => {
  const state = {
    playerProgress: []
  }
  expect(state.playerProgress).toHaveLength(0)
  mutations.UPDATE_PLAYER_PROGRESS(state, { result: 'skipped' })
  expect(state.playerProgress).toHaveLength(1)
})
