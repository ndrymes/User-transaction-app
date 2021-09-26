# App Test

The task is to build a transaction app that debits and credit a single user

# Get Started

- Clone the repository using git clone https://github.com/ndrymes/User-transaction-app.git
- Run `npm i` or `npm install` to install all app dependencies
- Make a copy of the sample.env file and rename to .env
- Start the app at the root directory using
  - `npm run dev` for development
  - `npm run start` for production

## To run the app via docker

```
docker-compose up

```
# Demo

The app is hosted on heroku. The base url is <a href="https://immense-stream-85373.herokuapp.com/">https://immense-stream-85373.herokuapp.com/</a>.
The default endpoint is an health check endpoint that returns a success response.

## API

There are multiple endpoints that can be used to retrieve records. Please find below a POSTMAN documentation url is <a href="https://documenter.getpostman.com/view/7667873/UUxxhUPR">https://documenter.getpostman.com/view/7667873/UUxxhUPR</a>.

| Parameter   | Description                                 |
| ----------- | ------------------------------------------- |
| Base Url    | https://immense-stream-85373.herokuapp.com/ |
| Http Method | POST                                        |
| Path        | /account/transaction/:accountId             |
| Http Method | GET                                         |
| Path        | /account/balance/:accountId                 |
| Http Method | GET                                         |
| Path        | /account/history/:accountId                 |

> These codes are custom to the app and the http status codes are still going to be sent

### Sample Request Parameters
```
    {
    "type": "debit",
    "amount": 100
}
```

### Sample Success Response Parameters

```
   {
    "error": false,
    "code": 200,
    "message": "Data gotten successfully",
    "data": {
        "balance": 100,
        "ledgerBalance": 0,
        "deleted": false,
        "userId": "60d9b72887812e0011504b0d",
        "accountId": "60d9b43387812e0011504aec",
        "createdAt": "2021-06-28T11:48:15.731Z",
        "updatedAt": "2021-09-26T16:38:17.763Z"
    }
}
```

### Sample Error Response Parameters

```
    {
    "error": true,
    "code": 500,
    "message": "insufficent balance",
    "data": []
}
```

# Project Structure

![file structure](https://i.ibb.co/KVyzY5C/structure.png)

# Libraries Used

- Mocha - For running unit tests
- Restidy - Popular framework with a lean set of features for running apps
- Jest - For testing purpose

# Todo

I had a lot of fun building this but there are some improvements I can still make:

- More tests, especially  unit tests for all other services and integration using super test.
- Add a dependency injection library like awilix to handle injection of dependencies
- Include a makefile to ease the execution of some common tasks

# Testing

- To run the tests, simply type `npm test`
- We can also get code coverage by `npm run coverage`

Thank you 👍
