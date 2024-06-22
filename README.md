<h1 align="center" style="font-weight: bold;">Kinvo Backend Challenge 💻</h1>

<p align="center">
 <a href="#tech">Technologies</a> • <a href="#started">Getting Started</a> • <a href="#routes">API Endpoints</a>
</p>

<p align="center">
    <b>A backend api for Kinvo challenge</b>
</p>

<h2 id="technologies">💻 Technologies</h2>

- list of all technologies you used
- TypeScript
- PostgreSQL
- Prisma
- Docker
- NodeJS

<h2 id="started">🚀 Getting started</h2>

I did this project to study more of backend and api rest, the challenge is from this [repository](https://github.com/kinvoapp/node.js-challenge), the kinvo original repository is already in portuguese but you can translate to read the challenge.

notes:
I recommend you to read the challenge before start. 

<h3>Prerequisites</h3>

Here you list all prerequisites necessary for running your project. For example:

- [NodeJS](https://nodejs.org/en)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

<h3>Cloning</h3>

Open your favorite terminal app and paste this command.

```bash
git clone https://github.com/nothiaki/KinvoBackendChallenge.git
```

<h3>Config .env variables</h2>

Use the `.env.example` as reference to create your configuration file `.env` with your database connection url and the port that you want the project running.

```yaml
DATABASE_URL={PRISMA_POSTGRESQL_CONNECTION}
```

<h3>Starting</h3>

In your terminal in the project directory type the following commands
please make sure you have all the dependencies installed before it

```bash
docker compose build
docker compose up
```

<h2 id="routes">📍 API Endpoints</h2>

Here you can list the main routes of your API, and what are their expected request bodies.

| route                   | description<br>
| <kbd>GET /finances</kbd>        | return list of all finances in database [details](#get-finances)<br>
| <kbd>GET /finances/:finance_id</kbd>        | return one finance [details](#get-finances-id)<br>
| <kbd>POST /finances</kbd>       | create a new finance [details](#post-finances)<br>
| <kbd>DELETE /finances/:finance_id</kbd> | delete a unique finance [details](#delete-finances)

| <kbd>GET /transactions?</kbd>        | return list of all transactions in database [details](#get-transactions)<br>
| <kbd>POST /transactions</kbd>       | create a new transaction [details](#post-transactions)<br>
| <kbd>PUT /transactions</kbd>       | update a existing transaction [details](#put-transactions)<br>
| <kbd>DELETE /transactions</kbd> | delete a unique transaction [details](#delete-transactions)

<h3 id="get-finances">GET /finances</h3>

**RESPONSE**
```json
[
  {
    "id": string,
    "balance": number
  }, ...
]
```

<h3 id="get-finances-id">GET /finances/:finance_id</h3>

**RESPONSE**
```json
{
  "id": string,
  "balance": number,
}
```

<h3 id="post-finances">POST /finances</h3>

**REQUEST**
```json
{
  "balance": number
}
```

**RESPONSE**
```json
{
  "message": "Finance created successfully",
  "finance": {
    "id": string,
    "balance": number
  }
}
```

<h3 id="delete-finances">DELETE /finances/:finance_id</h3>

**RESPONSE**
```json
204 no content
```

<h3 id="get-transactions">GET /transactions?</h3>
pages: page=int&limit=int
dates: start=yyyy-mm-dd&end=yyyy-mm-dd

**RESPONSE**
```json
[
  {
    "id": string,
    "amount": number,
    "transactionDate": string,
    "financeId": string
  }, ...
]
```

<h3 id="post-transactions">POST /transactions</h3>
**REQUEST**
```json
{
  "amount": number,
  "financeId": string
}
```

**RESPONSE**
```json
{
  "message": "Transaction made successfully",
  "transaction": {
    "id": string,
    "amount": number,
    "transactionDate": string,
    "financeId": string,
  },
  "finance": {
    "id": string,
    "balance": number
  }
}
```

<h3 id="put-transactions">PUT /transactions</h3>
**REQUEST**
```json
{
  "id": string,
  "newAmount": number,
  "financeId": string
}
```

**RESPONSE**
```json
{
  "message": "Transaction made successfully",
  "updatedTransaction": {
    "id": string,
    "amount": number,
    "transactionDate": string,
    "financeId": string,
  },
  "finance": {
    "id": string,
    "balance": number
  }
}
```

<h3 id="delete-transactions">DELETE /transactions/:transaction_id</h3>
**RESPONSE**
```json
204 no content
```
