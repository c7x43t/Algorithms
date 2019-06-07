// fastest way of looping trough an array: caching the length and scoping the length to prevent gc
// this is useful for long running loops where the condition is checked frequently (array.length>~10)
const func=(function(){
  let len;
  return function(args){
    // do stuff...
    for(let i=0, len=array.length;i<len;i++){/* body */}
    // do more stuff
  }
})()
