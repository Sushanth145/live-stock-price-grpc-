import the grpc,protoloader(pl),axios

packagedefi = pl.loadSync(path)
sp = grpc.loadpackageDefination(pd).stock

function -->
  fetchlivep(s) 
     url = https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}
     return axios.get(url)

function -->
     getCurrentpri(c,cb)
        res = await flp(symbol)


main function -->
    s = grpc.server
    s.addservice(sp.StockService.service {
        gcp : gcp
        ssp : ssp}
    server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log(`gRPC server running on port ${PORT}`);
      server.start();
    }
  );


Streaming: gRPC supports four types of communication:

Unary (single request, single response)

Server streaming (single request, stream of responses)

Client streaming (stream of requests, single response)

Bidirectional streaming (stream of requests and responses)


client : 
 
c = new sp.StockService(
'link'
grpc.credentials.createInsecure()
);

c.gcp(symbol params ,(err,res) =>{
//this is urnary call


for the streming call means single request stream of response we need to create javascript settimeout function which will 
call that fetchprice function repeatedly

the function calls asynchronosly the fetchprice function along with the ssp function multiple times
in this way grpc help us to do microservices seam lessly

