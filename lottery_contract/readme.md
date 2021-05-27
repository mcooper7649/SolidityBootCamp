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

    4. If we want to see more information on the Transaction we can click the 'Debug' button in remix on the transaction
        - it will display 'status' of our trasaction at the top
            - we can see 'false transaction mined but execution failed'
        - below that we have the transaction has
            - we can input that into the debugger add on
        
    5. Lets install the DEBUGGER addon to remix and we can step through the transaction just by  inputting the trasaction hash we generated on the previous step.
        - Grab the Slider and put it at the far left to start our debugger from the beginning
        - click the down arrow to step into each step of the hash
        - The debugger is the GO TO solution for debugging solidity contracts as console logging just isn't as useful


    ## Pseudo-Numbers Generator
    ---

    1. Once we have enough players who have 'enter'ed into our contract the 'manager' will need to 'pickWiner'.
        - We need to create the pickWinner function
            - We need to do it Randomly, pick a player from the players array.
    
    2. We JS or RUBY its alot easier to randomize this selection
        - With solidity we don't have access to a random number generator
        - So we need to FAKE it, or PSEUDO-random

    3. One way that developers have been able to utilize a Pseudo RNG is by taking 3 numbers
        - Current block difficulty
        - Current Time
        - Address of Entrants
            - Next we run those through SHA3 Algorithy
                - This translates to a REALLY big number
        - WE MUST REMEMBER this is PSEUDO and not totally RANDOM

    4. Lets create a helper function to choose a random number before we try and write pickWinner
        - this function we will set to private as we won't want anyone to call or see this
        - next we will mark it as view type, as we are not modifying any state or data in the contract the only goal of this function is to return a random number
        -  we will put returns (uint) as it will return an 'unsigned integer 256'
    
    5. Inside our random block we want to take our
        - Current block difficulty
        - Curent Time
        - Addresses of players
            - Then feed them into the sha3 algorithm
            - sha3 is a GLOBAL function we can use, no import needed
                - keccak256() is essentially the same as sha3();
            - block is a GLOBAL variable we have access to at any given time
                - difficulty will return a number
            - now is the 2nd argument that represents the current time, also a global variable
            - players will be our 3rd argument passed, the array of addreses
            - we specified in the function we need a uint and sha or keccak will return a hash
                - so we need to wrap it with   uint() to convert our hash and meet requirements
       ```
        function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
            }
        }       
        ```

    6. Redepoyment and Testing
        - Once you clear previous deployments and run it again you will notice that there are no new function
            - Because we set random as private it isn't available on the Remix Panel
            - Now just for THIS ONLY instance lets make it public so we can test the random function
                - Now that we have the function you can see it returns a really long number
                - ok, lets change public back to private before we forget                    
        
        ## Creating pickWinner
        --
    7. Creating the pickWinner function
        - The order in which we create this is as follows
            - Call our 'random' fucntion
                - random()
                    - this.random is not needed
            - Use the 'modulo' operator
                - %
            - Number of players in the lottery
                - players.length
        - This should select a Random number between 0 and players.length
        - We declare it, as public
            - in the block we, declare our index(to store)
            - we run random to get a random number
            - get the modulo of random by running it agains the arrays length.
       
        ```
        function pickWinner () public {
                uint index = random() % players.length;
            }
        ```

    8. Now that we have the index we can select it from the players array ``players[index]``
        - we can call the transfer() function on our winner, this transfer is available on every address.
            - it takes units in wei  // players[index].transfer(1) This would transfer 1 wei
                - we can utilize this.balance to send the value of the contract to the winner
                    - this references the current contract
                    - balance references the amount of money currently bound to it
    ```
    function pickWinner () public {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
    }
    ```

    9. Lets test our new function and see if we can enter with 1 eth and run pickWinner with only 1 entrant.
        - This should return our eth and balance go back
            - Redeploy
            - Enter
            - pickWinner

    ## Reset our Contract
    --
    10. Next we want to 'Reset' our contract
        - This allows us to to start a new lottery after each winner has been picked
        - For this to happen, we need to empty the players array after we select the winner
        - This allows for us to deploy to the contract one time, but the lottery will run an infinite number of times
        ``players = new address[](0);``
        - This creates a brand new dynamic array of type address
        - Dynamic because the [] have no number
        - (0) indicates that we want it to have an initial array with nothing in it

    11. Currently our contract allows for anyone to run pickWinner
        - We need to configure it for only the manager
        - Lets add a require as the first line of our pickWinner block
            - ``require(msg.sender == manager);``
            - Boolean logic and msg.sender to determine if manager ran the pickWinner function

        - Perfect, lets redeploy, enter with an address, pickWinner with secondary address
            - if you get VM error: revert, SUCCESS
        - Notice how we used public
            - We didn't try to use private as security because it won't work
            - use require statements instead
            

    ## Function Modifiers
    --
    - As you can see from our last module we are in a classic case of "Don't repeat yourself"
         - We need to figure out a way to re-use the require function using a Function Modifier
            
    - What is a Function Modifier?
        - When we use the modifier keyword we are adding a new function modifier to our contract
        - Function Modifiers are used solely as a mean to reduce the amount of code you have to write
        - we just created a modifier called restricted
            - it can be anything you like, for example onlyManagerCanCall
        - we then need to add one or more lines of code
        - lastly we need to add a line with just a _;
            - _ is where the block of code that is ran will be placed, think of it like a target

        ```
        modifier restricted() {
        require(msg.sender == manager);
        _;
        }
        ```



    ## Return the Players Array
    --

    1. We know from a previous module that the players array can only be accessed currently by inputting a value to the players fuction and returning just that single array entry.
        - this isn't very helpful and it's time consuming. Let's make a function to return the whole array
        ```
        function getPlayers() public view returns (address[]) {
        return players;
        }
        ```

        - When we break down this code we 
            - create the function name getPlayers
            - public is set, because we want anyone to be able to run it
            - view is set as its contract type // No fees required
            - returns (adddress[]) specifies that it returns a dynamce array of address type
            - in the function block; return players, the global variable


    2. Testing the Players Array
        - Redeploy
        - Enter two accounts into the lottery
        - run getPlayers to return hte two accounts we entered
        - pickWinner as a non-manager
            - we want a revert error 
        - pickWinner as a manager
            - we want a success transactions
        - run getPlayers again, our array should be empty
    

## Time to Migrate to VSCode
--
1. Install 'lottery-boilerplate' files from course
2. npm install or 'npm i' from terminal to get our dependencies

    
    

## Setup Tests with Mocha
--

1. If we follow the tutorial we copy our Inbox contract to our Lottery Folder and need to update the file
    - If you follow the guide it says to use the biolerplate, which is already configured. 

2. We notice that compile.js has been configured for Lottery too

* compile.js
```
const path = require("path");
const fs = require("fs");
const solc = require("solc");

const lotteryPath = path.resolve(__dirname, "contracts", "Lottery.sol");  //loteryPath and Lottery.sol ahve been updated
const source = fs.readFileSync(lotteryPath, "utf8");

module.exports = solc.compile(source, 1).contracts[":Lottery"];  // we tell the compiler to look for the Lottery Contract
```

3. Notice deploy.js has been configured for Lottery As well
    - There isn't any references inside this code to update from 'inbox' to 'Lottery'
        - BUT, there is one thing that was changed
        - the inbox code we used before passed an INITIAL argument, lottery doesn't need that
            - Removed  ``arguments: {'hi, there'}`` from .deploy

* deploy.js
```
const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "juice bicycle seek common shield hello below angry source share exact mobile",
  // remember to change this to your own phrase!
  "https://rinkeby.infura.io/v3/15c1d32581894b88a92d8d9e519e476c"
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};
deploy();
```


4. That's it for file preparation. we can begin writing our Lottery Tests


## Coding the Tests
--

1. Preconfigure our Tests In Lottery.test.js
    - require in 'assert', this is helper library that is part of the node standard library
    `` const assert = require('assert'); ``
    
    - require in 'ganache', the local test network that only is created when we run our tests
    ``const ganache = require('ganache-cli');``

    - require in 'Web3', remember when we first require in web3 we require the constructor function
    ``const Web3 = require('web3');``
    
    - next create our 'web3' instance, with new Web3 ganache.provider
    ``const web3 = new Web3(ganache.provider());``
    - remember when working with ganache we pass the ganache provider 
    - upon moving to test network we will swap to the appropriate provider

    - require in our interface (abi) and bytecode (contract data) from our compiler ('.../compile')
    ``const { interface, bytecode } = require('../compile')``


    - lets create two global variables (so our beforeEach can be used on other test functions)
        - accounts
            - stores the ginache generated accounts
        - lottery
            - stores our contract data

2. We need to add a beforeEach next
    - lets add the accounts var using the web3 eth library getAccounts function
    - It will be asynconous in nature so needs to be in the block of our before each
    - This will create a fresh set of accounts to run each test

    - Lets add our lottery var to store our parsed interface
    - this get a fresh contract before each test 

    - add a .deploy function passing our object with {data: bytecode}
    - add a .send function passing {from: accounts[0], gas: '1000000'} to complete the deployment
    
    ```
    beforeEach(async () =>{
    accounts = await web3.eth.getAccounts();
    lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode})
    .send({ from: accounts[0], gas: '1000000'})
    })
    ```

3. Now that our beforeEach is configured we are ready to begin our actual top level tests.
    - lets begin with a describe statement
    - Our first argument is the Descripter for the test
    - 2nd is an anonymous function
        - Our first it function argument we pass the discriptor
        - Our 2nd is an anonymous function
            - Inside that we assert.ok that the lottery.options address was created
            - lottery is our contract variable that we created and stored globally
```
describe('Lottery Contract', () => {
    it('deploys a contract', () => {
        assert.ok(lottery.options.address)
    })
})
```

4. npm run test from terminal to run our test in mocha
    - If Green Check, SUCCESS



## More Tests
---

1. Now that we know our testing environment is configured and working we can begin to write the rest of our tests

2. What tests do we write though?
    - Ask yourself a question
        - What behavior do you really care about with this contract?

3. Lets create a test that checks if we allow one account to enter the lottery
    - in our describe block after our first it statement lets add antoher
    - first argument
        - allows one account to enter
    - second argument
        - anonymous function
            - asyncronous so we need to append before the ()
            - await in the block
            - lottery.methods.enter().send()
                - this sends the enter method of our lottery contract
            - inside the send object we have to specify two variables
                - from: accounts[0]  //account from ganache to send from
                - value: web3.utils.toWei('0.02, 'ether')
                    - this allows us to use a web3 utility toWei to send .02 ether instead of typing out wei
            - now we can use a const players to store the asyncronous data from lottery.methods.getPlayers().call()
                - But we must pass an object argument in call
                    - {from: accounts[0]}
            - we can add an assert next to compare that the players[0] entry matches our account[0] wallet
            ``assert.strictEqual(accounts[0, players[0]]);``
            - We can add another that make sure that the length of our array only has 1 entry in it.
            ``assert.strictEqual(1, players.length);``
            * When using assert equal, the first argument is what it should be and the 2nd is what it is
    ```
    it('allows one account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('.02', 'ether')
        });     
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        })
        assert.strictEqual(accounts[0], players[0]);
        assert.strictEqual(1, players.length);
    })
    ```
        
4. For our next test we want to try to to get multiple accounts to enter.
    - We can copy the code from our previous it statement, since their similiar.
    - take the enter() function and duplicate it twice
    - change the accounts to 1 and 2
     next make sure our second assert accounts for 3 instead of 1 players.length
    - npm run test
    
    ```
    it('allows multiple accounts to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('.02', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('.02', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('.02', 'ether')
        });     
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        })
        assert.strictEqual(accounts[0], players[0]);
        assert.strictEqual(1, players.length);
    })
    ```

## Try-Catch Assertions
---

5. In our next test we want to make sure our user is sending the appropriate number of ether when we enter the lottery
    - if you send less than .01 ether we DO NOT want to allow them to enter the contract
    - This test is tricky as it we wan't to check to see if something doesn't work.
    - it will be asyncronous
    - in the block we will call lottery.methods.enter().send()
        - inside hte send function we will pass an object
            - from: accounts[0],
            - value: 10  // we want to send a value too low to trigger the error
    - Using TRY-CATCH we can tell the test to try a block of code and when it errors we can catch it
    - in our catch block we can assert(err) to see if we got an error
    - to be double sure our test fails,  can add assert(false) after our await. so this way if for some reason the lines before pass, it forces it to fail 
    - if the block above DOES fail then the catch is triggered



## Testing Function Modifiers
--

1. In our previous test we used a pattern that lets us make sure people enter properly.

2. We can take that test pattern, copy it into our new test and add onto it.

3. We want to make sure that if a person who isn't the manager tries to run pickWinner, it doesn't let them
    - Change the await line to lottery.methods.pickwinner().send();
    - Change the from account to a non-manager account
    - keep the assert(false);
    - leave the catch(err){assert(err)}


## End to End Testing
--

1. Things we want to test
    - Enter a player into the contract
    - Pick a winner
    - Verify the winner receives some amount of money
    - Verify the players array gets completely reset

2. This is tricky with randomization and dynamic players array
    - The easiest way to write our tests is write it with logic for 1 account
    ```
    await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        })
    ```

3. We need to compare the amount of eth before and after our account to confirm the sending functionality works
    - Create an initialBalance using await web3.eth.getBalance on accounts[0]
    - await then pickwinner from accounts[0];
    - Create finalBalance using await web3.eth.getBalance on accounts[0]
    - Create difference taking finalBalance - intialBalance
        - u can log this to see the specific amount
    - assert (difference > 1.8 ether using toWei)

## Ethereum App Architecture
--

1. We now are going to pivot into creating a Web Interactive Frontend to make use of this contract.

2. In order to put together a frontend for a user to interact with this contract we are going to make use of the:
React JS VIEW RENDING LIBRARY

3. Why React?
    - In Ethereum Architecture vs Traditional, the Server interaction with the client is very limited, as writing data to the blockchain must be done from the client.

    - The only way to change data is through the use of public/private keys

    - The user will never send the private keys to the server

    - With traditional architecture we could get away with just plain html

    - With Ethereum architecture and the most logic needing to be ran client side so they can sign the transaction
        - We need to put more of the logic in the user browser 
        - This means we need to use more libraries, more code, than we have in the past, this where React comes in

    - React is easier that Vanilla JS

    - Begin React Module
    