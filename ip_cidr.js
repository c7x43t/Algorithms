// example usage: new cidr("192.168.100.14/22")
function intToSubnetMask(int){
	var subnetMask=[0,0,0,0];
	for(i=0;i<4;i++){
		if(int>7){
			subnetMask[i]=255;
			int-=8;
		}else{
			subnetMask[i]=255-(2**(8-int)-1);
			int=0;
		}
	}
	return subnetMask;
}
function cidr(ip){
	var tmp=ip.split("/");
	this.ip=tmp[0].split(".").map(e=>+e);
	this.subnetMask=intToSubnetMask(+tmp[1]);
	this.subnet=this.ip.map((e,i)=>e&this.subnetMask[i]);
	this.start=ipToDec(this.subnet);
	this.range=subnetMaskToDec(this.subnetMask);
	this.end=this.start+this.range;
}
function ipToDec(ip){
	return ip.reduce((acc,e,i)=>acc+e*256**(3-i),0);
}
function subnetMaskToDec(subnet){
	return subnet.reduce((acc,e,i)=>acc+(255-e)*2**(8*(3-i)),0);
}
