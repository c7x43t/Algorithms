function linkedElement(value,previous,next){
	this.value=value;
	this.replace=function(value){
		var newElement=new linkedElement(value,this.previous,this.next);
		if(this.previous!==undefined) this.previous.next=newElement;
		if(this.next!==undefined) this.next.previous=newElement;
		return newElement;
	}
	this.previous=previous;
	this.next=next;
}
function linkedList(){
	this.first=undefined;
	this.last=undefined;
	this.append=function(value){
		var newElement=new linkedElement(value,this.last);
		if(this.last!==undefined){
			this.last.next=newElement;
		}else{
			this.first=newElement;
		}
		this.last=newElement;
	}
	this.prepend=function(value){
		var newElement=new linkedElement(value,undefined,this.first);
		if(this.first!==undefined){
			this.first.previous=newElement;
		}else{
			this.last=newElement;
		}
		this.first=newElement;
	}
}
