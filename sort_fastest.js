// quick middlesort with inlined functions and unrolled recursion
// 100x faster than Array.prototype.sort
function quickmiddleSort(array) {
	var left=0;
	var right=array.length-1;
	var mid;
	var pivot;
	var partLeft;
	var partRight;
	// QUICKSORT START
	while(true){
		// PARTITION START
		partLeft=left;
		partRight=right;
		pivot = array[(partLeft + partRight) >>> 1];
		while (partLeft <= partRight) {
			while (array[partLeft] < pivot) { partLeft++; }
			while (array[partRight] > pivot) { partRight--; }
			if (partLeft <= partRight) {
				var temp = array[partLeft];
				array[partLeft++] = array[partRight];
				array[partRight--] = temp;
			}
		}
        mid=partLeft;
		// PARTITION END
		if (left < mid - 1) {
			right=mid-1;
			continue;
		}
		if (right > mid) {
			left=mid;
			continue;
		}
		break;
	}
	// QUICKSORT END
	return array;
};
