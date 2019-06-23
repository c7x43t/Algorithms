// a faster Map implementation
// splitting keys by strings and numbers it performs better after many deletes from the map
function FastMap(){
	this.arr=new Map;
	this.obj=new Map;
}
FastMap.prototype=Object.create(null);
FastMap.prototype.set=function(key,value){
	return typeof key === "number"? this.arr.set(key,value):this.obj.set(key,value);
}
FastMap.prototype.get=function(key){
	return typeof key === "number"? this.arr.get(key):this.obj.get(key)
}
FastMap.prototype.delete=function(key){
	typeof key === "number"? this.arr.delete(key):this.obj.delete(key);
}
