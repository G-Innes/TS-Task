# Gilded Rose

This is the Gilded Rose kata in TypeScript.

## **Information on the completion of the TS Technical Task**

1. Refactoring applied to gilded-rose.ts, made more readable and maintainable. Also added error handling and comments.
2. Added Tests to validate the functionality of the project & to ensure the refactoring was successful.
3. Created Gilded Rose shop instance- update-shop.ts with node.js script to update the inventory of the shop & make requests to the API.
4. Added Test file for the basic functionality of update-shop.ts

## **How to run the project**
1. Clone this repo
2. cd to the Typescript folder
3. Run `npm install`
4. Run `npm run test:jest test/jest/gilded-rose.spec.ts test/jest/update-shop.spec.ts` to run the tests for both update-shop.ts and gilded-rose.ts
5. Run `ts-node app/update-shop.ts 10 5` to run the script to update the inventory of the shop.
6. the number of positive responses will be logged to a log.txt file in the root of the TYPESCRIPT folder. The positive responses are also logged to the console.


## Getting started

Install dependencies

```sh
npm install
```

## Run the unit tests from the Command-Line

There are two unit test frameworks to choose from, Jest and Mocha.

```sh
npm run test:jest
```

To run all tests in watch mode

```sh
npm run test:jest:watch
```

Mocha

```sh
npm run test:mocha
```


## Run the TextTest fixture from the Command-Line

_You may need to install `ts-node`_

```sh
npx ts-node test/golden-master-text-test.ts
```

Or with number of days as args:
```sh
npx ts-node test/golden-master-text-test.ts 10
```

You should make sure the command shown above works when you execute it in a terminal before trying to use TextTest (see below).


## Run the TextTest approval test that comes with this project

There are instructions in the [TextTest Readme](../texttests/README.md) for setting up TextTest. You will need to specify the Python executable and interpreter in [config.gr](../texttests/config.gr). Uncomment these lines:

    executable:${TEXTTEST_HOME}/python/texttest_fixture.py
    interpreter:python


