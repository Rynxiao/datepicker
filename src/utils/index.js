export * from './date'
export * from './withContext'

export const compose = (...fns) => fns.reduceRight((acc, fn) => (...args) => fn(acc(...args)))
