// source: https://gist.github.com/kidGodzilla/92508419261b98ea6a30
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
