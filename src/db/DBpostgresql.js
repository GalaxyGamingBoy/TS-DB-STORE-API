/*jshint esversion: 6 */

import postgresql from "pg";
import os from "os";
import settings from "../../res/settings.json";

const { Pool } = postgresql;

export default (callback = null) => {
    let selectedUser = settings.db.user;
    let selectedPassword = settings.db.password;

    const pool = new Pool({
        user: selectedUser,
        database: "storeAPI",
        password: selectedPassword,
        host: "127.0.0.1",
        port: 5432,
    });

    const connection = {
        pool,
        query: (...args) => {
            return pool.connect().then((client) => {
                return client.query(...args).then((res) => {
                    client.release();
                    return res.rows;
                });
            });
        },
    };

    process.postgresql = connection;

    if (callback) {
        callback(connection);
    }

    return connection;
};
