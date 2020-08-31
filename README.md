# property-listing-service

## Tech Stack

- Language: [TypeScript](https://www.typescriptlang.org/)
- Language: [GraphQL](https://graphql.org/)
- Framework: [Express](https://expressjs.com/)
- Framework: [Apollo](https://www.apollographql.com/)
- Database: [MongoDb](https://www.mongodb.com/)
- Testing: [Jest](https://jestjs.io/)
- Source control: [Git](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)

## Prerequisites

- Install Node.js with [nvm](https://github.com/creationix/nvm).
- Use [node 12](https://nodejs.org/en/about/releases/) (current node LTS version).

## Setup ENV file
- Please make sure to set-up .env file.
- For your convenience .env file has been checked in with original values. ***Checking in .env file not recommended for production***.

## Database

- Mongodb connection url:
```
mongodb+srv://<username>:<password>@property-listing.u2tjw.mongodb.net/<database>
```

## 🚀 Quick start

- Run `npm install` to install all packages used in the project.
- Run `npm start` to start the api.
- Run `npm run dev` to start development mode.
- Run `npm test` to run all the tests in the test folder or files with `xxx.test.ts`.
- To access [playground](http://localhost:3000/graphql).

## Design Decisions

1.  Using [SimplyRETS](https://docs.simplyrets.com/) api by wrapping REST api in [GraphQL](https://graphql.org/).
2.  Listings query api will fetch data both SimpleRETS and mongo db Listing collection.
3.  ToggleFavorite query to toggle favorites for user.
4.  If user has already marked a listing as favorite, ToggleFavorite will remove the favorite.
5.  For each user favorite listing will be stored in user collection's.
6.  Used Basic HTTP Authentication , as mentioned in the acceptance criteria.
7.  For username and password for basic authentication, please refer to the ***mongodb collection details*** below.
6.  Using [jest](https://jestjs.io/) for unit testing

## Samples to run in [playground](http://localhost:3000/graphql)

**To fetch listings by city:**

```
query GetListingByCity {
  listings(city: "Houston") {
    address {
      city
    }
    property {
      roof
      subType
      parking {
        spaces
      }
    }
    mlsId
    office {
      name
    }
    favoriteCount
  }
}
```

**To toggle favorites:**

```
mutation Togglefavorites {
  toggleFavorite(mlsId: "1005192") {
    email
    name
    favorites
  }
}
```

## MongoDb Collections details
1. There are two collections in mongodb users and listings 
2. Below are the records for user collection
    a) email/username: user2@sideinc.com , password: user1
    b) email/username: user1@sideinc.com , password: user2
3. Password for users collection were encrypted using [bcrypt](https://www.npmjs.com/package/bcrypt) library
4. listings collection store property list (extra) details in the database.
5. ***It is not recommended to provide username and password details in a production setup, as provided above***

##HTTP Headers

1. To execute query or mutations from [playground](http://localhost:3000/graphql) 
you will need base 64 credentials in the header. Below are the credentials for your convenience. 
***It is not recommended to provide all the below details for production set up.***

2. For user1   
```
{
  "Authorization" : "Basic dXNlcjFAc2lkZWluYy5jb206dXNlcjE="
}
```
3. For user2

```
{
  "Authorization" : "Basic dXNlcjJAc2lkZWluYy5jb206dXNlcjI="
}
```