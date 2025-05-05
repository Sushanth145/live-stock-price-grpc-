// server.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const axios = require('axios');
const ALPHA_VANTAGE_API_KEY = 'XVH330QF8DL40NTM';
const PROTO_PATH = path.join(__dirname, 'protos', 'stock.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const stockProto = grpc.loadPackageDefinition(packageDefinition).stock;
async function fetchLivePrice(symbol) {
    try {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
      const response = await axios.get(url);
      const data = response.data["Global Quote"];
      if (!data) return null;
      return {
        symbol: data["01. symbol"],
        price: parseFloat(data["05. price"]),
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error("API error:", error.message);
      return null;
    }
  }
  async function getCurrentPrice(call, callback) {
    const symbol = call.request.symbol;
    const result = await fetchLivePrice(symbol);
  
    if (result) callback(null, result);
    else callback({ code: 13, message: "Failed to fetch stock data" });
  }

  function subscribeStockPrice(call) {
    const symbol = call.request.symbol;
    const intervalId = setInterval(async () => {
      const result = await fetchLivePrice(symbol);
      if (result) call.write(result);
    }, 60000); 
  
    call.on('cancelled', () => {
      clearInterval(intervalId);
      console.log(`Client unsubscribed from ${symbol}`);
    });
  }
function main() {
  const server = new grpc.Server();
  server.addService(stockProto.StockService.service, {
    GetCurrentPrice: getCurrentPrice,
    SubscribeStockPrice: subscribeStockPrice,
  });
  const PORT = '50051';
  server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log(`gRPC server running on port ${PORT}`);
      server.start();
    }
  );
}
main();
