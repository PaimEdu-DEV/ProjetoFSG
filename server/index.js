const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const apiRouter = require("./routes/api");
const { attachSocketHandlers } = require("./socket");

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json({ limit: "256kb" }));

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Programação Didática — API rodando.");
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

attachSocketHandlers(io);

server.listen(PORT, () => {
  console.log(`[servidor] Programação Didática ouvindo em http://localhost:${PORT}`);
});
