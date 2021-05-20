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