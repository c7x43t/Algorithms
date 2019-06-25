// 10x faster than Array.prototype.sort - see Benchmark section - 334 bytes gzip+min
// Inplace sorting with constant memory: O(1)
// Mixing Heapsort and Quicksort depending on Array size for best performance (<5% gain)
var sort = (function() {
    // heap 3 sort with inlined functions
    function heap3Sort(ary) {
        // heapify
        var len = ary.length;
        var shiftStart, shiftEnd;
        var root, child, s, root21;
        for (var start = (len >>> 1) - 1; start >= 0; start--) {
            // SHIFT START
            root = start;
            shiftEnd = len - 1;
            //shiftDown(ary, start, len - 1);
            while ((root21 = (root << 1) + 1) <= shiftEnd) {
                child = root21;
                s = root;

                if (ary[s] < ary[child]) {
                    s = child;
                }

                var child1 = child + 1;
                if (child1 <= shiftEnd && ary[s] < ary[child1]) {
                    s = child1;
                }

                if (s !== root) {
                    // SWAP START
                    //swap(ary, root, s);
                    var tmp = ary[root];
                    ary[root] = ary[s];
                    ary[s] = tmp;
                    // SWAP END
                    root = s;
                } else {
                    break;
                }
            }
            // SHIFT END           
        }
        for (var end = len - 1; end > 0; end--) {
            //swap(ary, end, 0);
            // SWAP START
            var tmp = ary[end];
            ary[end] = ary[0];
            ary[0] = tmp;
            // SWAP END
            // SHIFT START
            root = 0;
            shiftEnd = end - 1;
            //shiftDown(ary, 0, end - 1);
            while ((root21 = (root << 1) + 1) <= shiftEnd) {
                child = root21;
                s = root;

                if (ary[s] < ary[child]) {
                    s = child;
                }

                var child1 = child + 1;
                if (child1 <= shiftEnd && ary[s] < ary[child1]) {
                    s = child1;
                }

                if (s !== root) {
                    // SWAP START
                    //swap(ary, root, s);
                    var tmp = ary[root];
                    ary[root] = ary[s];
                    ary[s] = tmp;
                    // SWAP END
                    root = s;
                } else {
                    break;
                }
            }
            // SHIFT END
        }
        return ary;
    };

    var quickmiddleSort = (function() {
        function quicksort(array, left, right) {
            //var mid = partition(array, left, right);
            // PARTITION START
            var partLeft = left;
            var partRight = right;
            var pivot = array[(partLeft + partRight) >>> 1];
            while (partLeft <= partRight) {
                while (array[partLeft] < pivot) {
                    partLeft++;
                }
                while (array[partRight] > pivot) {
                    partRight--;
                }
                if (partLeft <= partRight) {
                    var temp = array[partLeft];
                    array[partLeft++] = array[partRight];
                    array[partRight--] = temp;
                }
            }
            var mid = partLeft;
            // PARTITION END
            if (left < mid - 1) {
                quicksort(array, left, mid - 1);
            }
            if (right > mid) {
                quicksort(array, mid, right);
            }
        }

        /**
         * Quicksort's initial point
         * @public
         */
        return function quickmiddleSort(items) {
            quicksort(items, 0, items.length - 1);
            return items;
        };

    }());
    
	return function sort(v) {
        return (v.length < 1e3 ? heap3Sort : quickmiddleSort)(v);
    }
}());
// Benchmark:
// sort: 12.2s, Array.prototype.sort: 139s
var ars=[
	new Array(1e4).fill().map(Math.random),
	new Array(1e3).fill().map(Math.random),
	new Array(5e2).fill().map(Math.random),
	new Array(1e2).fill().map(Math.random),
	new Array(10).fill().map(Math.random),
	new Array(1e5).fill().map(Math.random),
	//new Array(1e4).fill().map(Math.random)
];
var ns=[2.5e3,4e4,1e5,1.2e6,2e7,2e2];
var t1=performance.now();
var s;
var n, ar;
for(var j=0;j<6;j++){
ar=ars[j];
n=ns[j];
for(var i=0;i<n;i++){
	sort(ar.slice(0));
}
}
var t2=performance.now();
console.log(t2-t1);
// Minified
var sort=function(){function h(c){for(var d=c.length,f,e,a,b,g=(d>>>1)-1;0<=g;g--)for(e=g,f=d-1;(b=(e<<1)+1)<=f;)if(a=b,b=e,c[b]<c[a]&&(b=a),a+=1,a<=f&&c[b]<c[a]&&(b=a),b!==e)a=c[e],c[e]=c[b],c[b]=a,e=b;else break;for(--d;0<d;d--)for(a=c[d],c[d]=c[0],c[0]=a,e=0,f=d-1;(b=(e<<1)+1)<=f;)if(a=b,b=e,c[b]<c[a]&&(b=a),a+=1,a<=f&&c[b]<c[a]&&(b=a),b!==e)a=c[e],c[e]=c[b],c[b]=a,e=b;else break;return c}var k=function(){function c(d,f,e){for(var a=f,b=e,g=d[a+b>>>1];a<=b;){for(;d[a]<g;)a++;for(;d[b]>g;)b--;if(a<=
b){var h=d[a];d[a++]=d[b];d[b--]=h}}f<a-1&&c(d,f,a-1);e>a&&c(d,a,e)}return function(d){c(d,0,d.length-1);return d}}();return function(c){return(1E3>c.length?h:k)(c)}}();
