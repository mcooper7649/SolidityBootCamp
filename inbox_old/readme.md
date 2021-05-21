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