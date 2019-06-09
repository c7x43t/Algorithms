// select the n biggest elements in an array: arraySelect(someArray,4) => [biggest,...,4th biggest]
function arraySelect(v,n){
	var heap=v.slice(0,n).sort();
	if(v.length<=n) return heap;
	for(var i=n;i<v.length;i++){
		// if the current number is greater than the smallest number of the heap insert it into the heap
		if(v[i]>=heap[0]){
			var inserted=false;
			heap.shift();
			heap.splice(sortedIndex(heap,v[i]),0,v[i]);
		}
	}
	return heap;
}
// binary search in sorted array for the insertion index given a value
// https://stackoverflow.com/a/21822316/9905358
function sortedIndex(array, value) { 
    var low = 0,
        high = array.length;
    while (low < high) {
        var mid = (low + high) >>> 1;
        if (array[mid] < value) low = mid + 1;
        else high = mid;
    }
    return low;
}
// the naive approach for searching the insertion point, a simple loop, seems to perform exactly as fast as the binary search approach
function arraySelectNaive(v,n){
	var heap=v.slice(0,n).sort();
	if(v.length<=n) return heap;
	for(var i=n;i<v.length;i++){
		// if the current number is greater than the smallest number of the heap insert it into the heap
		if(v[i]>=heap[0]){
			var inserted=false;
			heap.shift();
			for(var j=0;j<heap.length;j++){
				if(heap[j]>=v[i]){
					heap.splice(j,0,v[i]);
					inserted=true;
					break;
				}
			}
			if(!inserted){
				heap.push(v[i]);
			}
		}
	}
	return heap;
}
