import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

// --- Proxy REST API ---
app.use("/api", createProxyMiddleware({
  target: "http://esp32.local", // aqui depois você troca para IP público ou túnel
  changeOrigin: true,
  pathRewrite: { "^/api": "/api" },
  secure: false
}));

// --- Proxy WebSocket ---
app.use("/ws", createProxyMiddleware({
  target: "ws://esp32.local:81",
  ws: true,
  changeOrigin: true,
  secure: false
}));

// --- Rota de teste ---
app.get("/", (req, res) => {
  res.send("Proxy do ESP32 rodando ✅");
});

// Porta exigida pelo Render
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy rodando na porta ${port}`);
});
