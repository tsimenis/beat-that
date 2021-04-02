import getDefaultState from './getDefaulState'

export default {
  SET_STEP (state, num) {
    state.step = num
  },
  SET_NAME (state, name) {
    state.name = name
  },
  SET_DIFFICULTY (state, data) {
    state.selectedDifficulty = data
  },
  SET_QUESTIONS (state, data) {
    state.questions = data
  },
  SET_LOADING_QUESTIONS (state, value) {
    state.loadingQuestions = value
  },
  SET_ACTIVE_QUESTION_INDEX (state, num) {
    state.activeQuestionIndex = num
  },
  SET_ROUND_STARTED (state, value) {
    state.roundStarted = value
  },
  UPDATE_PLAYER_PROGRESS (state, data) {
    state.playerProgress.push(data)
  },
  UPDATE_QUESTION_RESPONSE_TIME (state, time) {
    Object.assign(state.playerProgress[state.activeQuestionIndex], { time })
  },
  RESET_STATE (state) {
    Object.assign(state, getDefaultState())
  },
  SET_QUESTION_LOADER (state, value) {
    state.showQuestionLoader = value
  },
  SET_ROUND_TIMER (state, value) {
    state.roundTimer = value
  }
}
