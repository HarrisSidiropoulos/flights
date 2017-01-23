import memoize from './memoize'

describe('memoize', () => {
  const fib = function ( x ) {
    if(x < 2) return 1; else return fib(x-1) + fib(x-2);
  }
  afterEach(() => {
    fib.memoize = {}
  })
  it('should return the same result', () => {
    const expectedValue = fib(10)
    const value = memoize(fib)(10)
    expect(value).toEqual(expectedValue)
  })
  it('should be fast!', () => {
    memoize(fib)(30)
    const start = new Date().getTime()
    memoize(fib)(30)
    const end = new Date().getTime()-start
    expect(end).toEqual(0)
  })
  it('should be able to memoize promises!', () => {
    const fun = () => new Promise(resolve => resolve(1+1))
    memoize(fun, {isPromise:true})().then(result => {
      expect(result).toEqual(2)
    })
  })
})
