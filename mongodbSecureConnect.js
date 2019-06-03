/* A helper function for the mongodb npm package */
// mongoAsyncConnect helper for mongoSecureConnect
function mongoAsyncConnect(MongoClient,url){
    return new Promise(function(resolve,reject){
        MongoClient.connect(url, function(err, client) {
            try{
                assert.equal(null, err);
                resolve(client)
            }catch(assertErr){
                reject(assertErr);
            }
        });
    });
}
// mongoSecureConnect waits until the server is online and guarantees eventually a successful connection
// returns client without error
async function mongoSecureConnect(MongoClient,url,func){
    var connected=false;
    var client;
    while(!connected){
        try{
            client=await mongoAsyncConnect(MongoClient,url);
            connected=true;
            console.log("Connected successfully to mongodb server");
        }catch(err){
            console.log("Connection to mongodb failed. Please start the mongodb server.", err);
            await delay(500);
        }
    }
    func(client);
}
