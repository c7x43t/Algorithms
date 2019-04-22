// example usage: binaryBucketsSearch([[0,20],[40,60],[100,120],[140,160]],104) // => 2
// explenation: finds the index of the array that has the first value smaller 
//              and second value greater than the search value
function binaryBucketsSearch(array, value) {
  	var j = 0, length = array.length;
    while (j < length) {
    	var i = (length + j - 1) >> 1; // move the pointer to
      if (value > array[i][1]) 
        j = i + 1;
      else if (value < array[i][0]) 
        length = i;
      else if (value >= array[i][0] && value <= array[i][1])
        return i
    }
  return -1
}
