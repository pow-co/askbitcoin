!["Ask Bitcoin Banner Logo"](https://bitcoinfileserver.com/e86b44813ecd36827a611037d8435c202609a111c46d283b049b59ac7f2d6788)
[![Coverage Status](https://coveralls.io/repos/pow-co/askbitcoin/badge.svg?branch=master)](https://coveralls.io/r/pow-co/askbitcoin?branch=master)


# Ask Bitcoin

## Installation

To download and install dependencies run `npm install` 

## Running

To run the API server run `npm start`

## Testing

To run tests run `npm run test`

## Development

To commit new code run `npm run commit`

## Configuration

Rabbi may be configured in several ways depending on the needs of your environment.

1) Environment Variables

2) Configuration Files

3) Command Line Arguments

The same variables are used in all three options, however in configuration files and command line arguments all variables are strictly lower case, whereas in environment variables they may be upper case or lower case.

### Environment Variables

| Variable             | Description                                                                             | Default | Required |
|----------------------|-----------------------------------------------------------------------------------------|---------|----------|
| HTTP_API_ENABLED     | Serve JSON API.                             | true    | false    |
| AMQP_ENABLED         | Communicate between components via RabbitMQ. Require by some features under src/actors/ | true    | false    |
| POSTGRES_ENABLED     | Will automatically begin logging events to postgres | true    | true     |
| DATABASE_URL         | Postgres connection Url in the form `postgres://user:password@host:port/database        |         | true     |
| HTTP_API_HOST        | IP address to bind when serving. Set to 127.0.0.1 or localhost for local-only access    | 0.0.0.0 | false    |
| HTTP_API_PORT        | Port to bind when accepting new API client connections.                                 | 5200    | false    |
| PROMETHEUS_ENABLED   | Expose /metrics endpoint to allow prometheus to scrape default and your custom metrics. | true    | false    |
| LOKI_ENABLED         | Stream logs from the application to a loki log aggregation server.                      | false   | false    |


### Configuration Files

The app loads files from a hierarchy each overriding the previous. First the system level config files are loaded, then user level config file, finally the local config file for development purposes

1) /etc/rabbi/rabbi.json

2) ~/.rabbi/rabbi.json

3) .config/rabbi.json

Config files are JSON objects containing key value pairs where the key is the config variable and the value is the value of the variable. Numbers and booleans will be parsed and made available. Variable names can be either upper or lower case.

```
{
	"database_url": "postgres://postgres:12321423fekrefk@mydb.example.com:5432/boostpow",
	"http_api_port": 3000,
	"loki_enabled": true,
	"loki_url": "https://loki.example.com",
	"prometheus_enabled": false
}
```

## System Events

When using AMQP you may bind the following events as routingkeys to receive delivery of these messages to your application. You may also choose to receive these events via Webhook by configuring the `WEBHOOK_URL` and `WEBHOOKS_ENABLED` variables.

| Event                | Description                                                                             |
|----------------------|-----------------------------------------------------------------------------------------|
| prometheus.metrics.scraped   | Every time prometheus scrapes   |
| http.request  | When a client makes a request to the HTTP API |

Additional events can be published and listened to using rabbi

```
import { events } from 'rabbi'

events.publish('game.ended', { winner: 'nobody' })

```
Then in another component or process, or app connected to the same AMQP:

```
import { events } from 'rabbi'

events.on('game.ended', (message: Buffer, json?: any) => {

  console.log('---- GAME OVER ----')

  if (json && json.winner === 'nobody') {

    console.log('nobody wins')

  }

})

```

# AskBitcoin.com Pitch Deck

## Intro

AskBitcoin.com is an open source, community-driven application for learning and solving problems as a hive-mind.

The site lists many interesting questions and answers posted by users.

The best content gravitates toward the top as users add boost.

## Boost

What is "boost"?

(n) a concept for bringing attention to content by attaching proof-of-work
(v) adding proof-of-work to content

Example 1: "I will consider that idea once it has some boost behind it."
Example 2: "Great idea! I'm going to boost that!"

Boost is also known as "BoostPOW" (Boost Proof of Work).

## Rank

The website AskBitcoin.com ranks Questions and Answers based on how much each one is boosted.

When a question or answer gets boosted, it moves up the ranks. 

This helps focus users' attention on the content with the most proof-of-work attached.

## Uses

There are three ways to use AskBitcoin.com:

1. Reading the site for interesting information
2. Posting your own Question or Answers
3. Boosting Content

## Boosting

Boosting involves clicking a button next to a question or answer and paying a very small fee (close to $0.00).

In exchange, a little bit of difficulty gets added to that content.

## Difficulty

What is "difficulty"?

(n) a unit of measurement for proof-of-work

1 difficulty is equal to the amount of hash power required to mine the genesis block. 

## Time

AskBitcoin.com displays the top Questions and Answers of the last 24 hours by default.

Expand the time window of a search using the Tuning Panel on the side of the page.

## SuperBoost

Users can opt to buy more proof-of-work than the default amount to bring more attention to that content. 

Use the boost modal to add as much difficulty as desired.

## Price

Prices are set by the user. 

Users move the slider in the boost modal left or right to select how many satoshis to pay.

Left toward the turtle icon means fewer satoshis and slower delivery.*
Right toward the rabbit icon means more satoshis and faster delivery.*

*See Profitibility

## Who gets the satoshis?

Anyone running the boost miner software can earn the satoshis.

## How does it work?

Buying boost places an order for proof-of-work.

Satoshis get locked up in a script that says:
"Add X difficulty, get Y satoshis."

## Then what?

That order gets broadcast to the network via the BoostPOW API. 

Those running the open-source BoostPOW Miner software will get notified of your order. 

## Profitability

Miners determine whether your offer of satoshis for work is worth their effort expending energy.

Then they will either get to work adding difficulty to your content, or they will pass.

*This is why the price paid impacts the speed of delivery. Adding more satoshis per difficulty means higher profitability and therefore greater competition to mine your boost job.*

## Distributed

The order sits in waiting and remains valid until it is fulfilled.

In this way, a distributed network of miners running open-source software performs the work necessary to perpetuate the BoostPOW system.

A miner is free to mine any job no matter the profitability as long as there is at least one satoshi locked in the script.

## Why use this?

The BoostPOW system helps reduce the problems associated with information overload.

There is too much information and too little time to evaluate it all.

Ranking data by proof-of-work can dramatically reduce the volume of information to be considered down to a more manageable level.

And it does this in a way that is open, transparent, and resistant to manipulation.

## Tags

Every boost carries with it an opportunity to attach a bit of metadata called a "tag".

Users add a tag to any boost by typing a word or phrase into the boost modal.

Users can then rank content by tag to further narrow their search results.


## Micropayments vs Boost

Payments make unreliable signals because they are easy to manipulate.

Boost signals are resistant to manipulation because they require energy to be wasted.