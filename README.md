This is a simple blockchain explorer that uses the [Alchemy SDK](https://www.alchemy.com/sdk) to display basic information about the ethereum blockchain. It was build as an assignment submission for [Alchemy University Ethereum Developer Bootcamp](https://university.alchemy.com/course/ethereum/).

## Running the project

The project is build using nextjs, to run it, clone the project then run

```
npm install
```

Create a `.env` file in the root of the directory and copy the values from `.env.example`. Insert a valid `ALCHEMY_API_KEY` (or use `DEMO`)

```
ALCHEMY_API_KEY=DEMO;
```

Start the project by running

```
npm run dev
```

The project can now be viewed on `http://localhost:3000/`
