// fast unordered lists intersection with time complexity O(m*n) for the case of 2 arrays
// takes one argument: array of arrays that should be intersected
function intersectUnorderedLists(arrays){
	if(arrays.length>1){
		let sortedArrays=arrays.sort((a,b)=>a.length>b.length?1:-1);
		let intersection=[];
		for(let j=0;j<sortedArrays[0].length;j++){
			if(sortedArrays[1].indexOf(arrays[0][j])>-1) intersection.push(arrays[0][j]);
		}
		var shortArr; var longArr;
		for(let i=2;i<sortedArrays.length-1;i++){
			if(sortedArrays[i].length>intersection.length){
				shortArr=intersection;
				longArr=sortedArrays[i];
			}else{
				shortArr=sortedArrays[i];
				longArr=intersection;
			}
			for(let j=0;j<shortArr.length;j++){
				if(longArr.indexOf(shortArr[j])>-1) intersection.push(shortArr[j]);
			}
		}
		return intersection;
	}else{
		return arrays.length===1?arrays[0].map(e=>e):[];
	}
}
