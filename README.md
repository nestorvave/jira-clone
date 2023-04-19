# Next.js JiraClone App

To run locally this site you need MongoDB and Docker desktop

```
docker-compose up -d
```

- -d means _detached_

* MongoDB Local URL

```
mongodb://localhost:27017/entriesdb
```

## Configurate ENV Variables

Rename **.env.template** file to **.env**

## Fill database with dummy data

API:

```
http://localhost:3000/api/seed
```
