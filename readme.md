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

2. When you Define you contract and are ready to deploy you must first run in through a Compiler
    - The Compiler spits out two bits of information
        - Byte code ready for deployment
        - Application Binary Interface (ABI)
            - This is key for writing applications that interact with your smart contracts, similiar to an API
        
3. Our JavasScipt Frontend will tap into our ABI which will then interface with the bytecode of the Smart Contract


## Before we Code our First Remix Contract
---

- Preparation
    - Delete code within Ballot.sol
    - Change Compiler Version to  0.4.17+commit.bdeb9e52
    - Turn on Auto Compile

## Our First Contract
--
```
pragma solidity ^0.4.17;

contract Inbox {  
    string public message;
    
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }
    
    function setMesage(string newMessage) public {
        message = newMessage;
    }
    
    function getMesssage() public view returns (string){
        return message;
    }
}
```


- Whats Remix?  (Remix)[remix.ethereum.org]
    - Lets use the Web Based IDE for Solidity for this module
    - Has Built in Tools and Plug-ins
    - Great for Beginners

## Code Breakdown
---

- Using the Default file Ballot.sol
    - Declare Pragma
        - Used 0.4.17 as per tutorial
        - Solidity our code is written with
    - Define our first contract
        - contract Inbox 
            - Defines a new contract that will have some methods and variables
    - Inside the contract we declare the variable message
        - string
            - declares that message will only be a string datatype
        - public
            - storage variable
            - accessble by anyone and persists on the blockchain
            - not a local variable, that is thrown away when done with
        - message
            - name of variable 
    - Declare 3 functions, Inbox, setMessage, getMessage
        - Inbox
            - Constructor function as it is has the same name as the contract
                - Constructor functions are executed upon contract creation
            - pass string initialMessage 
            - declare public
            - message = initialMessage
        - setMessage
            - pass string newMessage
            - declare public
            - message = newMessage
        - getMessage
            - declare Function name (getMessage)
            - declare Function type (public view)
                - Common Function Types Inlude
                     - Can Only use one per function   
                        - public - anyone can call this function
                        - private - Only this contract can call this fucntion
                     - These two mean the same thing
                        - view - This function returns data and does not modify the contract's data
                            - This means since we are just returning message we aren't modifying anyting on the contract
                        - constant - This function returns data and does not modify the contract's data
                    - pure - Function will not modify or even read the contract's data
                    - payable - When someone calls this function they might send ether along

            - declare Return Types (returns (string))
        
## Deploying with Remix
---

1. Before we deploy we need to go over our configuration
    - Environment  
        - Injected Web3
            - interacts with MetaMask and Main/Test Nets
        - JavaScript VM
            - Local Virtual Machine for Local Testing
        - Web3 Provider
            - 

    - Account
        - This selects what account you want to test with
            - If on Injected Web3, it will prompt your metamask or native client
            - If on JavaScript VM, it will generate some generic fake ethereum account with 100 fake eth to use for testing locally.
            - if on Web3 provider, 
    
    - Gas Limit
        - Maximum amount of Gas we want to use to buiuld the contract
    
    - Value
        - An amount of eth you want to transfer to the contract account upon creation

    - Contract
        - In the dropdown, select the .sol file with the name of the contract you want to deploy
            - in our example, we used ballot.sol, contract.sol is the most common name
    
    - Contructor Function(s)
        - If you look directly under the deploy button, you will see "INITIALMESSAGE: string"
            - This is from our first function, the constructor function Inbox
            - We must remember these are automatically called when we first deploy the contract aka create an instance
            - Lets enter "Hi There!" into our INITIALMESSAGE field and hit transact or create for older versions of remix
                - We should see a transaction hash in remix console
    - Deployed Contracts
        - We can now see a new property down on the bottom of deploy panel called "Deployed Contracts"
            - It will show our contructor function and other deployed contracts in memory
                - You will notice we have an instance of our functions available now
            - With our deployed contract we can utilize and run the setMessage, getMessage and message functions locally
                - if we run our getMessager you will see a return format:
                    - 0: string: Hi There!
                        - 0 represents the line number of the return messages, in our case it is only 0.
                        - string represents the datatype
                        - Hi There is the message
                - if we run our setMessage to bye there
                    - Then run our getMessage again, you can see the format is the same as before but with a new message
    - First GOTCHA
        - You will notice there is a "Message" button but we don't have a message function
            - Whenever in solidity we declare a public variable, in our case "message"
            - It will create a function automatically that returns the value of that variable
                - it will have the exact same name as the public variable
        - As you can see this function is autogenerated
            - This function does the same as our getMessage function
            - Since data in contract = $$$ we shouldn't have redundant code
            - We can get rid of the getMessage function

## Redeploying with remix
---

    - Lets remove getMessage
        - You will notice our old instance of Inbox is still available in the panel
        - We will need to re-deploy to get a new instance with the removed function
            - First lets remove our old instance, click the X to delete it.
        - Before we deploy, lets place a new INITIALMESSAGE
        - After we Hit Deploy again, you will see a new instance of our Inbox contract
            - You will notice it doesn't have getMessage anymore