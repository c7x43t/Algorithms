// index size: ~ 146kB / distance / 1000 words
// https://www.kaggle.com/yk1598/symspell-spell-corrector
// https://github.com/wolfgarbe/SymSpell
// letters -> words -> sentences -> paragraphs/documents
function calculateWordDistance1Deletes(word){
    var deletes={};
    var fragment;
    for(var j=0;j<word.length;j++){
      fragment=wordCut(word,j);
      deletes[fragment]!==undefined?deletes[fragment]++:(deletes[fragment]=1);
    }
    return deletes;
}
function wordCut(word,n){
	return word.slice(0,n)+word.slice(n+1,word.length);
}
function calculateWordDistanceNDeletes(word,n=2){
	var deletes={0:{}};
	deletes[0][word]=1;
	for(var distance=1;distance<=n;distance++){
		deletes[distance]={};
		for(var fragment in deletes[distance-1]){
			if(fragment.length===1) continue;
			var tmp=calculateWordDistance1Deletes(fragment);
			for(var subFragment in tmp){
				if(deletes[distance][subFragment]!==undefined){
					deletes[distance][subFragment]+=tmp[subFragment];
				}else{
					deletes[distance][subFragment]=tmp[subFragment];
				}
			}
		}
	}
	return deletes;
}
function indexWordList(wordList,distance=2){
	var index={};
	var word, deletes;
	var wordPointer; // similar to a pointer pointing to a string
	var dist, prestentDist;
	
	for(var i=0;i<wordList.length;i++){
		word=wordList[i];
		wordPointer=[word];
		deletes=calculateWordDistanceNDeletes(word,distance);
		for(var distance in deletes){
			dist=+distance;
			for(var fragment in deletes[dist]){
				if(index[fragment]!==undefined){
					var presentDist=+(Object.keys(index[fragment])[0]);
					if(presentDist>dist){
						delete index[fragment][dist];
						index[fragment][dist]=[wordPointer];
					}else if(presentDist===dist){
						index[fragment][dist].push(wordPointer);
					}
				}else{
					index[fragment]={};

					index[fragment][dist]=[wordPointer];
					
				}
			}
		}
	}
	return index;
}
