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
    
8. This will compile our script and attempt to deploy to the Rinkeby Network

## Adding our Information to our Lotto_React Project
--

1. From our previous module we should have to addresses available
    - Deploy from account
        - 0x52e484E2C2Ca5d9b5C344ECF66f0E1B4F3113960
    - Contract Deployed to Address
        - 0xCbAEAA49f50523a489DE90f32821a74c60A00a49

2. We now want to COPY and PASTE our ABI and Address and add them to our Lotto_React FrontEnd

3. Lets import web3 as well
```
import web3 from './web3';

const address = '0xCbAEAA49f50523a489DE90f32821a74c60A00a49'
const abi = [{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pickWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"enter","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
```


## Local Contract Instances
--

We are going to create a local COPY of our Deployed Lottery Instance from Rinkeby in the next module.

1. We need to add the following line of code to export our Contract for local instances.

```
export default new web3.eth.Contract(abi, address)
```

2. Now that we have our web3 eth Contract, we can call upon the same methods and functions that we did in the our Test suite
