// deploy code will go here
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3')
const { interface, bytecode} = require('./compile')


const provider = new HDWalletProvider(
    'antique switch require diagram document author survey crime harbor among midnight electric',
    'https://rinkeby.infura.io/v3/7ec0581ebf414d5ca76df73ad8b42746'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0])

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there']})
        .send({ gas: '1000000', from: accounts[0]})

        console.log('Contract Deployed to', result.options.address);
};
deploy();
