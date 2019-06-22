// source: https://gist.github.com/kidGodzilla/92508419261b98ea6a30
// performance ~24.39mio ops
function binarySearch(array, value, j=0, length=array.length) {
    while (j < length) {
    	var i = (length + j - 1) >> 1; // move the pointer to 
      if (value > array[i]) 
        j = i + 1;
      else if (value < array[i]) 
        length = i;
      else
        return i
    }
  return -1
}
// source: https://github.com/weihanglo/rust-algorithm-club/blob/master/src/searching/binary_search/mod.rs
// performance ~26.67mio ops
function binarySearch(arr,target,base=0,size=arr.length){
    while (size > 1) {
        // mid: [base..size)
        var half = ~~(size / 2);
        var mid = base + half;
        if (arr[mid] <= target) {
            base = mid
        }
        size -= half;
    }
	return arr[base] === target?base:-1;
}



// other notable algorithm: compactBS from: https://stackoverflow.com/questions/22697936/binary-search-in-javascript/44981570#44981570
// compactBS appears to be slower searching a 1mio sorted array
