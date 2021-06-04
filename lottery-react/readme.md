## Getting Started with Create React APP
---

1. Once we have our lottery-react folder
    - npm run start from terminal
    - http://localhost:3000/ to confirm React was successfully Installed

2.  Next make sure you install web3
    ``npm i web3@1.3.5``



## What is web3?
--

- When we interact with our app so far we have been using web3 from MetaMask
    - This is v0.3.0


- When we build a webapp we want to use web3 but a newer version
    - This is v1.0 or higher

- We must remember that inside each web3 instance we have our provider configured for our network
- We want to develop our app to use web3v1.0 but we want to take the provider information from the injected copy of web3 metamask
- For this application we are ASSUMING the user has MetaMask installed, for future projects we will built it out completely


## Setup Web3
--

1. We need to first convert our APP function into a class
    - then we can concole.log(web3.version)
    - next lets console.log(web3.getAccounts())
    - We should see our MetaMask Accounts in the Console, if you are logged in


## Deploying the Lottery Contract
--

1. Lets remove any console logs from our previous module first.

2. Next were going to take our Lottery Contract and Get it to interact with our React App.

3. This is our Most IMPORTANT Section

4. If you recall, our Lottery Project had two additional scripts setup inside them
    - Compile.sol
        - This took our Solidity Source Code and Compiled it and Generated 
            - ABI
                - Interface Layer/CommunicationLayer from the blockchain world to the JavaScript World
            - Contract ByteCode
                - Used to Deploy the Contract to the Actual Network
    - Deploy.sol

5. Were going to take our ABI and feed it into our web3 instance
    - This is going to create a local copy of hte contract
    - its going to tell our web3 instance, 'hey, heres a contract, and heres how it behaves'
    - Here's what they require as inputs and outputs
    - Were then going to Deploy our Contract (Rinkeby For example) and we will tell web3 where that contract is deployed at
        - This is always a unique address
    - Once our contract is on the network is when we can call our methods and functions

6. First Things First
    - We need to get access to our contract interface
    - Deploy our contract and acquire our address 
        - Make sure to console loke the 'result.options.address' to find that contract address
        - We can add a console.log(interface); to get our inferface too

7. To deploy our contract we just run
    ``node deploy.js`` from our console
    
8. This will compile our script and attempt to deploy to the Rinkeby Network

## Adding our Information to our Lotto_React Project
--

1. From our previous module we should have to addresses available
    - Deploy from account
        - 0x52e484E2C2Ca5d9b5C344ECF66f0E1B4F3113960
    - Contract Deployed to Address
        - 0xCbAEAA49f50523a489DE90f32821a74c60A00a49

2. We now want to COPY and PASTE our ABI and Address and add them to our Lotto_React FrontEnd

3. Lets import web3 as well
```
import web3 from './web3';

const address = '0xCbAEAA49f50523a489DE90f32821a74c60A00a49'
const abi = [{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pickWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"enter","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
```


## Local Contract Instances
--

We are going to create a local COPY of our Deployed Lottery Instance from Rinkeby in the next module.

1. We need to add the following line of code to export our Contract for local instances.

```
export default new web3.eth.Contract(abi, address)
```

2. Now that we have our web3 eth Contract, we can call upon the same methods and functions that we did in the our Test suite


## Rendering Contract Data
--

1. Now that we have our contract data we can work with it by importing it to our App.js
``import lottery from '.lottery';``

2. Inside our lottery we have an address, that is the manager, we want to somehow get this account rendered onto the page

3. In order to get any information to render on a page, it will ALWAYS follow the same sequence of actions
    - Component Renders
    - componentDidMount called
        - This lifecycle method is a common and useful REACT method for applying amethod only once
    - 'Call' methods on contract
    - Set data on 'state

4. Inside of our componentDidMount we will call on the the manager method
    - From our test module you remember we specified {from: accounts[0]}
    - We don't need to as with this web3 provider as we are using MetaMask
    - This Copy of web3 has a default account set, and that is the first account that is logged into MetaMask Currently


```
  componentDidMount(){
    const manager = await lottery.methods.manager().call();
  }

```

5. Next we can add our setState, because its a class, we will use THIS.
    - Inside we can set the state as {manager: manager} mor just { manager } for es15 syntax

6. Remember, whenever we are working with state, we want to add a contructor with props and super with prop and specify our default properties

```
class App extends Component {
  constructor(props){
    super(props);
  

    this.state = { manager: ''};
  }

  async componentDidMount(){
    const manager = await lottery.methods.manager().call();

    this.setState({ manager: manager});

  }
```

7. Lasly we can add some HTML to render our the state of manager
```
  render(){
  return (
  <div>
    <h2>Lottery Contract</h2>
    <p>This Contract is Managed by {this.state.manager}</p>
  </div>
  )
 }
 ```

 8. ``npm run start`` and visit localhost:3000
    - If no errors, it should render our new HTML


## Refactoring and Instance Propeties
--

1. Earlier we mentioned we can create the constructor with props and then pass a super with props, THEN we can put this.state

2. Thankfully in ES15 we can remove all that redundant code and just put

old constructor and state
```
constructor(props){
    super(props);
  

    this.state = { manager: ''};
  }
```

new state
```
state = {
    manager: ''
}

```

## Accessing More Properties
--


1. Now that we know how to access our Manager Propterty from our contract lets try to access something else

2. Lets take a look at our previous mockup
    - We want to know how many people have entered
        - create a players const
        - await getPlayers 
        - setState of players
        - initialize players
        - add in this.state jsx into html
    - How much is in the contract balance
        - create a balance const
        - await web3 eth getBalance method on lottery.options.address
        - setState of balance
        - initialize balance
            - as en empty string, even though its an object
        - add in this.state jsx into html
            - we first want to utilize the web3.utils.fromWei
                - This lets us convert from a wei amount to a more viewable ether
                ``{web3.utils.fromWei(this.state.balance, 'ether')}``
                - Don't for get to pass the 2nd argument, 'ether'!


## The Enter Form
--

1. Here we create a horizontal rule to seperate our sections
2. Next a <form> is added
3. h4 'Want to test your luck?'
4. div with label, input, button
    - label 'Amount of ether to enter'
    - input, specify an onChange with event => setState({value:event.target.value})
    - initialize value in the state as a string
    - Add a button 'Enter'


## Form Setup
--

1. When we click the 'Enter' Button we really mean, to send a transaction to the contract with the amount of ether we specied in the input field.

2. Lets add an event handler, this watches for the submit event on the form
    - inside the <form> tag, we can add an onSubmit
        -{this.onSubmit}   //Next we will create this onSubmit function

3. onSubmit we want to create just after componentDidMount
    - we will specify its async and pass an event 
    - event.preventDefault(); to prevent normal browser submit
    - const accounts = await web3.eth.getAccounts(); 
    - await lottery.methods.enter().sent()
        - from: accounts[0]
        - value: web3.utils.toWei to convert our value property back to wei
        - pass the 'ether' 
```
      onSubmit = async (event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccount();

        await lottery.methods.enter().send({
          from: accounts[0],
          value: web3.utils.toWei(this.state.value, 'ether')
        })
      }
  }
```

## Entering the Lottery
--

1. We finished our last module by creating the enter form and configuring the submit button with the onSubmit function.

2. We want to add a little warning logic to help the user understnad that the transaction is pending.

3. We can acheive this by adding
``   this.setState({ message: 'Waiting on Transaction success...'});``

above our enter().send() method, then after we can add
``this.setState({ message: 'You have been entered!'});``

4. Make sure to initialize message as a string 

5. Now that we have our message configured, lets add it to the html using jsx
    - lets add an <hr> and <h1> tag below our form

6. Using {this.state.message} we can display our message status

7. We must remember that we have a minimum ether that needs to be submitted to be entered
    - We need greater than 0.01 ether, for example. 0.011 is the minimum in ether

8. Now if we click the enter button we should see our message and also a prompt from our metamask

9. If you submit from the MetaMask Client we will now get our 'Waiting on Transaction success' message
    - yay we did it!

10. Notice how long it took. It is nessecary to create message prompts when working with blockchain as our users can get confused.


## Picking a Winner 
---

1. Great we have the ability to Enter our Lottery but now we need to add the Option to Pick Winner

2. For this example we are going to render a Pick Winner Button below our Enter (like our mockup)
    - Anyone will be able to see and press it
        - Only the Manager can press it without error

3. Lets add another <hr /> and <h4> tag
    - 'Ready to Pick a winner?'
    
4. Create a button with text after our h4
    - 'Pick a Winnner'

5. Lets add a onClick event to our button
    - onClick={this.onClick}

6. Next we need to define our onClick method, above render like we did w/ on Submit

7. We can use the same syntax, as we did with our onSubmit
    - remove event as our argument and event.preventDefault() as were not submitting a form.
    - Update enter() in our lottery.methods to pickWinner()
    - Update our 2nd message to 'A Winner has been picked'
    - Remove the value: from our pickWinner() as it has no requirement to submit, other than normal gas fees

8. We may want to display the 'Winner' but the pickWinner method doesn't actually return any data, so we can't determine that yet., we could add a lastWinner[index] logic to our contract to determine who won but for this example we won't add it to keep it simple.

