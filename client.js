// client.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'protos', 'stock.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const stockProto = grpc.loadPackageDefinition(packageDefinition).stock;

const client = new stockProto.StockService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Unary Call
client.GetCurrentPrice({ symbol: 'AAPL' }, (err, res) => {
  if (err) console.error(err);
  else console.log('Current Price:', res);
});

// Streaming Call
const stream = client.SubscribeStockPrice({ symbol: 'AAPL' });

stream.on('data', (data) => {
  console.log(
    `📈 ${data.symbol} - $${data.price} @ ${new Date(data.timestamp).toLocaleTimeString()}`
  );
});

stream.on('end', () => {
  console.log('Stream ended.');
});
