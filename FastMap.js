// a faster Map implementation [BROKEN]
function Empty(){}
Empty.prototype=Object.create(null);
function FastMap(){
	this.arr=new Map;
	this.obj=new Map;
}
FastMap.prototype.set=function(key,value){
	return typeof key === "number"? this.arr.set(key,value):this.obj.set(key,value);
}
FastMap.prototype.get=function(key){
	return typeof key === "number"? this.arr.get(key):this.obj.get(key)
}
FastMap.prototype.delete=function(key){
	typeof key === "number"? this.arr.delete(key):this.obj.delete(key);
}

