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
        - Constructor function that sets the minimumContribution and the owner
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

1. Now that we our basic requirements and structure kinda sorted out, we can begin our work on our contract over at remix. 