/*
* memoize.js
* by @philogb and @addyosmani
* with further optimizations by @mathias
* and @DmitryBaranovsk
* perf tests: http://bit.ly/q3zpG3
* Released under an MIT license.
*/
// Check for Local Storage Support
export function supportLocalStorage() {
  try {
    return !!window && 'localStorage' in window && window['localStorage'] != null;
  } catch (e) {
    return false;
  }
}

export default function memoize( fn, isPromise=false, useLocalStorage=false ) {
  return function () {
    let args = Array.prototype.slice.call(arguments),
      hash = "",
      i = args.length;
    let currentArg = null;
    const mem = fn.memoize || (fn.memoize = {});
    while (i--) {
      currentArg = args[i];
      hash += (currentArg === Object(currentArg)) ?
      JSON.stringify(currentArg) : currentArg;
    }
    if (isPromise) {
      if (hash in mem) {
        return new Promise(resolve => resolve(mem[hash]))
      } else if (useLocalStorage && supportLocalStorage() && localStorage.getItem(`${fn.name}-${hash}`)) {
        const serializedState = JSON.parse(localStorage.getItem(`${fn.name}-${hash}`))
        mem[hash] = serializedState
        return new Promise(resolve => resolve(serializedState))
      } else {
        return fn.apply(this, args).then((response)=> {
          mem[hash] = response
          if (useLocalStorage && supportLocalStorage()) {
            localStorage.setItem(`${fn.name}-${hash}`, JSON.stringify(response));
          }
          return response
        })
      }
    }
    return (hash in mem) ? mem[hash] :
    mem[hash] = fn.apply(this, args);
  };
}
