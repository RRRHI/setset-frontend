This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

After cloning the repo to your laptop, first install all dependencies with:

```bash
yarn

```

Then, run the development server:

```bash
yarn dev

```

### Add packages with yarn

```bash
yarn add -dev package-name

```

### Linting with yarn

```bash
yarn lint

# to fix linting errors
yarn lint --fix
```

Add the following extensions to your VSCODE:

- ESLint
- Prettier ESLint
- Prettier - Code Formatter
- Prettier ESLint TypeScript

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Design

Figma design file: https://www.figma.com/design/E49sbmjKeaSlCIJz4j4V1i/Set-set?node-id=68-219&p=f&t=j6l0WDmOxvy485o3-0

## Icons

Using react-icons package. Primarily use **Font Awesome 6** icons.

## For contributors

Before creating a PR make sure to do the following so it passes the CI workflow:

```bash
yarn lint

# to fix linting errors
yarn lint --fix

yarn build
```
