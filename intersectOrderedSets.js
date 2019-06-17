// O(2n) worst, O(n) best, where n is the total lengths of the input arrays
// and the worst case is identical arrays and in the best cause arrays have no common elements
function binarySearch(array, value,start=0,end=array.length) {
  	var j = start, length = end;
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
function intersect2OrderedSets(a,b){
	var j=0;
	var k=0;
	var ratio=~~(b.length/a.length)-1||1;
	var result=[];
	while(j<a.length){
		if(a[j]===b[k]){
			result.push(a[j]);
			j++;k++;
		}else if(a[j]<b[k]){
			while(a[j]<b[k]) j++;
		}else{
			while(b[k]<a[j]) k+=ratio;
			index=binarySearch(b,a[j],k-ratio+1,k+1<b.length?k+1:b.length-1);
			if(index>-1){
				result.push(a[j]);
				j++;k=index+1;
			}else{
				j++;
				k=k-ratio+1;
			}
			if(k>=b.length) break;
		}
	}
	return result;
}
function intersectOrderedSets(){
	var shortest=0;
	for(var i=1;i<arguments.length;i++) if(arguments[i].length<arguments[shortest].length) shortest=i;
	var result=arguments[shortest];
	for(var i=0,a,b,j,k,ratio,index;i<arguments.length;i++){
		if(result.length===0) return result; 
		if(i===shortest) continue;
		a=result;
		b=arguments[i];
		result=intersect2OrderedSets(a,b);
	}
	return result;
}

