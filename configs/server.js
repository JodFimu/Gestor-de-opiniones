"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";   
import { dbConnection } from "./mongo.js";
import { swaggerDocs, swaggerUi } from "./swagger.js";
import  apiLimiter from "../src/middlewares/rate-limit-validators.js";
import  {createAdmin, createDefaultCategory } from "./default-data.js"
import authRoutes from "../src/auth/auth.routes.js";
import userRoutes from "../src/user/user.routes.js";
import categoryRoutes from "../src/category/category.routes.js";
import postRoutes from "../src/post/post.routes.js";
import commentRoutes from "../src/comment/comment.routes.js";

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(apiLimiter);
}

const routes = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    app.use("/gestorDeComentarios/v1/auth", authRoutes);
    app.use("/gestorDeComentarios/v1/user", userRoutes);
    app.use("/gestorDeComentarios/v1/category", categoryRoutes);
    app.use("/gestorDeComentarios/v1/post", postRoutes);
    app.use("/gestorDeComentarios/v1/comment", commentRoutes);
}

const conectarDB = async () => {
    try {
        await dbConnection();
    } catch (err) {
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
};

export const initServer = () => {
    const app = express();
    try {
        createAdmin();
        createDefaultCategory();
        middlewares(app);
        conectarDB();
        routes(app);
        const port = process.env.PORT; 
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
};
