# Authentication

## Installation

To install the necessary dependencies, run the following command:

```bash
npm install
```

## Configuration

Before running the server, make sure to configure the following environment variables in a `.env` file:

```bash
PORT=         # Port for the server to listen on
DB_NAME=      # Database name
DB_USER=      # Database username
DB_PASSWORD=  # Database password
DB_HOST=      # Database host
DB_PORT=      # Database port
DB_DIALECT=   # Database dialect (e.g., 'mysql', 'postgres', 'sqlite')
SECRET_KEY=   # confidential key
```

## Running the Server

To start the server, use the following command:

```bash
npm run start
```

## Running in Development Mode

For development purposes, you can run the server with auto-reloading using:

```bash
npm run dev
```