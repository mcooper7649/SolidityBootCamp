## Complete Developers Guide to Solidity
---
[active repo](https://github.com/mcooper7649/SolidityBootCamp.git)




### Introduction
---

- Bitcoin was created in January 2009
    - It Changed the way money can be sent/received
    
- Ethereum was created in December 2013
    - VB created smart contracts
    - Ethereum network can transfer money and store data
    - Many Different Ethereum Networks
        - 1 Main Network
        - Many test Networks
        - Can Create private networks too
    - Networks are formed by 1 or more nodes
        - Any device can be a node
        - Nodes can contain a full copy of the blockchain

- There are two types of technology that are utilized in the blockchain space
    - For Developers
        - web3.js programatic access to the ethereum network
    - For Consumers
        - MetaMask popular wallet for desktop/chrome/mobile
        - Mist Browser

* Setup MetaMask Extension before we begin our next module. 

### MetaMask
---

1. Each MetaMask Account you create has 3 different keys generated
    - Account Address
    - Public Key
    - Private Key

2. This Account will interact with all the other ethereum networks.
    - Main
    - Test
        - Ropsten
        - Kovan
        - Rinkeby
    - Remember what network has each balance as they will be different

3. Rinkeby Faucet Demo
    - Make a request for ethereum with new MetaMask Address
        - [rinkeby-faucet](rinkeby-faucet.com)
    - Teacher built this faucet using web3 library



### Transaction Terminology
---

1. Nonce
    - How many times the sender has sent a transaction
2. to 
    - Address of the account the money is going to
3. Value 
    - Amount of ether to send to the target address
4. gasPrice
    - Amount of ether the sender is willing to pay per unit of gas to get this transaction processed4
5. startGas/gasLimit
    - Units of gas that this transaction can consume
6. V/R/S 
    - Cryptographic pieces of data taht can be used to generate the senders account address. Generated from the sender's private key.
    - 1 way cryptography, you need the private key to send the V/R/S but with V/R/S you cannot decrypto the private key


### Basic Blockchains
---

1. What is a sha256 hash?
    - A fingerprint of some digital data
    - The hash is always the same amount of characters
    
2. What is a block?
    - A block holds all the changes throughout the network
    - There are many blocks but they are mined 1 at a time
3. What is blockchain?
    - When you chain all the block together you keep an immutable record of events
    - You can't change any data on the blockchain in the past as it will have a mismatch of hash on previous and current blocks
4. What is Distributed Blockain?
    -  Allows many nodes on the network to further secure the network and data by verifying hash via majority
5. What are tokens?
    - Tokens allow us to create a token system and we can send them back and forth between accounts, currency is a popular example.
6. What are coinbase Transactions?
    - Coinbase is the orginal contract that minted the tokens.
        - You can start from the coinbase and analyze all the way to the end and the total should be exactly the same

### Hashing the Blockchain
---

1. How is the hash generated?
    - Data + Nonce = Output hash
    - Take output hash as a base10 number
    - Does this hash number meet requirements?
        - If so, thats the Block Time
    - Target block time = 15 seconds
        - This is slowed do to requirements of the blockchain and nodes turning off and on.
        - The difficulty fluctuates to try to meet the target Block Time



## Smart Contracts
---

1. What is a Smart Contract?
    - A contract that is executed by code

2. What is a Contract Account?
    - The Account that originally created the contract
    - They balance 
        - The amount of Ether they own
    - Storage
        - Data storage for the contract
    - Code
        - Raw machine code for the contract

3. Deployment of Smart Contracts
    - We code it on our local machine 
    - Then we deploy it to a network, test or main
    - Node picks up the contract and disperses throughout the network
    - Think of Smart Contracts as classes and you need to declare an instance to utilize the class

## What is Solidity
---

1. Solidity is the native language of Ethereum and the ERC-20 and other standards.
    - Written in .sol files
    - Strongly Typed
    - Similar to JavaScript
    - Has several huge, gigantic 'gotchas'