# Next.js OpenJira App
To run locally, a database is needed
```
docker-compose up -d
```

* -d means detached 

MongoDb local URL : mongodb://localhost:27017/entriesdb

## To _delete_ and _refill_ database with test data
GET on endpoint 

```
{baseURL}/api/seed
```