# GigFlow Pro Onboarding API

A RESTful Service Provider Management API built with Node.js, Express, and MongoDB.

## Project Overview

GigFlow is a platform connecting independent contractors with local clients. This API handles service provider profiles, skill categorization, and a verification workflow.

## Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file using `.env.example` as a guide:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

4. Run the server:

```bash
node index.js
```

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/providers` | Create a new provider profile |
| GET | `/providers` | Get all providers |
| GET | `/providers?skill=Plumbing` | Filter providers by skill |
| GET | `/providers/:id` | Get a single provider by ID |
| PATCH | `/providers/:id` | Update provider details |
| PATCH | `/providers/:id/verify` | Verify a provider |
| DELETE | `/providers/:id` | Delete a provider |

## Tech Stack

- Node.js
- Express
- MongoDB & Mongoose
- dotenv
