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
        "password": "password",
        "useSeperateCredentials": 1
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
    * `useSeperateCredentials`: Whether or not to use a seperate credentials JSON for the database.
       If this is set to 1 the database credentials will be stored in a file called `dbCreds.json`. and - user, password - fields will be ignored.

# dbCreds JSON Structure

The dbCreds JSON file is a JSON file that contains the credentials for the database.

The structure of the dbCreds JSON file is as follows:

```
{
    "user": "user",
    "password": "password"
}
```

## Explanation

    * `user`: The user of the database.
    * `password`: The password of the database.
