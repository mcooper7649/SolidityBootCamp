## The Lottery Contract
---

1. For out next Contract we want to create a lottery app.
    - We wil  create a price pool with a set limit of eth
    - We will allow participants to put eth into the prize pool until a specific amount has been reached.
    - A Manager will then tell the contract to pick a winner of the lottery
    - Logic will handle that from the contracts end
    - Contract will pay out the winner


## Lottery Design
---

There two major things to consider when creating our contract
- Variables
    - Name
        - manager // only the manager can tell the contract to pick a winner
        - players //  
    - Purpose
        - address of person who created the contract
        - Array of addressed of people who have entered
- Functions
    - Name
        - enter // a name that describes a player entering the lottery
        - pickWinner // a name that describes a manager picking a winner
    - Purpose
        - Enters a player into the lottery
        - Randomly picks a winner and send them the prize pool


## Basic Solidity Types
---

1. We need to set the datatypes of our variable first
    - for a wallet address, like manager, it would be 'address'

2. Other Basic Types include
    - string
    - bool
    - int 
        - integer, positive or negative. Has no decimal
        - you might run into int8, int16, int32. This is just referencing bits specify how many number are potentialy available in the range
        - int is an alias of int256
    - uint
        - Unsigned integer, positive number, Has no decimal
    - fixed/ufixed
        - 'Fixed' point number. Number with a decimal after it
    - address
        - has methods tied to it for sending money


## Starting the Lottery Contract
---

1. First, lets remove all the old contract code from ballot.sol except for the pragma line
    - Lets declare our new contract using teh contract keyword
        - Name it Lottery
2. Next we need to declare our variables for the contract
    - The order of declaring should be:
         - type 
         - visibility (Nothing as per security)
            - public //i want it to be easily accessed
            - private // I want it to be not as easily worked with
         - variable name 
3. Now if we add a Lottery Function withing the contract Lottery it will get executed upon creation so lets add it publicly

4. We need to figure out a way to update the manager address whenever we execute the Lottery Function
    - a Global Variable that can get us this information is 'msg'
        - msg.data 
            - 'Data' field from the call or transaction that invoked the current function
        - msg.gas
            - Amount of gas the current function invocation has available
        - msg.sender
            - Address of the accoutn that started the current funciton invocation
        - msg.value
            - Amount of ether (in wei) that was sent along with the function invocation

5. Reference Types in Solidity
    - Fixed Array
        - Array that contains a single type of element. Has an unchanging length
    - Dynamic Array
        - Array that contains a single of element. Has Can change in size over time
    - mapping
        - Collection of key value pairs. Think of Javascript objects, Ruby hashes, or Pythong dictionary. All keys must be of the same type, and all values msut be of the same types
    - struct
        - Collection of key value pairs that can ahve different types