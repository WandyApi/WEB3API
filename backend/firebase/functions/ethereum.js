var Web3 = require('web3'); 
const Bip39 = require('bip39');
var Wallet = require('ethereumjs-wallet');
const BigNumber = require('bignumber.js');
var fetch = require('node-fetch');
require('dotenv').config();
const { RPC_API_KEY_ETHEREUM, NFT_API_KEY_ETHEREUM } = process.env;

//Ethereum RPC Endpoint
//The key has API calls limit and it is for testing purpose.
//Please replace it with your own one from alchemy.com
const web3_eth = new Web3(new Web3.providers.HttpProvider('https://eth-mainnet.g.alchemy.com/v2/' + RPC_API_KEY_ETHEREUM));

const NFT_ABI = [
  {"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
  {"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
  {"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
  {"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
  {"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
  {"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},
  {"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
  {"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},
  {"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},
  {"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},
  {"constant":true,"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},
  {"constant":false,"inputs":[{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenOfOwnerByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  {"constant":false,"inputs":[{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }
];

exports.createWallet = (req, res) => {
    let mnemonic = req.mnemonic;
    const seedPhrase = Bip39.mnemonicToSeedSync(mnemonic);
    const account = Wallet.hdkey.fromMasterSeed(seedPhrase);
    const myWallet = account.derivePath("m/44'/60'/0'/0/0").getWallet();

    let result = {
      'error': '',
      'address': myWallet.getAddressString()
    };

    var jsonResult = JSON.stringify(result, null, 2);
    return jsonResult;
}

exports.createAccount = (req, res) => {
    let mnemonic = req.mnemonic;
    const seedPhrase = Bip39.mnemonicToSeedSync(mnemonic);
    const account = Wallet.hdkey.fromMasterSeed(seedPhrase);
    const myWallet = account.derivePath("m/44'/60'/0'/0/0").getWallet();
    const myAccount = web3_eth.eth.accounts.privateKeyToAccount(myWallet.getPrivateKeyString());
    return myAccount;
}

exports.getBalance = async (req, res) => {
    let walletAddress = req.walletAddress;
    let tokenAddress = req.tokenAddress;
    let minABI = [
        {
          "constant":true,
          "inputs":[{"name":"_owner","type":"address"}],
          "name":"balanceOf",
          "outputs":[{"name":"balance","type":"uint256"}],
          "type":"function"
        },
        {
          "constant":true,
          "inputs":[],
          "name":"decimals",
          "outputs":[{"name":"","type":"uint8"}],
          "type":"function"
        }
      ];

      if(tokenAddress == 'ETH') {
        let balance =  await web3_eth.eth.getBalance(walletAddress);

        let result = {
          'error': '',
          'tokenAddress': tokenAddress,
          'balance': balance
        };

        var jsonResult = JSON.stringify(result, null, 2);
        return jsonResult;

      } else {
        try {
        let contract = new web3_eth.eth.Contract(minABI, tokenAddress);  
        let balance =  await contract.methods.balanceOf(walletAddress).call();
        
        let result = {
          'error': '',
          'tokenAddress': tokenAddress,
          'balance': balance
        };

        var jsonResult = JSON.stringify(result, null, 2);
        return jsonResult;

        } catch (error) {

          let result = {
            'error': error.message,
            'tokenAddress': tokenAddress,
            'balance': 0
          };
  
          var jsonResult = JSON.stringify(result, null, 2);
          return jsonResult;
        }
      }
}

  exports.transfer = async (req, res) => {

    var mnemonic = req.mnemonic;
    var toAddress = req.toAddress;
    const tokenAddress = req.tokenAddress;
    const amount = Number(req.amount);
    
    const seedPhrase = Bip39.mnemonicToSeedSync(mnemonic);
    const hdkey = Wallet.hdkey.fromMasterSeed(seedPhrase);
    const myWallet = hdkey.derivePath("m/44'/60'/0'/0/0").getWallet();
    const fromAddress = myWallet.getAddressString();
    const privateKey = myWallet.getPrivateKeyString();
  
    const count = await web3_eth.eth.getTransactionCount(fromAddress);
        
    var block =  await web3_eth.eth.getBlock("latest");
    var gasLimit = block.gasLimit/block.transactions.length;
    const gasPrice = await web3_eth.eth.getGasPrice();;
  
    if(tokenAddress == 'ETH') {
  
      const rawTransaction = {
        'to': toAddress, 
        'value': amount,
        "gasPrice": gasPrice,
        "gasLimit": parseInt(gasLimit),
        'nonce': count
       };
  
       const signedTx = await web3_eth.eth.accounts.signTransaction(rawTransaction, privateKey);
       try{
        const transaction =  await web3_eth.eth.sendSignedTransaction(signedTx.rawTransaction);
        const gasFee = gasPrice * transaction.gasUsed;
  
        let result = {
          'error': '',
          'transactionHash': transaction.transactionHash,
          'tokenAddress': tokenAddress,
          'fromAddress': fromAddress,
          'toAddress': toAddress,
          'amount': amount,
          'gasPrice': gasPrice,
          'gasUsed': transaction.gasUsed,
          'gasFee': gasFee
        };
  
        var jsonResult = JSON.stringify(result, null, 2);
        // console.log(jsonResult);
        return jsonResult;
  
      } catch(error) {
  
        var errorMessage = error.message;
        var transactionHash = '';
        var gasUsed = 0;
        
        if(errorMessage.includes('insufficient fund')){
          errorMessage = 'Insufficient funds for gas fee and value.';
        }
  
        if(errorMessage.includes('reverted by')){
          errorMessage = errorMessage.replace('\\', '');
          let position = errorMessage.indexOf("{");
          errorMessage = errorMessage.substring(position, errorMessage.length);
          
          const jsonObject = JSON.parse(errorMessage);
          transactionHash = jsonObject.transactionHash;
          gasUsed = jsonObject.gasUsed;
          errorMessage = 'Transaction has been reverted by the EVM.';
        }
  
        let result = {
          'error': errorMessage,
          'transactionHash': transactionHash,
          'tokenAddress': tokenAddress,
          'fromAddress': fromAddress,
          'toAddress': toAddress,
          'amount': amount,
          'gasPrice': gasPrice,
          'gasUsed': gasUsed,
          'gasFee': gasPrice * gasUsed
        };
  
        var jsonResult = JSON.stringify(result, null, 2);
        // console.log(jsonResult);
        return jsonResult;
  
      }
  
    } else {
    
      let abiArray = [
        {
            'constant': false,
            'inputs': [
                {
                    'name': '_to',
                    'type': 'address'
                },
                {
                    'name': '_value',
                    'type': 'uint256'
                }
            ],
            'name': 'transfer',
            'outputs': [
                {
                    'name': '',
                    'type': 'bool'
                }
            ],
            'type': 'function'
        }
     ];
      
      web3_eth.eth.accounts.wallet.add(privateKey);
      var contract = new web3_eth.eth.Contract(abiArray, tokenAddress, { from: fromAddress });
  
      var rawTransaction = {
        "from": fromAddress,
        "gasPrice": gasPrice,
        "gasLimit": parseInt(gasLimit),
        "nonce": count
      };
    
  
      try{
        let transaction = await contract.methods.transfer(toAddress, BigNumber(amount)).send(rawTransaction);
        const gasFee = gasPrice * transaction.gasUsed;
  
        let result = {
          'error': '',
          'transactionHash': transaction.transactionHash,
          'tokenAddress': tokenAddress,
          'fromAddress': fromAddress,
          'toAddress': toAddress,
          'amount': amount,
          'gasPrice': gasPrice,
          'gasUsed': transaction.gasUsed,
          'gasFee': gasFee
        };
  
        var jsonResult = JSON.stringify(result, null, 2);
        // console.log(jsonResult);
        return jsonResult;
  
      } catch(error) {
  
        var errorMessage = error.message;
        var transactionHash = '';
        var gasUsed = 0;
        
        if(errorMessage.includes('insufficient fund')){
          errorMessage = 'Insufficient funds for gas fee and value.';
        }
  
        if(errorMessage.includes('reverted by')){
          errorMessage = errorMessage.replace('\\', '');
          let position = errorMessage.indexOf("{");
          errorMessage = errorMessage.substring(position, errorMessage.length);
          
          const jsonObject = JSON.parse(errorMessage);
          transactionHash = jsonObject.transactionHash;
          gasUsed = jsonObject.gasUsed;
          errorMessage = 'Transaction has been reverted by the EVM.';
        }
  
        let result = {
          'error': errorMessage,
          'transactionHash': transactionHash,
          'tokenAddress': tokenAddress,
          'fromAddress': fromAddress,
          'toAddress': toAddress,
          'amount': amount,
          'gasPrice': gasPrice,
          'gasUsed': gasUsed,
          'gasFee': gasPrice * gasUsed
        };
  
        var jsonResult = JSON.stringify(result, null, 2);
        // console.log(jsonResult);
        return jsonResult;
      }
   }
  }


exports.getEstimateGasFee = async (req, res) => {
  let amount = Number(req.amount);
  let tokenAddress = req.tokenAddress;
  let fromAddress = req.fromAddress;
  let toAddress = req.toAddress;
  
  let estimateGasPrice = await web3_eth.eth.getGasPrice();
  let estimateGasPriceEther = web3_eth.utils.fromWei(estimateGasPrice,'ether');

  var block =  await web3_eth.eth.getBlock("latest");
  var estimateGasLimit = block.gasLimit/block.transactions.length;
  
  let abiArray = [
    {
        'constant': false,
        'inputs': [
            {
                'name': '_to',
                'type': 'address'
            },
            {
                'name': '_value',
                'type': 'uint256'
            }
        ],
        'name': 'transfer',
        'outputs': [
            {
                'name': '',
                'type': 'bool'
            }
        ],
        'type': 'function'
    }
  ];
  
  try{
  var contract = new web3_eth.eth.Contract(abiArray, tokenAddress, { from: fromAddress });
  let estimateGas =  await web3_eth.eth.estimateGas({
    "value": BigNumber(amount),
    "data": contract.methods.transfer(toAddress, BigNumber(amount)).encodeABI(),
    "from": fromAddress,
    "to": toAddress
    });
  
    let result = {
        'error': '',
        'tokenAddress': tokenAddress,
        'tokenAmount': amount,
        'estimateGasFee': estimateGas * estimateGasPriceEther,
        'estimateGasFeeLimit': estimateGasLimit * estimateGasPriceEther
    };
  
    var jsonResult = JSON.stringify(result, null, 2);
    return jsonResult;
  
    } catch(error) {
  
      let result = {
        'error': error.message,
        'tokenAmount': amount,
        'tokenAddress': tokenAddress,
        'estimateGasFee': 21000 * estimateGasPriceEther ,
        'estimateGasFeeLimit': 21000 * 2 * estimateGasPriceEther
    };
  
      var jsonResult = JSON.stringify(result, null, 2);
      return jsonResult;
    }
  }
 
 exports.transferNFT = async (req, res) => {
  
    var mnemonic = req.mnemonic;
    var toAddress = req.toAddress;
    const tokenAddress = req.tokenAddress;
    const tokenId = req.tokenId;
    const amount = req.amount;
  
    const seedPhrase = Bip39.mnemonicToSeedSync(mnemonic);
    const hdkey = Wallet.hdkey.fromMasterSeed(seedPhrase);
    const myWallet = hdkey.derivePath("m/44'/60'/0'/0/0").getWallet();
    const fromAddress = myWallet.getAddressString();
    const privateKey = myWallet.getPrivateKeyString();
  
    const count = await web3_eth.eth.getTransactionCount(fromAddress);
    var block =  await web3_eth.eth.getBlock("latest");
    var gasLimit = Math.floor(block.gasLimit/block.transactions.length);

    const gasPrice = await web3_eth.eth.getGasPrice();
  
    web3_eth.eth.accounts.wallet.add(privateKey);
    var contract = new web3_eth.eth.Contract(NFT_ABI, tokenAddress, { from: fromAddress });
  
    var rawTransaction = {
      "from": fromAddress,
      "gasPrice": gasPrice,
      "gasLimit": parseInt(gasLimit),
      "nonce": count
    };
  
    try{
      let transaction = await contract.methods.safeTransferFrom(fromAddress, toAddress, tokenId).send(rawTransaction);
      const gasFee = gasPrice * transaction.gasUsed;
  
      let result = {
          'error': '',
          'transactionHash': transaction.transactionHash,
          'tokenAddress': tokenAddress,
          'fromAddress': fromAddress,
          'toAddress': toAddress,
          'tokenId': tokenId,
          'amount': amount,
          'gasPrice': gasPrice,
          'gasUsed': transaction.gasUsed,
          'gasFee': gasFee
      };
  
      var jsonResult = JSON.stringify(result, null, 2);
      // console.log(jsonResult)
      return jsonResult;
  
    } catch(error) {
        var errorMessage = error.message;
        var transactionHash = '';
        var gasUsed = 0;

        if(errorMessage.includes('insufficient fund')){
          errorMessage = 'Insufficient funds for gas fee and value.';
        }
  
        if(errorMessage.includes('reverted by')){
          errorMessage = errorMessage.replace('\\', '');
          let position = errorMessage.indexOf("{");
          errorMessage = errorMessage.substring(position, errorMessage.length);
          
          const jsonObject = JSON.parse(errorMessage);
          transactionHash = jsonObject.transactionHash;
          gasUsed = jsonObject.gasUsed;
          errorMessage = 'Transaction has been reverted by the EVM.';
        }
  
        let result = {
          'error': errorMessage,
          'transactionHash': transactionHash,
          'tokenAddress': tokenAddress,
          'fromAddress': fromAddress,
          'toAddress': toAddress,
          'tokenId': tokenId,
          'amount': amount,
          'gasPrice': gasPrice,
          'gasUsed': gasUsed,
          'gasFee': gasPrice * gasUsed
        };
  
        var jsonResult = JSON.stringify(result, null, 2);
        // console.log(jsonResult)
        return jsonResult;
    }  
  }


exports.getNFTsByOwner = async (req, res) => {
// async function getNFTsByOwner(walletAddress) {
  let walletAddress = req.walletAddress;

  //The key has API calls limit and it is for testing purpose.
  //Please replace it with your own one from alchemyapi.io
  const apiKey = NFT_API_KEY_ETHEREUM;
  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTs/`;
  const fetchURL = `${baseURL}?owner=${walletAddress}`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

   var response = await fetch(fetchURL, requestOptions);
   var nftsMetadata = [];
   if(response.status == 200) {
    const tokenMetadata1 = await response.json();
    const totalCount = tokenMetadata1.totalCount;
    for (let i = 0; i < totalCount; i++) {
      const tokenMetadata2 = tokenMetadata1.ownedNfts[i];
      // console.log(tokenMetadata2);
      const tokenId = hex2dec(tokenMetadata2.id.tokenId);
      var thumbnail = tokenMetadata2.media[0].thumbnail;
      var format = tokenMetadata2.media[0].format;
      var totalSupply = '0';

      if(typeof thumbnail == 'undefined') {
        thumbnail = tokenMetadata2.media[0].gateway;
        format = '';
      }

      const contractMetadata = tokenMetadata2.contractMetadata;
      if(typeof contractMetadata != 'undefined') {
        totalSupply = contractMetadata.totalSupply;

        if(typeof totalSupply == 'undefined') {
          totalSupply = '0';
        }

      }

      var title = tokenMetadata2.title;
      var description = tokenMetadata2.description;

      if(title == '') {
         const tokenUri = tokenMetadata2.tokenUri.raw;
         if(tokenUri.toString().startsWith('https')) {
          var tokenUriResponse = await fetch(tokenUri);
          if(tokenUriResponse.status == 200) {
             const tokenUriResponseData = await tokenUriResponse.json();
             title = tokenUriResponseData.name;
             description = tokenUriResponseData.description;
             thumbnail = tokenUriResponseData.image;
         } 
        }
      }

      //Opensea, Magic Eden, Rarible etc. are the famouse NFT marketplaces.
      //The NFTs maybe listed on one or more martkets.
      const externalUrl = 'https://opensea.io/assets/ethereum/' + tokenMetadata2.contract.address + '/' + tokenId;

      let result = {
        'contractAddress': tokenMetadata2.contract.address,
        'title': title,
        'description': description,
        'tokenId': tokenId,
        'symbol': '',
        'tokenType': tokenMetadata2.id.tokenMetadata.tokenType,
        'image': thumbnail,
        'format': format,
        'price': 0.0,
        'balance': tokenMetadata2.balance,
        'totalSupply': totalSupply,
        'walletAddress': walletAddress,
        'externalUrl': externalUrl,
        'error' : ''
      };
      console.log(result);
      nftsMetadata.push(result);
    }
   }
   var jsonResult = JSON.stringify(nftsMetadata, null, 2);
   return jsonResult;
}


function hex2dec(s) {

  function add(x, y) {
      var c = 0, r = [];
      var x = x.split('').map(Number);
      var y = y.split('').map(Number);
      while(x.length || y.length) {
          var s = (x.pop() || 0) + (y.pop() || 0) + c;
          r.unshift(s < 10 ? s : s - 10); 
          c = s < 10 ? 0 : 1;
      }
      if(c) r.unshift(c);
      return r.join('');
  }

  var dec = '0';
  s.split('').forEach(function(chr) {
      var n = parseInt(chr, 16);
      for(var t = 8; t; t >>= 1) {
          dec = add(dec, dec);
          if(n & t) dec = add(dec, '1');
      }
  });
  return dec;
}
