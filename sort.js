// fastest sort algorithm for arrays of numbers combining heap sort and quick sort algorithms
// significantly faster than Array.prototype.sort
var sort=(function(){
    return function sort(v){
        if(v.length<1e3){
            return heap3Sort(v);
        }else{
            return quickmiddleSort(v);
        }
    }
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
}());
