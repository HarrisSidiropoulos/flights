import memoize from './memoize'

describe('memoize', ()=> {
  function fib( x ) {
    if(x < 2) return 1; else return fib(x-1) + fib(x-2);
  }
  afterEach(() => {
    fib.memoize = {}
  })
  it('should return the same result', ()=> {
    const expectedValue = fib(10)
    let value = memoize(fib)(10)
    expect(value).toEqual(expectedValue)
  })
  it('should be fast!', ()=> {
    memoize(fib)(30)
    const start = new Date().getTime()
    memoize(fib)(30)
    const end = new Date().getTime()-start
    expect(end).toEqual(0)
  })
})
