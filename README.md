# Albion Tools

## Installation

```bash
# adjust Node version with nvm
nvm use

# install dependencies
npm install
```

## Developing

Start a development server with:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Create a production version with:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Before Commit

Encourage to run format before committing with:

```bash
npm run format
```

Then, you can run commit your code with:

```bash
git commit
```

This wil run check lint and test then display prompt to commit based on [Conventional Commit](https://www.npmjs.com/package/commitizen).
