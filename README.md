
# Typescript API Server

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

