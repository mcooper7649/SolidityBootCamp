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
     const assert = require('assert');
     const ganache = require('ganache-cli');
     const Web3 = require('web3')
    