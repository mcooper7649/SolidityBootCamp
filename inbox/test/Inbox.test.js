// contract test code will go here
const assert = require('assert'); // assign a variable to assert
const ganache = require('ganache-cli'); //assign a variable ganache
const Web3 = require('web3')  //Notice Web3 is capitalized as its a constructor
const web3 = new Web3(ganache.provider()); // create our web3 instance


beforeEach(() => {
    // Get a list of all accounts
    web3.eth.getAccounts().then((fetchedAccounts) => {
      console.log(fetchedAccounts);
    });
  });
  
  describe("Inbox", () => {
    it("deploys a contract", () => {});
  });
  