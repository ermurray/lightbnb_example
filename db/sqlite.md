# Test With SQLite

To test this db in sqlite, use the following steps:

> Start up sqlite3 with or without a db file, up to you.

```terminal
sqlite3
```

> Read the schema and seeds

```terminal
sqlite> .read sql/schema.sql
sqlite> .read sql/seeds.sql
```

> Make the output look better

```terminal
sqlite> .mode column
sqlite> .headers on
```

> Test it out

```terminal
sqlite> SELECT count(id) FROM users;
```

```terminal
count(id) 
----------
1000      
```