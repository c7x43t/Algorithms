// Intersecting 2 ordered lists of length n and m is O(n+m)
// This can be sped up by skipping elements
// The stepsize is determined by the ratio of lengths of the lists
// The skipped elements need to be checked after skipping some elements:
// In the case of step size 2 : Check the previous element
// In case step size>2 : Binary search the previously skipped range
// This results in the best case complexity of O(n+n), if n<m
// or the more propable complexity of O(n+n+n*log2(m/n)), if n<m
// based on https://cs.stackexchange.com/a/65866 describing following paper:
// http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.419.8292

// TODO: fix failing test:
var a=[447, 2703, 2715];
var b=[7, 21, 23, 24, 2020, 2177, 2204, 2205, 2211, 2212, 2215, 2353, 2363, 2392, 2427, 2440, 2443, 2447, 2453, 2455, 2464, 2466, 2474, 2477, 2478, 2484, 2486, 2489, 2498, 2500, 2513, 2514, 2528, 2541, 2542, 2548, 2549, 2551, 2556, 2573, 2574, 2579, 2606, 2607, 2640, 2660, 2674, 2680, 2684, 2691, 2709, 2715, 2717];
// should return [2715]
function intersect2OrderedSets(a, b) {
	let result=[];
    let i=0;
	let j=0;
    let a_len=a.length;
	let b_len=b.length;
    // trying to minimize false branch predictions by assuming
    // that a.len() < b.len() and there are only a few matching values (~<50%)
    while(true) { 
        if (a[i] > b[j]) {     
            while (j < b_len && a[i] > b[j]) {
                j+=2;
            }
            if (j >= b_len) {
                break;
            }
            if (a[i] <= b[j-1]) {
                j-=1;
            }
        } else if (a[i] < b[j]) {
            while (i < a_len && a[i] < b[j]) {
                i+=2;
            }
            if (i >= a_len) {
                break;
            }
            if (a[i-1] >= b[j]) {
                i-=1;
            }
        } else { // &a[i] == &b[j]
            result.push(a[i]);
            i+=1;
            j+=1;
            if (i == a_len || j == b_len) {
                break;
            }
        }
    }
    return result;
}
function intersectOrderedSets() {
    var shortest = 0;
    for (var i = 1; i < arguments.length; i++)
        if (arguments[i].length < arguments[shortest].length) shortest = i;
    var result = arguments[shortest];
    for (var i = 0, a, b, j, k, ratio, index; i < arguments.length; i++) {
        if (result.length === 0) return result;
        if (i === shortest) continue;
        a = result;
        b = arguments[i];
        result = intersect2OrderedSets(a, b);
    }
    return result;
}
/* Old intersection:
function binarySearch(array, value, j = 0, length = array.length) {
    while (j < length) {
        var i = (length + j - 1) >> 1; // move the pointer to
        if (value > array[i])
            j = i + 1;
        else if (value < array[i])
            length = i;
        else
            return i;
    }
    return -1;
}
function intersect2OrderedSets(a, b) {
    var j = 0;
    var k = 0;
    var ratio = ~~(b.length / a.length) - 1 || 1;
    var result = [];
	var index;
    switch (ratio) {
        case 1:
            while (j < a.length) {
                if (a[j] === b[k]) {
                    result.push(a[j]);
                    j++;
                    k++;
                } else if (a[j] < b[k]) {
                    while (a[j] < b[k]) j++;
                } else {
                    while (b[k] < a[j]) k++;
                    if (k >= b.length) break;
                }
            }
            break;
        case 2:
            while (j < a.length) {
                if (a[j] === b[k]) {
                    result.push(a[j]);
                    j++;
                    k++;
                } else if (a[j] < b[k]) {
                    while (a[j] < b[k]) j++;
                } else {
                    while (b[k] < a[j]) k += 2;
                    if (k - 1 >= b.length) break;
                    if (a[j] <= b[k - 1]) k--;
                }
            }
            break;
        default:
            while (j < a.length) {
                if (a[j] === b[k]) {
                    result.push(a[j]);
                    j++;
                    k++;
                } else if (a[j] < b[k]) {
                    while (a[j] < b[k]) j++;
                } else {
                    while (b[k] < a[j]) k += ratio;
                    index = binarySearch(b, a[j], k - ratio + 1, k + 1 < b.length ? k + 1 : b.length - 1);
                    if (index > -1) {
                        result.push(a[j]);
                        j++;
                        k = index + 1;
                    } else {
                        j++;
                        k = k - ratio + 1;
                    }
                    if (k >= b.length) break;
                }
            }
    }
    return result;
}

function intersectOrderedSets() {
    var shortest = 0;
    for (var i = 1; i < arguments.length; i++)
        if (arguments[i].length < arguments[shortest].length) shortest = i;
    var result = arguments[shortest];
    for (var i = 0, a, b, j, k, ratio, index; i < arguments.length; i++) {
        if (result.length === 0) return result;
        if (i === shortest) continue;
        a = result;
        b = arguments[i];
        result = intersect2OrderedSets(a, b);
    }
    return result;
}
*/
