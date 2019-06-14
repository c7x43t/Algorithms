// straightforward implementation: intersection of 2 sets algorithm is inlined into a loop over all sets:
function intersectSetsInline(sets){
	var result=sets[0];
	for(var i=1;i<sets.length;i++){
		var a=result;var b=sets[i];
		var j=0;
		var k=0;
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
