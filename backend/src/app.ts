import express from "express";
import productRoutes from "./modules/product/product.routes"

const app = express();

app.use(express.json());
app.use("/api/productos", productRoutes)

app.get("/health", (req, res) => {
    res.send({"status": "OK"})
})

export default app;