// a faster Map implementation
function Empty(){}
Empty.prototype=Object.create(null);
function FastMap(){
	this.arr=[];
	this.obj=new Empty;
}
FastMap.prototype.set=function(key,value){
	return typeof key === "number"? (this.arr[key]=value):(this.obj[key]=value);
}
FastMap.prototype.get=function(key){
	return typeof key === "number"? this.arr[key]:this.obj[key]
}
FastMap.prototype.delete=function(key){
	typeof key === "number"? (delete this.arr[key]):(delete this.obj[key]);
}
