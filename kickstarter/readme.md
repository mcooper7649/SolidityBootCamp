## Real Projects with Ethereum
--


### Solving Real Problems with Contracts
---

1. This module we will show you how blockchain can solve a real world problem

2. This will give us a better idea on how to apply these technologies in our person projects

3. An example we can share is the Kickstart Platform
    - Normal use of the platform allows for people to design an idea or product
    - Once they hit a goal of amount of money via project backers
    - AND the project 'hours to go' run out, the company receives the money and is supposed to send the back their product

4. This leaves the ability for the campaign creator to just not build the project and keep all the money.



## How can we use Ethereum to solve Kickstarters problem?
-- 
1. How can we use Ethereum to solve Kickstarters problem?
    
    - Problem: Currently the Idea Person can run off with the contributers money

    - In-Depth: The Contributers or Backers give their money to the Manager/Idea Person and they are supposed to take those funds pay each vendors/employees until the product has been shipped.

    - Some People do this by accident/bad business model/maliciously

2. Solution: If we can control where the money goes, then we should be able to prevent theft or misuse

3. In-Depth-Solution:
    - We need to use Ethereum contracts to have the manager submit a 'Spending Request" to outside addresses (like a vender)
    - then the contributers would vote on this request

    
## Campaign/Crowdfund Contract Design
--

1. First Take Variables
    - manager
        - type address
        - address of the person who is managing this contract
    - minimumContribution
        - type unint
        - Minimum donation required to be considered a contributor or 'approver'
    - approvers
        - type address[]
        - List of addresses for every person who has donated money
    - requests
        - type Requests[]
        - List of reqeusts that the manager has created
        - This enforces some type of security

2. First Take Functions
    - Campaign
        - Constructor/Contract function that sets the minimumContribution and the owner
    - contribute
        - Called when someone wants to donate money to the campaign and become an 'approver'
    - createRequest
        - Called by the manager to create a new 'spending request'
    - approveRequest
        - Called by each contributor to approve a spending request
    - finalizeRequest
        - After a request has gotten enough approvals, the manager can call this to get money sent to the vendor


## Time to Remix
---

[remix.ethereum.org](remix.ethereum.org)

1. Now that we our basic requirements and structure kinda sorted out, we can begin our work on our contract over at remix. 

2. We are going to implement our contract design we just went over in remix before we head over to our IDE to begin our testing

3. We can open the ballot.sol again from our previous projects and remove all the code, except for the pragma portion

4. First thing we want to create is the contract 
    - we need to give it a name, if you look at our first take functions
    - This is Campaign, our constructor 
    - Inside our Block we are going to put our information about 'Campaign'  in the first line.
        - address [type]
        - public 
        - manager // variable name for person managing this contract 

5. Now that we have defined Campaign, we can create the contract function 'Campaign'
    ```
     function Campaign() public {
        manager = msg.sender;
    }
}

 - We must remember msg is a global variable we don't define, it's always available to us.
    - The sender property of msg refers to who is trying to create the contract aka donate to the campaign

6. Now that we have manager variable created, lets create minimumContribution variable next
    - Constructor/Contract function that sets the minimumContribution and the owner
    - uint public minimumContribution
    - now we can pass unint minimum as our argument
        - then assign it to our global variable minimumContribution

```
pragma solidity ^0.4.17;

contract Campaign {
    address public manager;
    uint public minimumContribution;
    
    function Campaign(uint minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }
}
```

7. For our next function, contribute we can see that money will be handled as we are contributing to the contract
    - We will need to mark this function not just as public but also 'payable'
    - When someone calls this function we need to make sure it is greater than the minimumContribution
    - We can add in a require statement to compare how much money the user is sending
    ``require(msg.value > minimumContribution);``
    - if value doesn't meet requirements function is immediately exited and not executed


8. If the require statement is met, we can move on with the next line
    - approvers.push(msg.sender);
    - This pushes the msg.sender address to the approvers array.


## Time to Begin Testing
--

1. Now that we have our contract created. Lets begin deploy it so we can begin testing afterwards.

2. In Remix, lets take a look at our contract
    - You can see the unint minimum is needed for our Campaign to execute, we need to input into the field next to 'Deploy' in remix. This is Wei, not Ether.

3. Click 'Deploy' after we specified 100 in the field neext to deploy
    - Below you will see our instance of our contract
        - contribute
            - if we pass the value 101 wei, we can contribute
        - approvers
            - Array of Approvers
        - manager
            - manager address
        - minimumContribution
            - returns "100" wei

## The Request Struct
--

1. Before we begin, we need to understand the different Reference Types in Solidity

2. Reference Types
- Name
    - Fixed Array
    - Dynamic Array
    - Mapping
    - Struct
- Notes
    - Array that contains a single type of element. Has an unchanging length
    - Array that contains a single type of element. Can change in size over time
    - Collection of key/value pairs. Think of Javascript Objects, Ruby Hashes, or Python dictionary. All keys must be of the same type, and all values must be of the same type
    - Collection of key value pairs that can have different types
- Examples
    - int[3] --> [1, 3, 3]   or    bool[2] --> [true, false]
    - int[] ---> [1,2,3] or     bool[]--->[true, false]
    - mapping(string => string) or mapping (string => bool)
    - struct Car { string make; stirng model; unint value;}

    
## New Struct Inside our Contract
--

1. Were going to create a new struct inside our contract is going to be called 'request'
    - The struct is going to have a couple fields to describe the purpose of this request
    

Request Struct
--

- Name
    - Description
    - Value
    - Recipient
    - complete
    - ???
- Type
    - string
    - uint
    - address
    - bool
    - ??
- Purpose
    - Describes why the reqeust is being created
    - Amount of money that the manager wants to send  the vendor
    - Address that the money will be sent to
    - True if the request has already process(money sent)
    - Voting Mechanism!

2. Now that we understand the basic layout of our Request struct we can begin Writing the Contract Code.
    - We want to start at the top, above the variables

3. We can now create our struct now that we now our name and type

```
struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
    }

```

- Please Remember  this just defines the idea or type of a Request, the outline, the structure, we still need to create a struct instance.


## More On Function Modifiers
--

1. In this next module we are going to work on the createRequest function.

2. We are also going to create our request array
    - We need create a request array that specificically holds types request as variable

3. Below our struct code
    - ``Request[] public requests``
        - Notice how we declare it with a capital R, like we did with our struct
        - An Array of struct type is with a capital letter
        - now we can tap into our array by typeing ``request[3]`` for example

4. Something about our createRequest function
    - We probably only want our manager to be able to call it
    - lets add  the modifier restricted code
        
```
    modifier restricted (){
    require(msg.sender == manager);
    _;
}
```


## Creating Struct Instances
--

1. Now that we have our modifier restricted, we can begin work on our createRequest function

2. after our contribute function
    - we want it to be public
    - we want it to be only called by manager so lets make it restricted
    
3. if we look at our struct Request, you can see we have description, value and recipient that need to be specified by the manager when they createRequest. So lets add to our function first