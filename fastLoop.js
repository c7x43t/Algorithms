// fastest way of looping trough an array: caching the length and scoping the length to prevent gc
// this is useful for long running loops where the condition is checked frequently (array.length>~10)
// and only if the loop itself is entered frequently to leverage the gc prevention: e.g. the inner part of a nested loop
// or loops in frequently called functions
const func=(function(){
  let len;
  return function(args){
    // do stuff...
    for(let i=0, len=array.length;i<len;i++){/* body */}
    // do more stuff
  }
})()
