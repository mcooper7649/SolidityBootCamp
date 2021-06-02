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