// O(2n) worst, O(n) best, where n is the total lengths of the input arrays
// and the worst case is identical arrays and in the best cause arrays have no common elements
function intersectOrderedLists(){
	if(arguments.length===2) return intersect_safe(arguments[0],arguments[1])
	var len=arguments.length;
	var shortest=0;
	for(var i=1;i<len;i++) if(arguments[i].length<arguments[shortest].length) shortest=i;
	var result=arguments[shortest].slice(0);
	for(var i=0;i<len;i++){
		if(i===shortest) continue;
		result=intersect_safe(result,arguments[i]);
		if(result.length===0) return result;
	}
	return result;
}
function intersect_safe(a, b){
  var ai=0, bi=0;
  var result = [];
  while( ai < a.length && bi < b.length ){
     if      (a[ai] < b[bi] ){ ai++; }
     else if (a[ai] > b[bi] ){ bi++; }
     else /* they're equal */
     {
       result.push(a[ai]);
       ai++;
       bi++;
     }
  }
  return result;
}
// even faster version:
// faster intersection algorithm + inline
function intersectOrderedListsInline(sets){
	var shortest=0;
	for(var i=1;i<sets.length;i++) if(sets[i].length<sets[shortest].length) shortest=i;
	var result=sets[shortest];
	for(var i=0,a,b,j,k;i<sets.length;i++){
		if(result.length===0) return result; 
		if(i===shortest) continue;
		a=result;
		b=sets[i];
		j=0;
		k=0;
		result=[];
		while(j<a.length){
			if(a[j]===b[k]){
				result.push(a[j]);
				j++;i++;
			}else if(a[j]<b[k]){
				while(a[j]<b[k]) j++;
			}else{
				while(b[k]<a[j]) k++;
			}
		}
	}
	return result;
}
