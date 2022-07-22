import Product from "../Product";

export default class SQLQueries {
    getProducts(): string {
        return "SELECT * FROM products";
    }

    getProductByID(id: Number): string {
        return `SELECT * FROM products WHERE id = ${id}`;
    }

    getProductByName(name: string): string {
        return `SELECT * FROM products WHERE name = '${name}'`;
    }

    getProductByPrice(price: Number): string {
        return `SELECT * FROM products WHERE price = ${price}`;
    }

    getProductByStock(stock: Number): string {
        return `SELECT * FROM products WHERE stock = ${stock}`;
    }

    addProduct(product: Product): string {
        return `INSERT INTO products (name, price, stock) VALUES ('${product.name}', ${product.price}, ${product.stock})`;
    }

    deleteAllProducts(): string {
        return "DELETE FROM products";
    }

    deleteProductByID(id: Number): string {
        return `DELETE FROM products WHERE id = ${id}`;
    }

    resetPK(): string {
        return "ALTER SEQUENCE products_id_seq RESTART WITH 1";
    }

    rerollPK(): string {
        return "ALTER TABLE products DROP COLUMN id, ADD id bigserial primary key, ADD new_name text, ADD new_price int, ADD new_stock int; UPDATE products SET new_name = name, new_price = price, new_stock = stock; ALTER TABLE products DROP COLUMN name CASCADE, DROP COLUMN price CASCADE, DROP COLUMN stock CASCADE; ALTER TABLE products RENAME COLUMN new_name TO name;  ALTER TABLE products RENAME COLUMN new_price TO price; ALTER TABLE products RENAME COLUMN new_stock TO stock; SELECT * FROM products";
    }
}
