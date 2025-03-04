# Code4Change

This project consists of a client-side Next.js application and a server-side Express application with PostgreSQL database.

## Quick Start

1. Clone this repository:

```bash
git clone https://github.com/nxvafps/code4change.git
cd code4change
```

2. Install all dependencies (client and server):

```bash
npm run install:all
```

Or install separately:

```bash
npm run install:client  # Install client dependencies only
npm run install:server  # Install server dependencies only
```

## Client Setup (Next.js)

The client is built with [Next.js](https://nextjs.org) and bootstrapped using [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Running the Client

1. Navigate to the client directory:

```bash
cd client
```

2. Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

You can edit the page by modifying `client/app/page.tsx`. The page auto-updates as you edit the file.

## Server Setup (Express + PostgreSQL)

### Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running

### Database Setup

1. Create the necessary databases using the setup script:

```bash
cd server
npm run setup-db
```

This will create three databases:

- code4change_dev (Development)
- code4change_test (Testing)
- code4change_prod (Production)

### Environment Configuration

Create three environment files in the `server/` directory:

1. `.env.development`:

```
PGDATABASE=code4change_dev
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:3001/api/auth/github/callback
SESSION_SECRET=your_session_secret
```

2. `.env.test`:

```
PGDATABASE=code4change_test
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:3001/api/auth/github/callback
SESSION_SECRET=your_session_secret
```

3. `.env.production`:

```
PGDATABASE=code4change_prod
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:3001/api/auth/github/callback
SESSION_SECRET=your_session_secret
```

### GitHub OAuth Setup

To enable GitHub authentication:

1. Go to your [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set the Homepage URL to `http://localhost:3000`
4. Set the Authorization callback URL to `http://localhost:3001/api/auth/github/callback`
5. Create the app and get your Client ID and Client Secret
6. Add these credentials to your environment files as shown above

The `SESSION_SECRET` should be a long, random string to secure user sessions. You can generate one with:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Running the Server

1. Seed the database:

```bash
cd server
npm run seed
```

2. Start the development server:

```bash
npm run dev
```

## Additional Resources

### Next.js Documentation

- [Next.js Documentation](https://nextjs.org/docs) - features and API
- [Learn Next.js](https://nextjs.org/learn) - interactive tutorial

## Contributing

NA

## License

NA
