// faster way of checking if an object has any keys than Object.keys(o).length>0;
function hasKeys(o){
	for(var key in o) return true;
	return false;
}
