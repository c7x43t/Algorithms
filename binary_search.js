// source: https://stackoverflow.com/questions/22697936/binary-search-in-javascript/44981570#44981570
const clz32 = Math.clz32 || (function(log, LN2){
  return function(x) {
    return 31 - log(x >>> 0) / LN2 | 0; // the "| 0" acts like math.floor
  };
})(Math.log, Math.LN2);
function binarySearch(array, ARG_start, ARG_initLen){
  // Range of [start, start+len): only start is inclusive. It works
  // similarly to "...".substr(start, len).indexOf(sValue)
  // `void 0` is shorthand for `undefined`
  var start = ARG_start === void 0 ? 0 : ARG_start |0;
  var initLen = (ARG_initLen===void 0 ? (array.length|0)-start : ARG_initLen) |0;
  initLen = initLen - 1 |0;
  const compGoto = clz32(initLen) & 31;
  return function(sValue) {
    var len = initLen | 0;
    switch (compGoto) {
      case 0:
        if (len & 0x80000000) {
          const nCB = len & 0x80000000;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 1:
        if (len & 0x40000000) {
          const nCB = len & 0xc0000000;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 2:
        if (len & 0x20000000) {
          const nCB = len & 0xe0000000;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 3:
        if (len & 0x10000000) {
          const nCB = len & 0xf0000000;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 4:
        if (len & 0x8000000) {
          const nCB = len & 0xf8000000;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 5:
        if (len & 0x4000000) {
          const nCB = len & 0xfc000000;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 6:
        if (len & 0x2000000) {
          const nCB = len & 0xfe000000;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 7:
        if (len & 0x1000000) {
          const nCB = len & 0xff000000;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 8:
        if (len & 0x800000) {
          const nCB = len & 0xff800000;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 9:
        if (len & 0x400000) {
          const nCB = len & 0xffc00000;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 10:
        if (len & 0x200000) {
          const nCB = len & 0xffe00000;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 11:
        if (len & 0x100000) {
          const nCB = len & 0xfff00000;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 12:
        if (len & 0x80000) {
          const nCB = len & 0xfff80000;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 13:
        if (len & 0x40000) {
          const nCB = len & 0xfffc0000;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 14:
        if (len & 0x20000) {
          const nCB = len & 0xfffe0000;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 15:
        if (len & 0x10000) {
          const nCB = len & 0xffff0000;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 16:
        if (len & 0x8000) {
          const nCB = len & 0xffff8000;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 17:
        if (len & 0x4000) {
          const nCB = len & 0xffffc000;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 18:
        if (len & 0x2000) {
          const nCB = len & 0xffffe000;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 19:
        if (len & 0x1000) {
          const nCB = len & 0xfffff000;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 20:
        if (len & 0x800) {
          const nCB = len & 0xfffff800;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 21:
        if (len & 0x400) {
          const nCB = len & 0xfffffc00;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 22:
        if (len & 0x200) {
          const nCB = len & 0xfffffe00;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 23:
        if (len & 0x100) {
          const nCB = len & 0xffffff00;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 24:
        if (len & 0x80) {
          const nCB = len & 0xffffff80;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 25:
        if (len & 0x40) {
          const nCB = len & 0xffffffc0;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 26:
        if (len & 0x20) {
          const nCB = len & 0xffffffe0;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 27:
        if (len & 0x10) {
          const nCB = len & 0xfffffff0;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 28:
        if (len & 0x8) {
          const nCB = len & 0xfffffff8;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 29:
        if (len & 0x4) {
          const nCB = len & 0xfffffffc;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 30:
        if (len & 0x2) {
          const nCB = len & 0xfffffffe;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }
      case 31:
        if (len & 0x1) {
          const nCB = len & 0xffffffff;
          len ^= (len ^ (nCB-1)) & ((array[start+nCB|0] <= sValue |0) - 1 >>>0);
        }

    }
    if (array[start+len|0] !== sValue) {
      // remove this if-statement to return the next closest
      // element going downwards from the searched-for value
      // OR 0 if the value is less than all values in the
      // array
      return -1 - start - len |0;
    }
    return start + len |0;
  };
}
/* OLD VERSION
// source: https://gist.github.com/kidGodzilla/92508419261b98ea6a30
function binarySearch(array, value, j=0, length=array.length) {
    while (j < length) {
    	var i = (length + j - 1) >> 1; // move the pointer to 
      if (value > array[i]) 
        j = i + 1;
      else if (value < array[i]) 
        length = i;
      else
        return i
    }
  return -1
}
*/
