# Settings JSON Structure

The settings JSON file is a JSON file that contains the settings for the application.

The structure of the settings JSON file is as follows:

```
{
    "server": {
        "port": "5050"
    },
    "db": {
        "host": "127.0.0.1",
        "port": "5432",
        "user": "user",
        "password": "password"
    }
}

```

## Explanation

    * `server`: The server settings.
    * `db`: The database settings.

### Server Settings

    * `port`: The port that the server will listen on.

### Database Settings

    * `host`: The host of the database.
    * `port`: The port of the database.
    * `user`: The user of the database.
    * `password`: The password of the database.
