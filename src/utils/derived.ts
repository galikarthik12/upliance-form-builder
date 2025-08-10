// Very basic derived field evaluator
export function evaluateDerived(expression: string, values: Record<string, any>): any {
  try {
    // Replace field names in expression with actual values
    let evalExpr = expression
    for (const [key, val] of Object.entries(values)) {
      evalExpr = evalExpr.replace(new RegExp(`\\b${key}\\b`, 'g'), val ?? 0)
    }
    // eslint-disable-next-line no-eval
    return eval(evalExpr)
  } catch (err) {
    return ''
  }
}
