# # API Documentation

## Introduction

This is an Event App endpoint. It is built using Express.js and mongoDB. This API interacts with the MONGODB database through prismajs in order to manage and organize data.

## Table of Contents

- [# API Documentation](#-api-documentation)
  - [Introduction](#introduction)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisite](#prerequisite)
    - [Installation](#installation)
    - [Running API](#running-api)
  - [How To Use URI String](#how-to-use-uri-string)
  - [Explaining Prismajs](#explaining-prismajs)

## Getting Started

To start using the Event App API, you'll need to understand the available endpoints and how to interact with them. This documentation provides detailed information on each endpoint, including request and response formats.

### Prerequisite

Before this project can be executed, there are some dependencies that need to already be installed on your system which are

- node and npm
- Creating a mongodb database and extracting your URI and check [how to use URI String](#how-to-use-uri-string) below

### Installation

1. Clone the repository to your local machine

   ```
   git clone https://github.com/yourusername/event-app-api.git
   ```

2. Navigate to the folder you cloned it into
   ```
   cd folder-name
   ```
3. Install all the dependencies that comes with the project
   ```
   npm install
   ```

### Running API

To run the project, we will use the nodemon dependency (which already comes with the project)

```
nodemon server.js
```

Then go to `http://localhost:9000` where the api will be available

## How To Use URI String

- Create a .env file and add the following as key: value
  - PORT: 9000 (can be any port example: 3000)
  - DATABASE_URL: your MONGODB database URI

## Explaining Prismajs

In the project, there is a folder called "prisma" which has the "schema.prisma" file in it. This is the file where the models are created. The following are the steps in creating and implementing prisma

1. Install prisma
   ```
   npm install prisma
   ```
2. Set up prisma project using the command below, the change the provider of datasource to mongodb and you are set.
   ```
   npx prisma init
   ```
3. The above step not only create the prisma file but also generates an .env and a .gitignore file. In the env file, there is an already generated database_url, change it to your mongodb url

4. Install @prisma/client

   ```
   npm install @prisma/client
   ```

5. Whenever you update the prisma schema (e.g when creating a model), run the below command to update your prisma/client
   ```
   npx prisma generate
   ```

Note: All these packages have been included in this project. Hence, there is no need to reinstall.
