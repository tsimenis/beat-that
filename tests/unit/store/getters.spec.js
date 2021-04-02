import getters from '@/store/getters'

const questions = [
  {
    category: 'Entertainment: Video Games',
    type: 'multiple',
    difficulty: 'easy',
    question: 'Which game did NOT get financed via Crowdfunding?',
    correct_answer: 'Enter the Gungeon',
    incorrect_answers: [
    'Town of Salem',
    'Undertale',
    'Tower Unite'
    ]
  },
  {
    category: 'Entertainment: Music',
    type: 'multiple',
    difficulty: 'easy',
    question: 'Whose signature guitar technique is called the &quot;windmill&quot;?',
    correct_answer: 'Pete Townshend',
    incorrect_answers: [
    'Jimmy Page',
    'Eddie Van Halen',
    'Jimi Hendrix'
    ]
  }
]

test('num of questions returns correct number', () => {
  const state = {
    questions
  }
  expect(getters.numOfQuestions(state)).toBe(2)
})

test('it returns the correct active question', () => {
  const state = {
    questions,
    activeQuestionIndex: 1
  }
  expect(getters.activeQuestion(state).question).toBe('Whose signature guitar technique is called the &quot;windmill&quot;?')
})

test('determines if game is finished', () => {
  const state = {
    playerProgress: [
      {
        result: 'correct'
      }
    ]
  }
  const _getters = {
    numOfQuestions: 0
  }
  expect(getters.gameFinished(state, _getters)).toBe(false)
  _getters.numOfQuestions = 2
  expect(getters.gameFinished(state, _getters)).toBe(false)
  state.playerProgress.push({ result: 'skipped' })
  expect(getters.gameFinished(state, _getters)).toBe(true)
})
