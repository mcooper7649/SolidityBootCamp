## Getting Started with Create React APP
---

1. Once we have our lottery-react folder
    - npm run start from terminal
    - http://localhost:3000/ to confirm React was successfully Installed

2.  Next make sure you install web3
    ``npm i web3@1.3.5``



## What is web3?
--

- When we interact with our app so far we have been using web3 from MetaMask
    - This is v0.3.0


- When we build a webapp we want to use web3 but a newer version
    - This is v1.0 or higher

- We must remember that inside each web3 instance we have our provider configured for our network
- We want to develop our app to use web3v1.0 but we want to take the provider information from the injected copy of web3 metamask
- For this application we are ASSUMING the user has MetaMask installed, for future projects we will built it out completely


## Setup Web3
--

1. We need to first convert our APP function into a class
    - then we can concole.log(web3.version)
    - next lets console.log(web3.getAccounts())
    - We should see our MetaMask Accounts in the Console, if you are logged in


## Deploying the Lottery Contract
--

1. Lets remove any console logs from our previous module first.

2. Next were going to take our Lottery Contract and Get it to interact with our React App.

3. This is our Most IMPORTANT Section

4. If you recall, our Lottery Project had two additional scripts setup inside them
    - Compile.sol
        - This took our Solidity Source Code and Compiled it and Generated 
            - ABI
                - Interface Layer/CommunicationLayer from the blockchain world to the JavaScript World
            - Contract ByteCode
                - Used to Deploy the Contract to the Actual Network
    - Deploy.sol

5. Were going to take our ABI and feed it into our web3 instance
    - This is going to create a local copy of hte contract
    - its going to tell our web3 instance, 'hey, heres a contract, and heres how it behaves'
    - Here's what they require as inputs and outputs
    - Were then going to Deploy our Contract (Rinkeby For example) and we will tell web3 where that contract is deployed at
        - This is always a unique address
    - Once our contract is on the network is when we can call our methods and functions

6. First Things First
    - We need to get access to our contract interface
    - Deploy our contract and acquire our address 
        - Make sure to console loke the 'result.options.address' to find that contract address
        - We can add a console.log(interface); to get our inferface too

7. To deploy our contract we just run
    ``node deploy.js`` from our console