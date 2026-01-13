const app = require("./app");
const { port } = require("./config/env");
const connectPostgres = require("./config/postgres");
const connectMongo = require("./config/mongo");

async function startServer() {
  await connectPostgres();
  await connectMongo();

  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
}

startServer();
