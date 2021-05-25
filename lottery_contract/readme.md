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
```
contract Lottery {
    address public manager;  
    function Lottery() public {
        manager = msg.sender;
        
    }   
}
```

5. Reference Types in Solidity
    - Fixed Array
        - Array that contains a single type of element. Has an unchanging length
        - example int[3] would have a fixed array [1,2,3] or bool[2] would like this [true, false]
    - Dynamic Array
        - Array that contains a single of element. Has Can change in size over time
        - example int[] [1,2,3] or bool[]   [true, false]
    - mapping
        - Collection of key value pairs. Think of Javascript objects, Ruby hashes, or Pythong dictionary. All keys must be of the same type, and all values msut be of the same types
        - example:  mapping(string => string)   or mapping (string => bool)
        - Used for storing a collecting of things, example a collection of Cars, Houses, or Couches
    - struct
        - Collection of key value pairs that can ahve different types
        - example: struct Car{ string make; string model; uint value;}
        - usually used for a singular thing, example: Car, House, Couch

    - Reference Type GOTCHA
        - Between Fixed Arrays and Dynamic Arrays
            - When you have an Array instide another array (Nested Arrays)
                - This is a 2-Dimensional Array or a Nested Dynamic Array
        - Part1 of the Gotcha
            - In the Solidity World there is no Issues with Making a Nested Dynamic Array
            - In the ABI/JS/Web3 World Nested Dynamic Arrays Won't Work
                - The Communication layer just can't handle nested arrays
        - Part2 of the Gotcha
            - Strings in Solidty are stored as Dynamic Arrays
                - It means we have no way of transfering arrays of strings into JavaScript
                
    ## Entering the Lottery
    ---

    1. Initialize our players variable
        - This will be an ARRAY of address
            - First we put the type that will be stored in our array
                - address[] in this case
                - This creates a dynamic array that can ONLY store addresses
                - If we put a number then it would have been a fixed array.
            - We will put public because we are ok with having people see who entered our lottery
            - Lastly we choose a name for our array, players in this case
            ``address[] public players;``

    2. Create our enter function
        - Remember if someone calls this they want to enter into the lottery
            - So we want to take that persons address and add it to the players array
            - We also need to Send 1 ether into the prize pool when called
                - This means we need to add the function type payable
                    - payable // When someone calls this function they might send ether along
    
    3. Inside the enter block
        - Lets add a ``players.push(msg.sender);``
            - We can tap into the msg.sender(the address who ran the function) to push the address to our players array
            
    
    ## Validation with Require Statements
    ---
    
    1. Now we should have a functioning contract. We should be able to begin our validation in our Virtual environment.
        - Lets run deploy on our contract if we haven't already in Remix on the left hand panel
            - After Deployment we shoud see our contract available function
                - enter
                    - When you click enter, you can then call manager on 0 and it should return the wallet address that ran the enter
                - manager
                    - If you click the managers it returns the address of the account who generated the contract
                - players
                    - if you run this function u must remember its a public array and to read a public array in solidity we need to specify which specific position in the array
                    - after you ran enter with you default address, put 0 inside players and it should return the default address
                    - try again, this time entering with a second wallet address inside of remix and run put 1 as the value for players
    
    2. Ok that works great but now we aren't getting prompted to enter our eth.
        - require();
            - This is used for validation
            - We can pass a boolean expression 
                - If it returns false, the function isn't executed, its cancelled, and no changes are maded to the contract
                - If it returns true, the function continues
            - We should put this obviously before we push to the players array
            - We need add msg.value
                - msg.value // Amount of ether (in Wei) that was sent along with the function invocation
                  - now we want to charge .01 ether but this needs it in wei so lets go back to [https://etherconverter.online](https://etehrconverter.online) and put that in the ether field.
                  - WoW thats a huge number and REALLY hard to read, opens yourself for errors
                    - now in solidty we can add 'ether' and it will be translated succesfully.


    3. Cool, now our enter fucntion should take money when we try to enter, lets give it a shot.
        - Since we changed our contract lets re-deploy, FROM the primary dev wallet with .011 or more ether 
            - run players 0, address shows up
        - Lets now enter from another address with .001 ether, not enough
            - we get the VM error: revert
            - notice how their is NO information to indicate what the error was
                    

                

