// fast unordered lists intersection with time complexity O(m+n) for the case of 2 arrays
// example: intersectUnorderedLists([1,2,3],[3,4,5]) => [3]
// performance: execution time linear with respect to the sum of the lengths of input arrays (loops exacly once trough every array): O(n)
// note: works only for unique arrays
function intersectUnorderedLists(){
	var shortest=0;
	// find shortest
	for(let i=1;i<arguments.length;i++) if(arguments[i].length < arguments[shortest].length) shortest=i;
	// create initial lookup table
	var obj={};
	for(let i=0;i<arguments[shortest].length;i++) obj[arguments[shortest][i]]=arguments[shortest][i];
	var lastIndex=arguments.length-1;
	for(var i=0;i<lastIndex;i++){
		if(i===shortest) continue;
		newObj={}
		for(var j=0;j<arguments[i].length;j++){
			if(obj[arguments[i][j]]!==undefined) newObj[arguments[i][j]]=arguments[i][j];
		}
		obj=newObj;
	}
	var result=[];
	for(var j=0;j<arguments[lastIndex].length;j++){
		if(obj[arguments[lastIndex][j]]!==undefined) result.push(arguments[i][j]);
	}
	return result;
}
