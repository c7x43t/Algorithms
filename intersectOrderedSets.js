// O(2n) worst, O(n) best, where n is the total lengths of the input arrays
// and the worst case is identical arrays and in the best cause arrays have no common elements
function intersectOrderedSets(){
	var shortest=0;
	for(var i=1;i<arguments.length;i++) if(arguments[i].length<arguments[shortest].length) shortest=i;
	var result=arguments[shortest];
	for(var i=0,a,b,j,k;i<arguments.length;i++){
		if(result.length===0) return result; 
		if(i===shortest) continue;
		a=result;
		b=arguments[i];
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
