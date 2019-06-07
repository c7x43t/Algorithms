// fastest way of looping trough an array: caching the length and scoping the length to prevent gc
// this is useful for loops called frequently
const func=(function(){
  let len;
  return function(args){
    // do stuff...
    for(let i=0, len=array.length;i<len;i++){/* body */}
    // do more stuff
  }
})()
