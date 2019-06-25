// fastest sort algorithm for arrays of numbers combining heap sort and quick sort algorithms
// significantly faster than Array.prototype.sort
var sort=(function(){
    var heap3Sort = (function(){
        /*jshint bitwise: false*/
        "use strict";
      function swap(ary, a, b) {
          var t = ary[a];
          ary[a] = ary[b];
          ary[b] = t;
      }
      
      function shiftDown(ary, start, end) {
          var root = start,
              child, s, root21;
      
          while ((root21 = (root << 1) + 1) <= end) {
              child = root21;
              s = root;
      
              if (ary[s] < ary[child]) {
                  s = child;
              }
     
              var child1 = child + 1;
              if (child1 <= end && ary[s] < ary[child1]) {
                  s = child1;
              }
      
              if (s !== root) {
                  swap(ary, root, s);
                  root = s;
              } else {
                  return;
              }
          }
      }
    
     
      return function heap3Sort(ary) {
          // heapify
          var len = ary.length;
          for (var start = (len >>> 1) - 1; start >= 0; start--) {
              shiftDown(ary, start, len - 1);
          }
          for (var end = len - 1; end > 0; end--) {
              swap(ary, end, 0);
              shiftDown(ary, 0, end - 1);
          }
          return ary;
      };
     
    })();
    var quickmiddleSort = (function(){
        /*jshint bitwise: false*/
        "use strict";
    
        /**
        * Quicksort algorithm. It's with complexity O(n log(n)).
        * In this version of quicksort I use the middle element of the
        * array for pivot.
        */
    
    
        /**
        * Quicksort algorithm
        *
        * @public
        * @param {array} array Array which should be sorted.
        * @return {array} Sorted array.
        */
    
        /**
        * Partitions the array in two parts by the middle elements.
        * All elemnts which are less than the chosen one goes left from it
        * all which are greater goes right from it.
        *
        * @param {array} array Array which should be partitioned
        * @param {number} left Left part of the array
        * @param {number} right Right part of the array
        * @return {number}
        */
        function partition(array, left, right) {
            var pivot = array[(left + right) >>> 1];
            while (left <= right) {
                while (array[left] < pivot) { left++; }
                while (array[right] > pivot) { right--; }
                if (left <= right) {
                    var temp = array[left];
                    array[left++] = array[right];
                    array[right--] = temp;
                }
            }
            return left;
        }
    
        /**
        * Recursively calls itself with different values for
        * left/right part of the array which should be processed
        *
        * @private
        * @param {array} array Array which should be processed
        * @param {number} left Left part of the array which should be processed
        * @param {number} right Right part of the array which should be processed
        */
        function quicksort(array, left, right) {
            var mid = partition(array, left, right);
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
    return function sort(v){
         return (v.length<1e3?heap3Sort:quickmiddleSort)(v);
    }
}());
// quick middlesort with inlined functions and unrolled recursion
function quickmiddleSort(array) {
	var left=0;
	var right=array.length-1;
	var mid;
	var pivot;
	var partLeft;
	var partRight;
	// QUICKSORT START
	while(true){
		// PARTITION START
		partLeft=left;
		partRight=right;
		pivot = array[(partLeft + partRight) >>> 1];
		while (partLeft <= partRight) {
			while (array[partLeft] < pivot) { partLeft++; }
			while (array[partRight] > pivot) { partRight--; }
			if (partLeft <= partRight) {
				var temp = array[partLeft];
				array[partLeft++] = array[partRight];
				array[partRight--] = temp;
			}
		}
        mid=partLeft;
		// PARTITION END
		if (left < mid - 1) {
			right=mid-1;
			continue;
		}
		if (right > mid) {
			left=mid;
			continue;
		}
		break;
	}
	// QUICKSORT END
	return array;
};

// heap 3 sort with inlined functions
function heap3Sort(ary) {
  // heapify
  var len = ary.length;
  var shiftStart, shiftEnd;
  var root, child, s, root21;
  for (var start = (len >>> 1) - 1; start >= 0; start--) {
	  // SHIFT START
	  root=start;
	  shiftEnd=len-1;
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
			  var tmp=ary[root];
			  ary[root]=ary[s];
			  ary[s]=tmp;
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
	  var tmp=ary[end];
	  ary[end]=ary[0];
	  ary[0]=tmp;
	  // SWAP END
	  // SHIFT START
	  root=0;
	  shiftEnd=end-1;
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
			  var tmp=ary[root];
			  ary[root]=ary[s];
			  ary[s]=tmp;
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
/*
minified:
var sort=function(){var k=function(){function f(b,c,e){for(var a,d;(d=(c<<1)+1)<=e;)if(a=d,d=c,b[d]<b[a]&&(d=a),a+=1,a<=e&&b[d]<b[a]&&(d=a),d!==c){a=b;var f=d,g=a[c];a[c]=a[f];a[f]=g;c=d}else break}return function(b){for(var c=b.length,e=(c>>>1)-1;0<=e;e--)f(b,e,c-1);for(--c;0<c;c--){e=b;var a=e[c];e[c]=e[0];e[0]=a;f(b,0,c-1)}return b}}(),l=function(){function f(b,c,e){var a=c;for(var d=e,h=b[a+d>>>1];a<=d;){for(;b[a]<h;)a++;for(;b[d]>h;)d--;if(a<=d){var g=b[a];b[a++]=b[d];b[d--]=g}}c<a-1&&f(b,c,
a-1);e>a&&f(b,a,e)}return function(b){f(b,0,b.length-1);return b}}();return function(f){return 1E3>f.length?k(f):l(f)}}()
*/
