// contract test code will go here
const assert = require('assert'); // assign a variable to assert
const ganache = require('ganache-cli'); //assign a variable ganache
const Web3 = require('web3')  //Notice Web3 is capitalized as its a constructor
const web3 = new Web3(ganache.provider()); // create our web3 instance
const { interface, bytecode} = require ('../compile');  // Imports our ABI and DATA from the compiler

let accounts;
let inbox;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts()

    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi There!"] })
    .send({ from: accounts[0], gas: '1000000'})

  });
  
  describe("Inbox", () => {
    it("deploys a contract", () => {
      console.log(inbox)
    });
  });
  