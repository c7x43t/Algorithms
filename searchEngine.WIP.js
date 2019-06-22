

function matchQuery(query){
	var match;
	var invertedIndices=[];
	// this is where term lookup, error correction, stopwords, synonyms, etc. would kick in
	while(match=reg.exec(query)){
		invertedIndices.push(index[termIdMap.get(match[0])]);
	}
	return arraySelect(intersectOrderedSets(...invertedIndices),10);
}
// work in progress ... change api to:
// https://github.com/nextapps-de/flexsearch
// documents are stored in text_data, accessible by their id's
var index=[]; // reverse index wordId -> documentId
// number of docs in which a term appears is held
var termIdMap=new Map(); // term -> termId
var docData=[]; // documentId to document's meta data
var reg=/\w+/g;
var N=0; // number of documents
var avgLen=0;
// text data represents an array of documents (strings) to be indexed
text_data.forEach((document,docid)=>{
	var match;
	var key;
	N++;
	var terms=new Map();
	var len=0; // counting the number of words in this document
	var termId;
	while(match=reg.exec(document)){
		key=match[0].toLowerCase();
		// register term in termIdMap or obtain term's id
		if(!termIdMap.has(key)){
			termIdMap.set(key,index.length);
			termId=index.length;
			index.push([]);
        }else{
			termId=termIdMap.get(key);
		}
		if(!terms.has(termId)){
			terms.set(termId,1);
		}else{
			terms.set(termId,terms.get(termId)+1);
		}
		index[termId].push(docid);
		len++;
	}
	var docDataContent={
		terms: terms, // termId -> term frequencies of term i in doc j
		length: len, // document length
	}
	docData.push(docDataContent);
	// calculate average documetn length length;
	if(N>0){
		avgLen=(avgLen*(N-1)+len)/N;
	}else{
		avgLen=len;
	}
	
});
