// Intersecting 2 ordered lists of length n and m is O(n+m)
// This can be sped up by skipping elements
// The stepsize is determined by the ratio of lengths of the lists
// The skipped elements need to be checked after skipping some elements:
// In the case of step size 2 : Check the previous element
// In case step size>2 : Binary search the previously skipped range
// This results in the best case complexity of O(n+n), if n<m
// or the more realistc complexity of O(n+n+n*log2(m/n)), if n<m
function binarySearch(array, value, start = 0, end = array.length) {
    var j = start,
        length = end;
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
function intersect2OrderedSetsEx(a, b) {
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

function intersectOrderedSetsEx() {
    var shortest = 0;
    for (var i = 1; i < arguments.length; i++)
        if (arguments[i].length < arguments[shortest].length) shortest = i;
    var result = arguments[shortest];
    for (var i = 0, a, b, j, k, ratio, index; i < arguments.length; i++) {
        if (result.length === 0) return result;
        if (i === shortest) continue;
        a = result;
        b = arguments[i];
        result = intersect2OrderedSetsEx(a, b);
    }
    return result;
}

