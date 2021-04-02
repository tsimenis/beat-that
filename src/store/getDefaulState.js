export default () => {
  return {
    step: 1,
    name: null,
    difficulties: [
      'easy',
      'medium',
      'hard'
    ],
    selectedDifficulty: 'easy',
    questions: [],
    loadingQuestions: false,
    activeQuestionIndex: 0,
    showQuestionLoader: true,
    roundStarted: false,
    playerProgress: [],
    roundDurations: {
      easy: 15,
      medium: 10,
      hard: 5
    },
    roundTimer: true
  }
}
