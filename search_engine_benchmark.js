// dataset: https://raw.githubusercontent.com/scrollmapper/bible_databases/master/json/t_kjv.json

// elasticsearch API for the browser
function noop(){}
function httpRequest(method,url,headers={},content,callback=noop){
	const request = new XMLHttpRequest();
    request.open(method, url,true);
	for(var headerName in headers){
		if(headers.hasOwnProperty(headerName))
			request.setRequestHeader(headers,headers[headerName]);
	}
    request.send(content);
    request.onreadystatechange = (e) => {
      if (request.readyState == 4 && request.status == 200)
                callback(request.responseText);
 
    }
}
function createIndex(name){
	const url=`http://localhost:9200/${name}?pretty`;
	const method = "PUT";
	return axios({
		method:method,
		url:url
	});
}
function insertDocument(indexName,documentId,content){
	const url=`http://localhost:9200/${indexName}/_doc/${documentId}`;
	const method = "PUT";
	return axios({
		method:method,
		url:url,
		data: content
	});
}
function search(indexNames,query){
	const indexName=typeof indexNames === "string" ? indexNames : indexNames.join instanceof Function ? indexNames.join() : null;
	if(indexNames===null) throw new Error("wrong indexNames");
	const url=`http://localhost:9200/${indexName}/_search?q=${query}`;
	const method = "GET";
	return axios({
		method:method,
		url:url
	});
}

//
async function indexBible(offset){
	var rows=temp1.resultset.row;
	var id=1;
	var result;
	for(let row of rows){
		console.log("indexing",id+offset);
		result = await insertDocument("bible2",offset+id++,{body:row.field[4]});
	}
}
async function indexBibleRepeat(n){
	for(var i=1;i<=n;i++){
 await indexBible(data.resultset.row.length*i);
}

}
async function queryBible(query,iterations){
	var result;
	var t=performance.now();
	for(let i=0;i<iterations;i++){
		result = await search("bible2",query);
	}
	return performance.now()-t;
}
async function queryBible2(query,iterations){
	var result=[];
	var t=performance.now();
	for(let i=0;i<iterations;i++){
		result.push(search("bible2",query));
	}
	await Promise.all(result);
	return performance.now()-t;
}
async function queryBible3(query,iterations,parallel){
	var t=performance.now();
	for(let i=0;i<iterations;i++){
		await queryBible2(query,parallel);
	}
	return performance.now()-t;
}

