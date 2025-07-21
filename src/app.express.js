import express from "express";

const app = express();

app.use(express.json());

app.get("/api/products/ping", (req, res) => {
  res.json({ status: "ok", message: "pong" });
});

export default app;
