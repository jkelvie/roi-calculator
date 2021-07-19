const Calculator = require('./calculator')
global.math = require('mathjs')
const values = {}
global.toNumber = function (name) {
  return values[name]
}

const test = require('ava')

test('combinations', (t) => {
  const calculator = new Calculator()
  const combinations = calculator.combinations(2, 5)
  t.is(combinations, 10)
})

test('combinations for 10 trials with six results', (t) => {
  const calculator = new Calculator()
  const combinations = calculator.combinations(6, 10)
  t.is(combinations, 210)
})

// Ties off to the math on this page:
//  https://www.statisticshowto.com/probability-and-statistics/binomial-theorem/binomial-distribution-formula/
test('probability of six out of 10 with 50% likelihood', (t) => {
  const calculator = new Calculator()
  const probability = calculator.xOccurencesOfNEventsProbability(0.5, 6, 10)
  t.is(math.round(probability, 4), 0.2051)
})

test('dropout rate', (t) => {
  values['#containment-rate'] = 0.5
  values['#errors-before-dropout'] = 2
  values['#interactions-per-call'] = 5

  const calculator = new Calculator()
  const rate = calculator.dropoutRate(0.8)
  t.is(math.round(rate, 4), 0.2627)
})

// https://mathbitsnotebook.com/Algebra2/Probability/PBBinomialProbMostLeast.html
test('at least 3 probability from maths notebook', (t) => {
  const calculator = new Calculator()
  const rate = calculator.atLeastXProbability(0.3333, 3, 5)
  t.is(math.round(rate, 4), 0.2098)
})

test('at least 3 probability with 95% accuracy', (t) => {
  const calculator = new Calculator()
  const rate = calculator.atLeastXProbability(0.05, 3, 5)
  t.is(math.round(rate, 4), 0.0012)
})

test('dropout rate from maths notebook', (t) => {
  values['#containment-rate'] = 0.5
  values['#errors-before-dropout'] = 3
  values['#interactions-per-call'] = 5

  const calculator = new Calculator()
  const rate = calculator.dropoutRate(0.6666)
  t.is(math.round(rate, 4), 0.21)
})

test('dropout rate exceeds transfers rate', (t) => {
  values['#containment-rate'] = 0.8
  values['#errors-before-dropout'] = 3
  values['#interactions-per-call'] = 5

  const calculator = new Calculator()
  const rate = calculator.dropoutRate(0.6666)
  t.is(math.round(rate, 4), 0.2)
})
