## Creating a Boilerplate for Contracts
---

1. We are going to create a custom project instead of the default stuff with Remix
    - Issues
        - Need to be able to write Solidty code in a JavaScript project
        - Need some way to rapidly test contracts without doing the manual testing we were going with Remix
        - Need some way to deploy our contract to public networks
    - Solution
        - Setup Solidity compiler to build our contracts
        - Setup a custom Mocha test runner that can somehow test solidty code
        - Setup a Deploy Script to compile + deploy our contract


 ## Prepare our inbox Directory
 ---

 1. npm init the inbox directory

 2. Next we create two folders, contracts and test
    - contracts
        - Inbox.sol    // The Our contract file
    - test
        - Inbox.test.js // Our test JS file
    - package.json  // Standarn NPM package that store dependencies
    - compile.js // contract compiler script
    - deploy.js // deploy compiled code script

3. Using the Course Materials Link, download the boilerplate (has dependencies) and copy the Inbox.sol contract code to the boilerplate Inbox.sol

## Configure Compiler
-- 

4. Next we are going to install a  solidity compiler
    - Solidtiy compiler can be installed as an npm package
        - npm i to install dependencies
        - npm install --save solc   
        
5. Next we need to make use to two built in stardard library modules.
    - Standard modules means we don't need to npm i
    - const path = require('path');
        - Helps us build a path from compile.js to inbox.sol
        - this makes a path readable from either windows or unix based systems
    - const fs = require('fs')
    - Lets generate a path next
        - const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol'); 
            - This makes use of our current location, and connects to contracts directory   and inbox.sol
    - Next we need to tap into our source contract file
        - const source = fs.readFileSync(inboxPath, 'utf8')
            - this uses the fs.ReadFileSync Method, pass-in source inboxPath, and utf8 is the encoding

6. Now were ready to make use of the Solidity compiler we installed earlier
    - const solc = require('solc');
        - this imports our module for use
    - solc.compile(source, 1)
        - This code we pass the source and how many contracts we are attempting to compile
    - wrap sol.compile in a consolelog to see what its doing.

7. Now were ready to run the compiler from terminal
    - node compile.js
        - in console we should see a contracts object
            - in that object we will see all the different contracts just compiled, this time we compiled 1, Inbox.

    - There are two properties of data we actually care about in this object
        - Bytecode
            - This is the actual code that makes up the contracts
        - Interface
            - This is the ABI and this is the interface between the solidity world and javascript world
            - The ABI basically lists all the functions that can be called on the contract
            - It will specify 
                - how many arguments
                - what type of arguments
                - return values
                - type of return values

8. Now we need to add an export module to our compiled source file
    - ``module.exports = solc.compile(source, 1);``

9. We want to drill down deeper and only  access our Inbox Contract 
    - add .contracts[':Inbox']  // notice the quatations for string and the semi colon :
    - ``module.exports = solc.compile(source, 1).contracts[':Inbox'];``


## Testing our Contract
---

1. Once we have our contract compiled, we have a bytecode
2. We can deploy to a local test instance 
    - Using GanacheCLI is TestRPC, the old name is TestRPC.
3. We can also take our ABI and feed it into Web3 library
    - Web3 is a programmatic library to get access to the contract
    - Web3 will then be forwarded to our Ganache Contract Instance

4. If you not using the boilerplate you will need to install web3 using npm
    - ``npm install --save web3@1.3.5`

5.  If you not using the boilerplate you will need to install mocha using npm
    - ``npm install --save mocha``

6.   If you not using the boilerplate you will need to install mocha using npm
    - ``npm install --save ganache-cli``

7. Lets open our Inbox.test.js file in the test folder
     ```
     const assert = require('assert');
     const ganache = require('ganache-cli');
     const Web3 = require('web3')  //Notice Web3 is capitalized as its a constructor
     ```
    
8. Web3 versioning
    - v0.xx
        - Primitive interface
            - only callbacks for async code
    - v1.xx
        - Support for promises and async/await


## Web3 In-Depth
---

- Web3 as a constructor that creates an instance of a web3 library that can be used in our contract
    - whenever we create an instance we have to configure the instance
    - one thing in particular that needs to be setup in a provider

 - Provider is communication layer between the web3 library and some ethereum network
 - You always need to specify a provider as it needs to know what network to communicate on.
 - Providers can be changed out depending on what network and features you need to connect with
 - Use ganache.provider() when declaring your new Web3 constructer instance
    - provider() will change depending on what network we are connecting to.

```
const assert = require('assert'); // assign a variable to assert
const ganache = require('ganache-cli'); //assign a variable ganache
const Web3 = require('web3')  //Notice Web3 is capitalized as its a constructor


const web3 = new Web3(ganache.provider());
```

## Mocha
---

1. What is Mocha?
    - Mocha is a TEST running framwork

2. Mocha Functions
    - it
        - Purpose: Run a test and make an  assertion.
            - take two values, one value that our code has produced and another value that should be equal to that variable. Then Compare the two.
    - describe
        - Purpose: Groups together 'it' functions.
        - describe is organization in nature
            it allows us to group together functions that test the same thing, for example
        - Organizes our output of out tests too.
    - beforeEach
        - Execute some general setup code
        - utility function that is used to extract some amount of logic that is common to our tests

3. Back to testing
    - lets add a class car
        - add two default methods
            - park() return stopped
            - drive() return vroom
    - next add a describe function below our class.
        - our first argument will be string, a name to descibe our test, no relation to the class Car. 
        - our second argument will be another function, an arrow function that will contain all the it statements.
            - pass it two arguments, a string for organization 'park' works.
            - make it so you know when you read the test out put you know what was tested.
            - just like describe the it second argument is an arrow function
                - inside that arrow function is where you put your setup/test/assertion logic
                    ```
                    assert.strictEqual(car.park(), 'stopped')
                    assert.strictEqual(car.drive(), 'vroom')
                    ```
4. Now that we have 1 test setup and ready to run lets save the file and run mocha
    - To run mocha we need to add a script to our package.json file
    - inside the scripts propterty, add "test": "mocha" if it isn't there already.
    - ``npm run test`` from terminal to run mocha
         - you should see mocha appear to show you its running in terminal and a green check mark if your test passed

5. Lets create a second it function to test th drive function.
    - remember, inside describe is where we want to place it.
    - inside the it create a new car instance using the constructor
        - add an assert.strictEqual to the cars.drive() method, then check for a 'vroom' response

6. This second test looks good but you can see we create a instance of car in each test and that is redundant.
    - beforeEach can help us with this
        - beforeEach(() => {

        })
    - beforeEach can declare a line of code before each test saving us redundant code
    - Once we add the beforeEach with the ``const car = new Car();`` we can remove it from each it statement
    - Great now we got the car instance variable out of the it statements but the assert wont recognize it anymore due it being a black level scope.
        - we must drop the const  and add ``let car;`` outide of the before each to initialize it.

6. type ``npm run test`` into terminal
    - Success two tests are now complete.
        - We don't actually need these test for the next module. So now we can delete it out. 
            * Copied into inbox_old for reference later

    
## Mocha Structure
---

1. The Structure of Mocha is as follows
    - Mocha Starts
    - Deploy a new contract (local instance on Ganache)
    - Mianipulate the contract
    - Make an Assertion about the contract
    - Loop back to Deploy a contract

2. As you can see we can use a beforeEach for the Deploy a new contract

3. Then we can manipulate the contract and make our assertions using it statements

4. As soon as Ganache starts, a set of accounts are automatically generated.
    - They are in an unlocked state
        - meaning we don't need to do anything with the public/private keys

## Fetching Accounts from Ganache
---

1. In order to run our tests we are going to start with utilizing the web3 library and submitting and interacting with  our contracts on the Ganache Local Test Network by using the built in accounts. 

2. How do we use web3 to access these accounts?
    - We need to add our beforeEach
        - Get a list of all acounts ``web3.eth.getAccount()``
            - this eth module is one of many web3 built in modules that can tap into the networks functionality
            - EVERY function in the eth network is async-ronous in nature, and that means its goin to retrun a promise
        - Next lets chain on a .then arrow function with our list of accounts
        - takes create take our fetchedAccounts and log them
             
                ```
                beforeEach(()=> {
                // Get a list of all accounts
                web3.eth.getAccount()
                .then(fetchedAccounts => {
                    console.log(fetchedAccounts)
                })
                ```
3. Lets add a describe stateement about our Inbox contract
    - pass two arguments into descrbibe
        - the name (for reference) of the file/function/contract being tested
        - anonymous function with an it statement
            - the it statement needs two arguments
                - the decription (for reference) of what it does
                - we can leave the logic empty for now

4. Refactoring to Async/Await
    - We can get rid of the promise .then and use the more modern async to clean up our code
    - lets add the await before web3
    - assign accounts as the variable to the await
    - add async just after the beforeEach
    - we also need to put, let accounts; outside of the before each so that variable can be utilized by the it funtion of our test
    - console.log accounts in the it function.
    ```
    beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts()
    });
    ```


## Writing the contract
---

5. Next we want to import the two pieces of data that our compiler generated
    - Interface
        - The ABI
    - Bytecode
        - The Data

- How to Import
    - const { interface, bytecode} = require ('../compile');


6. Inside our beforeEach after accounts
    ``new web3.eth.Contract(JSON.parse(interface))``
        - new web3 eth module
        - Contract is a constructor method so capitalized
        - JSON.parse(interface) interface is the ABI code we get from the compiler
        - Chain a deploy method and pass an object with data:bytceode,
        - We also have an initial message argument that needs to be passed as our contract specifies
            - This is the argument that is executed upon creation
            - we need to create a arguments key inside our object
            - and value will be an array with all the arguments that need to be pass upon execution.
        - Lets chain a send method next
            - The send is telling who is creating the contract
                - The send requires a from and gas property
            - Next, we need to specify the MAX amount of gas we want to use, for our test, lets use 1 million gas
        - Lets assign inbox variable to our deployment code and don't forget to 'let' it outside so our IT function can test it.
        - Also, because it is a contract deployment and will taek time we need to add the await flag before new to make it asyncronous

## Web3 with Contracts
---

- Goal
    - Interact with deployed contract
        - ABI is needed 
        - Bytecode is not needed
        - Address of deployed contract needed
    - Create a contract
        - ABI is needed
        - Bytcode is needed
        - Address of deployed contract not needed, because its not created!


## Testing our contract logic
---


``assert.ok(inbox.options.address)``

1. We can use another type of assert to test, assert.ok().
    - we can tap into our inbox object that is created when we creeate the contract
    - tap into options.address and it should hold the address of the newly created contract.
    - the ok method checks to see if a value exists
        - if null or undefined it will fail
        - if truthy, it will pass

2. Lets add a second test, for checking if a default message has been generated.
    - lets create another it function
        - This needs to be aync due to it awaiting a response
            - add before the anonymous fucntion argument
        - create a message const
            - add await as its asyncronous
            - inbox (contract code)
            - methods (default name that lets us tap into the contracts methods)
            - message()call()  // this executes our message
                - dont forget the (), this is because sometimes we need to pass arguments into methods
        - Now that we have called our message, we can assert the value
            - assert.strictEqual(message, 'Hi there!')

```
it("has a default message", async () => {
      const message = await inbox.methods.message().call();
      assert.strictEqual(message, 'Hi there!')
    });
```