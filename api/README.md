# COVID19 API

The api for the COVID19 app.

## Setup

Change directory to `api` folder

```shell
$ cd api
```

Install dependencies

```shell
$ npm install
```

Create a config file

```shell
$ cp config.example.js config.js
```

Create an env file

```shell
$ cp .env.example .env
```

<strong>Note: Your .env file is where app credentials are stored locally. These credentials are read by the config.js file during runtime. If you need the config variables, please contact one of the contributors.</strong>

## Local development

```shell
$ npm run dev


To View Swagger documentation:

[http://localhost:8000/api-docs](http://localhost:8000/api-docs)


```

## Run in production mode

```shell
$ npm start
```
