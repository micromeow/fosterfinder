# Foster Finder

Foster Finder is an innovative app connecting shelters and fosterers, facilitating the seamless listing and notification of critical care foster kittens in need.

## Requirements

- Node.js
- npm
- Docker

## Getting Started

1. Run the following command to install dependencies:

```bash
npm install
```

2. Run the following command to start the database:

```bash
npm run db:start
```

3. Run the following command to run database migrations and seed data:

```bash
npm run db:reset
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tests

To run tests, run the following command:

```bash
npm run test
```

Tests also run automatically pre-commit.

### UI Tests

We use snapshot testing for our UI components. These tests will fail if the UI changes.
To update snapshots, double check that the UI changes are intended and then
run the following command:

```bash
npm run test:update
```

## Developer Tools

See [docs/devtools.md](./docs/devtools.md)

## Architectural Decision Records

See [docs/adr/README.md](./docs/adr/README.md)
