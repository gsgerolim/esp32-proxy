import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";

const app = express();

// Libera CORS para qualquer origem
app.use(cors());

// Proxy REST API
app.use("/api", createProxyMiddleware({
  target: "http://esp32.local",
  changeOrigin: true,
  pathRewrite: { "^/api": "/api" },
  secure: false
}));

// Proxy WebSocket
app.use("/ws", createProxyMiddleware({
  target: "ws://esp32.local:81",
  ws: true,
  changeOrigin: true,
  secure: false
}));

// Teste
app.get("/", (req, res) => {
  res.send("Proxy do ESP32 rodando ✅");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy rodando na porta ${port}`);
});
