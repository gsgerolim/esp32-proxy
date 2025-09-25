import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

// Proxy HTTP para o ESP32
app.use("/api", createProxyMiddleware({
  target: "http://esp32.local",
  changeOrigin: true,
  pathRewrite: { "^/api": "/api" }
}));

// Proxy WebSocket para o ESP32
app.use("/ws", createProxyMiddleware({
  target: "ws://esp32.local:81",
  ws: true,
  changeOrigin: true
}));

// Porta padrão do Render
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Proxy rodando na porta ${port}`);
});
