var Web3 = require('web3'); 
const Bip39 = require('bip39');
var Wallet = require('ethereumjs-wallet');
const BigNumber = require('bignumber.js');
var fetch = require('node-fetch');
const https = require("https");
require('dotenv').config();
const { RPC_API_KEY_ETHEREUMPOW} = process.env;

//EthereumPoW RPC Endpoint
//The key has API calls limit and it is for testing purpose.
//Please replace it with your own one from nodereal.io
const web3_eth = new Web3(new Web3.providers.HttpProvider('https://ethw-mainnet.nodereal.io/v1/' + RPC_API_KEY_ETHEREUMPOW));

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

// async function getBalance (walletAddress, tokenAddress)  {
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

      if(tokenAddress == 'ETHW') {
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

// async function transfer (mnemonic, toAddress, tokenAddress, amount)  {
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
  
    if(tokenAddress == 'ETHW') {
  
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
        console.log(jsonResult);
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
        console.log(jsonResult);
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
        console.log(jsonResult);
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
        console.log(jsonResult);
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
        'tokenAmount': amount,
        'estimateGasFee': estimateGas * estimateGasPriceEther,
        'estimateGasFeeLimit': estimateGasLimit * estimateGasPriceEther
    };
  
    var jsonResult = JSON.stringify(result, null, 2);
    console.log(jsonResult);
    return jsonResult;
  
    } catch(error) {
  
      let result = {
        'error': error.message,
        'tokenAmount': amount,
        'estimateGasFee': 21000 * estimateGasPriceEther ,
        'estimateGasFeeLimit': 21000 * 2 * estimateGasPriceEther
    };
  
      var jsonResult = JSON.stringify(result, null, 2);
      return jsonResult;
    }
  }


  async function getNFT(walletAddress, tokenAddress) {
    // let walletAddress = req.walletAddress;
    // let tokenAddress = req.tokenAddress;
 
    const contract = new web3_eth.eth.Contract(NFT_ABI, tokenAddress);
    const tokensBalance = await contract.methods.balanceOf(walletAddress).call();
    var nftsMetadata = [];

   for (let i = 0; i < tokensBalance; i++) {
     const tokenId = await contract.methods.tokenOfOwnerByIndex(walletAddress, i).call();
    //  console.log(tokenId);
     let tokenMetadataURI = await contract.methods.tokenURI(tokenId).call(); 

     const options = {
      agent: new https.Agent({
        rejectUnauthorized: false
      })
    };

    //Nuwton, YayaSea, Nswap, Openwnft etc. are the marketplaces for EthereumPow.
    const externalUrl = 'https://nuwton.io/asset/EthereumPow/' + tokenAddress + '/' + tokenId;

    if(tokenMetadataURI.startsWith('https')) {
     const tokenMetadataResponse = await fetch(tokenMetadataURI, options);
 
     if(tokenMetadataResponse.status == 200) {
       const tokenMetadata = await tokenMetadataResponse.json();
       let result = {
         'error': '',
         'contractAddress': tokenAddress,
         'title': tokenMetadata.name,
         'description': '',
         'symbol': '',
         'tokenType': 'ERC-721',
         'tokenId': tokenId,
         'image': tokenMetadata.image,
         'format': '',
         'price': 0,
         'balance': '1',
         'totalSupply': '0',
         'walletAddress': walletAddress,
         'externalUrl': externalUrl
       };
 
       nftsMetadata.push(result);
      //  console.log(result);
      }
    }

    if(tokenMetadataURI.startsWith('data:application/json;base64')) {
      
      var tokenData = tokenMetadataURI.replace('data:application/json;base64,', '');
      let tokenBuff = new Buffer(tokenData, 'base64');
      let tokenText = tokenBuff.toString('ascii');

      const tokenJson = JSON.parse(tokenText);
      var nftImageURI = tokenJson.image;

      if(nftImageURI.startsWith('data:image/svg+xml;base64')) {
        var nftImageData = nftImageURI.replace('data:image/svg+xml;base64,', '');
        let nftImageBuff = new Buffer(nftImageData, 'base64');
        nftImageURI = nftImageBuff.toString('ascii');
      }

      let result = {
        'error': '',
        'contractAddress': tokenAddress,
        'title': tokenJson.name,
        'description': '',
        'symbol': '',
        'tokenType': 'ERC-721',
        'tokenId': tokenId,
        'image': nftImageURI,
        'format': '',
        'price': 0.0,
        'balance': '1',
        'totalSupply': '0',
        'walletAddress': walletAddress,
        'externalUrl': externalUrl
      };

      nftsMetadata.push(result);

    }

   }
   return nftsMetadata;
 }


//  async function getNFTsByOwner(walletAddress) {
exports.getNFTsByOwner = async (req, res) => {
  let walletAddress = req.walletAddress;
  
  //Tops NFTs on EthereumPow
  //You can add more manually

  var nftProjectList = [
    '0x650c3cf4fae84c3a23a1d6f11712734efadbef5d', //Beatles
    '0xfadee01b8606639c64d09adc6c58da5e547f793f', //Moon Ape POW Club
    '0xf6eac0712c52433451a6bbcf0ef576fa7e44bce1', //TWIT
    '0xe48b4261dcd213603bb4a6b85e200c54510caf50', //UNIW PUNKS
    '0xd63933bf55cdc0e39950ddb86cb23ad10e76a96d', //Dogetwit for Web3 fans
    '0x5afefbf75772bb15af45b9dbca8402f3374062b3', //The Wolf of Wall Street
    '0x1f89caaf0ef85ad329d7cc7945ec208931b1b19c', //Power Man NFT
    '0x60e4d786628fea6478f785a6d7e704777c86a7c6', //MutantApeYachtClub
    '0x9f09dcb4ddc557c1ac2c02062a415a27860afb80', //OpenTigers
    '0x9feb3ab8a40b620b68a112ea0f82c6cf06b5c6fb', //WENS.ETHW
    '0x9e32b72f8c8c97d1c2fab030ad83b65a74516a80', //WENS.AWSB
    '0x9368bf5771d4dc15d3cc4fea0b04a5ce9884b2ef'  //Black Cat Web3 Developer Club
];

  var nftsMetadata = [];

  for (let i = 0; i < nftProjectList.length; i++) {
     const tokenAddress = nftProjectList[i];
     const data = await getNFT(walletAddress, tokenAddress);
     for(var j = 0; j < data.length ; j++) {
      nftsMetadata.push(data[j]);
     }
  }

  var jsonResult = JSON.stringify(nftsMetadata, null, 2);
  console.log(jsonResult);
  return jsonResult;

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
