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

## Contract Creation Transaction Details Breakdown
---

1. Similiar to when we send a currency trasaction, we have properties that are sent for each external to external account trasaction
    1. Nonce
        - How many times the sender has sent a transaction
    2. to 
        - This is empty, as an emptry to, signals we are going to create a contract
    3. Value 
        - Amount of ether to send to the target address
    4. gasPrice
        - Amount of ether the sender is willing to pay per unit of gas to get this transaction processed4
    5. startGas/gasLimit
        - Units of gas that this transaction can consume
    6. V/R/S 
        - Cryptographic pieces of data taht can be used to generate the senders account address. Generated from the sender's private key.
        - 1 way cryptography, you need the private key to send the V/R/S but with V/R/S you cannot decrypto the private key

2. When we deploy, instances are also picked up by nodes on whichever network you decide to use


## More on running functions on the blockchain
---

1. Anytime we need to change ANYTHING on the blockchain, a transaction needs to be submitted
    - you will notice we have two types of functions in our inbox contract
        - getMessage, this only reads what is on the blockchain, and doesn't require a transactions
        - setMessage, this changes the blockchain and thus requires and transaction

2. There are 2 ways of Running Contract Functions
    - 'Calling' a Function 
        - Cannot modify the contracts data
        - Can return data
        - Runs Instantly
        - Free to do
    - Sending a Transaction to a Fuction
        - Can Modify a contracts data
        - Takes time to execute!
        - Returns the transactions hash and NOT the value of the return of a function 
        - Cost Money!

## Gas | Wei Vs Ether
---

[eth-converter](etherconverter.online) - This helps us view the different units of measure of ether

1. When we reference transaction fees on the network we are referencing money, but not like USD we are referencing the native currency of the Ethereum network

2. Before we get started, lets look at Remix again and you will notice on the deploy tab, next to the value field we have a dropdown that lets us select our Gas options. 
    - These are all units of measure, think of it like 1 dollar vs 100 cents, it wil be the same
        - Wei - Smallest unit of Ether, think a satoshi unit in bitcoin, nothing smaller
        - Gwei - larger
        - Finney - even larger
        - Ether - Main token, not the largest
        - Many more, view the eth-converter link to see all
3. Gas increases, depending on the code being executed
    - Anytime we send a transaction on the blockchain we have to specify two properties values
        - gasPrice - Amount of Wei the sender is willing to pay for unit of gas to get this transaction processed
            - if we specify for our trasaction we want to spend 10 wei per unit of gas it is then mutiplyed by the amount of gas units needed to process the request.
            - In our example we can see multiplycation function costs 5 gas to execute a multiply of two numbers
                - 5 gas times 10 wei per unit of gas 
                    - This would bring our total gass used to 50wei to multiply the two numbers
                    
        - startGas/gasLimit - Units of gas that this transaction can consume
            - This puts a hard cap on how much we'd like to spend for the transaction
                - For complex code, estimating total gas can be difficult due to DB sizes growing, or running loops etc. 
                - This gasLimit gives us the option to set a limit and prevent huge financial losses

4. What happens if we specify a gasLimit that is less than what we need to process?
    - The node processing the code will process one line at a time and consume gas
        - Once we get to 0 gas, the execution of the Function Immediately HALTS
        
5. Gas Limits Scope
    - We don't see any big twitter or facebook like platforms on blockchain yea due to gas fees.
    - Nobody wants to pay 1 dollar for example, to update their profile



## Mnemonic 12-Word Phrase
---

[MnemonicCodeConverter](https://iancoleman.io/bip39)

1. During Development Ethereum realized storing and keeping track of accounts with a public/private/address can get cumbersome very quickly. They created a 12 word Mnemonic Phrase alows us to generate an account with the 3 properties needed.

2. BIP39 is the mnemonic Algorithm used by Ethereum
    - This will generate MANY accounts, all bound and recoverable with that 12 word phrase

3. 12 words is alot easier to memorize than 3 long unique hashs

4. If you go to the Mnemonic Code Converter and input a twelve word seed, you can see all the accounts/walllets that are derived from that one seed.
    - You can create a new account and input the seed into the converter and verify they match.


## Get more Eth on Rinkby
---
 [rinkby-faucet](faucet.rinkeby.io)

1. In order to get alot more eth, we need another faucet

2. Share you wallet address on twitter and post the link to that post in the faucet


## Contract Deployment to a live network
---

- We must remember the flow in which we deploy is as follows
    - Contract Source
        - Solidity Compiler
            - ABI
            - Contract Bytecode
                - Rinkeby

- What is Truffle?
    - Truffle you will see referenced alot, it is a one stop shop for development of ethereum contracts
    - Truffle CLI is a command line tool
        - Handles Contract Creation
        - Local Testing
        - Deployment

- Issues with Truffle
    - Undergoing rapid development
    - Some things don't work well
    - Some things don't work at all
    - Stuff breaks - patience is required


* Check Inbox for next readme