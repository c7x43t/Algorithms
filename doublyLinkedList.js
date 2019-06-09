function linkedElement(value,previous=null,next=null){
	this.value=value;
	this.replace=function(value){
		var newElement=new linkedElement(value,this.previous,this.next);
		if(this.previous!==null) this.previous.next=newElement;
		if(this.next!==null) this.next.previous=newElement;
		return newElement;
	}
	this.previous=previous;
	this.next=next;
}
function linkedList(){
	this.first=null;
	this.last=null;
	this.append=function(value){
		var newElement=new linkedElement(value,this.last);
		if(this.last!==null){
			this.last.next=newElement;
		}else{
			this.first=newElement;
		}
		this.last=newElement;
	}
	this.prepend=function(value){
		var newElement=new linkedElement(value,undefined,this.first);
		if(this.first!==null){
			this.first.previous=newElement;
		}else{
			this.last=newElement;
		}
		this.first=newElement;
	}
}
