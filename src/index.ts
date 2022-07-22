import settings from "../res/settings.json";
import postgresql from "./db/DBpostgresql";
import DBpostgresql from "./db/DBpostgresql";
import ProductManager from "./ProductManager";
import Product from "./Product";
import { addProductErrors } from "./enums";
import SQLQueries from "./db/SQLQueries";

const express = require("express");
const cors = require("cors");
const env = require("env-var");
const webApp = express();

let SQLQuery: SQLQueries = new SQLQueries();

const db = postgresql(async (connection) => {
    await connection.query(
        "CREATE TABLE IF NOT EXISTS products (id bigserial primary key, name text, price int, stock int)"
    );
});

let productManager: ProductManager = new ProductManager();

webApp.use(
    cors({
        origin: "*",
    })
);

webApp.get("/", (req, res) => {
    res.status(418).end("I am a teapot!");
});

webApp.get("/getProducts", async (req, res) => {
    res.status(200).end(JSON.stringify(await db.query(SQLQuery.getProducts())));
});

webApp.get("/getProductByID", async (req, res) => {
    res.status(200).end(
        JSON.stringify(await db.query(SQLQuery.getProductByID(req.query.id)))
    );
});

webApp.get("/getProductByName", async (req, res) => {
    res.status(200).end(
        JSON.stringify(
            await db.query(SQLQuery.getProductByName(req.query.name))
        )
    );
});

webApp.get("/getProductByPrice", async (req, res) => {
    res.status(200).end(
        JSON.stringify(
            await db.query(SQLQuery.getProductByPrice(req.query.price))
        )
    );
});

webApp.get("/getProductByStock", async (req, res) => {
    res.status(200).end(
        JSON.stringify(
            await db.query(SQLQuery.getProductByStock(req.query.stock))
        )
    );
});

webApp.post("/addProduct", (req, res) => {
    const id: string = req.query.id;
    const name: string = req.query.name;
    const price: string = req.query.price;
    const stock: string = req.query.stock;

    db.query(
        productManager.addProduct(
            new Product(Number(id), name, Number(price), Number(stock))
        )
    );

    res.status(200).end(`Product added!`);
});

webApp.post("/changeProductName", async (req, res) => {
    const selectedID = req.query.id;
    const newName = req.query.name;

    res.status(200).end(
        JSON.stringify(
            await db.query(SQLQuery.changeNameByID(selectedID, newName))
        )
    );
});

webApp.post("/changeProductPrice", async (req, res) => {
    const selectedID = req.query.id;
    const newPrice = req.query.price;

    res.status(200).end(
        JSON.stringify(
            await db.query(SQLQuery.changePriceByID(selectedID, newPrice))
        )
    );
});

webApp.post("/changeProductStock", async (req, res) => {
    const selectedID = req.query.id;
    const newStock = req.query.stock;

    res.status(200).end(
        JSON.stringify(
            await db.query(SQLQuery.changeStockByID(selectedID, newStock))
        )
    );
});

webApp.delete("/deleteProduct", async (req, res) => {
    db.query(SQLQuery.deleteProductByID(req.query.id));
    db.query(SQLQuery.rerollPK());
    res.status(200).end(`Product deleted!`);
});

webApp.post("/debug/testProducts", (req, res) => {
    const debugPassword: string = req.query.debugPassword;
    var internalDebugPassword: string;
    try {
        internalDebugPassword = env
            .get("STORE_DEBUG_PASSWORD")
            .required()
            .asString();
    } catch (e) {
        res.status(500).end(
            "Administrator did not set DEBUG Password. Please notify them."
        );
    }
    if (debugPassword == internalDebugPassword) {
        db.query(SQLQuery.addProduct(new Product(1, "Product A", 1, 25)));
        db.query(SQLQuery.addProduct(new Product(2, "Product B", 2, 50)));
        db.query(SQLQuery.addProduct(new Product(3, "Product C", 4, 75)));
        db.query(SQLQuery.addProduct(new Product(4, "Product D", 8, 100)));

        res.status(200).end("Added Test Products");
    } else {
        res.status(401).end("Invalid password");
    }
});

webApp.delete("/debug/removeAllproducts", (req, res) => {
    const debugPassword: string = req.query.debugPassword;
    var internalDebugPassword: string;
    try {
        internalDebugPassword = env
            .get("STORE_DEBUG_PASSWORD")
            .required()
            .asString();
    } catch (e) {
        res.status(500).end(
            "Administrator did not set DEBUG Password. Please notify them."
        );
    }
    if (debugPassword == internalDebugPassword) {
        db.query(SQLQuery.deleteAllProducts());
        db.query(SQLQuery.resetPK());
        res.status(200).end("Removed All Products");
    } else {
        res.status(401).end("Invalid password");
    }
});

webApp.listen(settings["server"]["port"], () => {
    var internalDebugPassword: string;
    try {
        internalDebugPassword = env
            .get("STORE_DEBUG_PASSWORD")
            .required()
            .asString();
    } catch (e) {
        console.log(
            "Administrator did not set DEBUG Password. Please notify them."
        );
    }

    console.log(
        `API on Port: ${settings["server"]["port"]}, with DEBUG Password: ${internalDebugPassword}`
    );
});
