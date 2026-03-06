import express from "express";
import cors from "cors";
import productRoutes from "./modules/product/product.routes"

const app = express();

app.use(express.json());
app.use(cors())
app.use("/api/productos", productRoutes)

app.get("/health", (req, res) => {
    res.send({ "status": "OK" })
})

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500).json({
        message: err.message || "Error interno del servidor"
    });
});

export default app;