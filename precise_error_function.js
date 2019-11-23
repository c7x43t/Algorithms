// calculate erf(x) with greatest accuracy within the limits of js 64bit arithmetic

function fac(n){return n>1?n*fac(n-1):1}
var fac_cached=[];
for(var i=0;i<=170;i++) fac_cached.push(fac(i));
// Array index: number of approximtion steps n needed to correctly represent erf(value)
var arr=[];
for(var n=0;n<=169;n++) arr.push(Math.pow(1e-16*(2+n+1)*fac_cached[n],1/(2*n+1)));
function erfNthFactor(x,n){
	return (-1)**n*x**(2*n+1)/((2*n+1)*fac_cached[n]);
}
function binarySearch(arr,target,base=0,size=arr.length){
    while (size > 1) {
        // mid: [base..size)
        var half = ~~(size / 2);
        var mid = base + half;
        if (arr[mid] <= target) {
            base = mid
        }
        size -= half;
    }
	// return arr[base] === target?base:-1;
	// adapted to find greatest value smaller than the target value
	return base;
}
function erf_precise(x){
	if(x>7.2112639303613335) return 1;
	var precision=binarySearch(arr,x);
	var result=0;
	for(var n=0;n<=precision;n++) result+=erfNthFactor(x,n);
	return /*2/Math.sqrt(Math.PI)*/1.1283791670955126*result;
}
