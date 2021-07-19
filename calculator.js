class Calculator {
  atLeastXProbability(probability, mininum, events) {
    let result = 0
    for (let i = mininum; i <= events; i++) {
      const value = this.xOccurencesOfNEventsProbability(probability, i, events)
      result += value
      console.info('index: ' + i + ' probability: ' + value)
    }
    return result
  }

  combinations(occurrences, events) {
    const combinations = math.factorial(events) / (math.factorial(occurrences) * math.factorial(events - occurrences))
    // console.info('# of combinations: ' + combinations)
    return combinations
  }

  dropoutRate(accuracyRate) {
    const containmentRate = toNumber('#containment-rate')
    const errorsBeforeDropout = toNumber('#errors-before-dropout')
    const interactionsPerCall = toNumber('#interactions-per-call')

    let result = this.atLeastXProbability(1 - accuracyRate, errorsBeforeDropout, interactionsPerCall)

    // If the dropout rate is greater than the overall error rate, set it to the error rate
    if (result > 1 - containmentRate) {
      result = 1 - containmentRate
    }
    return result
  }

  monthlyAgentCost(containmentRate) {
    const callsPerDay = toNumber('#calls-per-day')
    const costPerCall = toNumber('#cost-per-agent-call')
    const result = callsPerDay * 30 * (1 - containmentRate) * costPerCall
    return result
  }

  monthlyIVACost(containmentRate) {
    const callsPerDay = toNumber('#calls-per-day')
    const costPerCall = toNumber('#cost-per-iva-call')
    const result = callsPerDay * 30 * containmentRate * costPerCall
    return result
  }

  xOccurencesOfNEventsProbability(probability, occurrences, events) {
    const combinations = this.combinations(occurrences, events)
    console.info('combinations: ' + combinations)
    return combinations * Math.pow(probability, occurrences) * Math.pow(1 - probability, events - occurrences)
  }
}

if (typeof window !== 'undefined') {
  window.Calculator = Calculator
} else {
  module.exports = Calculator
}
