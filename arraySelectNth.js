// select the n biggest elements in an array: arraySelect(someArray,4) => [biggest,...,4th biggest]
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
// select the n biggest elements in an array
function arraySelect(v,n){
	if(v.length<=n) return sort(v);
	if(v.length<100) sort(v).slice(v.length-n-1,v.length);
	// the heap contains the n greatest numbers observed so far
	// it is initialized with n first numbers and sorted
	var heap=sort(v.slice(0,n));
	for(var i=n;i<v.length;i++){
		// if the current number is greater than the smallest number of the heap insert it into the heap
		if(v[i]>=heap[0]){
			heap.shift();
			heap.splice(sortedIndex(heap,v[i]),0,v[i]);
		}
	}
	return heap;
}
// the naive approach for searching the insertion point, a simple loop
// performance is identical for n=10 and falls of if n gets bigger
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
// linked list approach, sligthly faster than the other ones if n=10, doesnt scale well with n
function arraySelectLL(v,n){
	var result=sort(v.slice(0,n));
	if(v.length<=n) return result;
	var heap=new linkedList();
	for(var i=0;i<n;i++) heap.append(result[i]);
	var element;
	for(var i=n;i<v.length;i++){
		// if the current number is greater than the smallest number of the heap insert it into the heap
		element=heap.first;
		if(v[i]>=element.value){
			var inserted=false;
			for(var j=0;j<n;j++){
				if(element.value>=v[i]){
					element.previous.replace(v[i]);
					inserted=true;
					break;
				}
				element=element.next;
			}
			if(!inserted){
				heap.append(v[i]);
				heap.first.remove();
			}
		}
	}
	element=heap.first;
	for(var i=0;i<n;i++){
		result[i]=element.value;
		element=element.next
		
	}
	return result;
}
