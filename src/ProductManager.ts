import products from "../res/products.json";
import Product from "./Product";
import { addProductErrors } from "./enums";
import { arrayToJSON } from "./utils";
import SQLQueries from "./db/SQLQueries";

let SQLQuery: SQLQueries = new SQLQueries();

export default class ProductManager {
    addProduct(product: Product): string {
        return SQLQuery.addProduct(product);
    }

    getProductByID(id: Number): string {
        return SQLQuery.getProductByID(id);
    }

    getProductByName(name: string): string {
        return SQLQuery.getProductByName(name);
    }

    getProductByPrice(price: number): string {
        return SQLQuery.getProductByPrice(price);
    }

    getProductByStock(stock: number): string {
        return SQLQuery.getProductByStock(stock);
    }
}
