function linkedElement(value,previous,next,list){
	this.value=value;
	this.previous=previous;
	this.next=next;
	this.list=list;
}
linkedElement.prototype.replace=function(value){
	var newElement=new linkedElement(value,this.previous,this.next,this.list);
	if(this.previous!==undefined){
		this.previous.next=newElement;
	}else{
		this.list.first=newElement;
	}
	if(this.next!==undefined){
		this.next.previous=newElement;
	}else{
		this.list.next=newElement;
	}
	return newElement;
}
linkedElement.prototype.insertAfter=function(value){
	var newElement=new linkedElement(value,this,this.next,this.list);
	this.next=newElement;
	if(this.next!==undefined){
		this.list.last=newElement;
	}
	return newElement;
	
}
linkedElement.prototype.insertBefore=function(value){
	var newElement=new linkedElement(value,this.previous,this,this.list);
	this.previous=newElement;
	if(this.previous!==undefined){
		this.list.first=newElement;
	}
	return newElement;
}
linkedElement.prototype.remove=function(){
	if(this.previous){
		this.previous.next=this.next;
	}else{
		this.list.first=this.next;
	}
	if(this.next){
		this.next.previous=this.previous;
	}else{
		this.list.last=this.previous;
	}
}
function linkedList(){
	this.first=undefined;
	this.last=undefined;
}
linkedList.prototype.append=function(value){
	var newElement=new linkedElement(value,this.last,undefined,this);
	if(this.last!==undefined){
		this.last.next=newElement;
	}else{
		this.first=newElement;
	}
	this.last=newElement;
}
linkedList.prototype.prepend=function(value){
	var newElement=new linkedElement(value,undefined,this.first,this);
	if(this.first!==undefined){
		this.first.previous=newElement;
	}else{
		this.last=newElement;
	}
	this.first=newElement;
}
