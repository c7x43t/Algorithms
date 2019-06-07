// empty objects have slightly faster access times however their creation is inefficient: Object.create(null);
// overwwriting the prototype of a constructor solves the creation performance issue
// usage: new Empty();
const Empty = function () { };
Empty.prototype = Object.create(null);
