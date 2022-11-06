var Web3 = require('web3'); 
const Bip39 = require('bip39');
var Wallet = require('ethereumjs-wallet');
const BigNumber = require('bignumber.js');

const web3_bsc = new Web3('https://bsc-dataseed1.binance.org:443'); 
var fetch = require('node-fetch');

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
    const myAccount = web3_bsc.eth.accounts.privateKeyToAccount(myWallet.getPrivateKeyString());
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

      if(tokenAddress == 'BNB') {
        let balance =  await web3_bsc.eth.getBalance(walletAddress);

        let result = {
          'error': '',
          'tokenAddress': tokenAddress,
          'balance': balance
        };

        var jsonResult = JSON.stringify(result, null, 2);
        return jsonResult;

      } else {
        try {
        let contract = new web3_bsc.eth.Contract(minABI, tokenAddress);  
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
  
    const count = await web3_bsc.eth.getTransactionCount(fromAddress);
        
    var block =  await web3_bsc.eth.getBlock("latest");
    var gasLimit = block.gasLimit/block.transactions.length;
    const gasPrice = 6;
  
    if(tokenAddress == 'BNB') {
  
      const rawTransaction = {
        'to': toAddress, 
        'value': amount,
        "gasPrice": web3_bsc.utils.toWei(gasPrice.toString(), 'gwei'),
        "gasLimit": parseInt(gasLimit),
        'nonce': count
       };
  
       const signedTx = await web3_bsc.eth.accounts.signTransaction(rawTransaction, privateKey);
       try{
        const transaction =  await web3_bsc.eth.sendSignedTransaction(signedTx.rawTransaction);
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
      
      web3_bsc.eth.accounts.wallet.add(privateKey);
      var contract = new web3_bsc.eth.Contract(abiArray, tokenAddress, { from: fromAddress });
  
      var rawTransaction = {
        "from": fromAddress,
        "gasPrice": web3_bsc.utils.toWei(gasPrice.toString(), 'gwei'),
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
        return jsonResult;
      }
   }
  }


exports.getEstimateGasFee = async (req, res) => {
  let amount = Number(req.amount);
  let tokenAddress = req.tokenAddress;
  let fromAddress = req.fromAddress;
  let toAddress = req.toAddress;
  
  let estimateGasPrice = await web3_bsc.eth.getGasPrice();
  let estimateGasPriceGwei = web3_bsc.utils.fromWei(estimateGasPrice,'gwei');
  
  var block =  await web3_bsc.eth.getBlock("latest");
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
  var contract = new web3_bsc.eth.Contract(abiArray, tokenAddress, { from: fromAddress });
  let estimateGas =  await web3_bsc.eth.estimateGas({
    "value": BigNumber(amount),
    "data": contract.methods.transfer(toAddress, BigNumber(amount)).encodeABI(),
    "from": fromAddress,
    "to": toAddress
    });
  
    let result = {
        'error': '',
        'tokenAmount': amount,
        'tokenAddress': tokenAddress,
        'estimateGasFee': estimateGas * estimateGasPriceGwei,
        'estimateGasFeeLimit': estimateGasLimit * estimateGasPriceGwei
    };
  
    var jsonResult = JSON.stringify(result, null, 2);
    return jsonResult;
  
    } catch(error) {
  
      let result = {
        'error': error.message,
        'tokenAmount': amount,
        'tokenAddress': tokenAddress,
        'estimateGasFee': 6 * 21000,   //Estimated gas fee, unit: GWei https://academy.binance.com/en/glossary/gas-limit
        'estimateGasFeeLimit': 6 * 21000 * 2 //Double the gas fee
    };
  
      var jsonResult = JSON.stringify(result, null, 2);
      return jsonResult;
    }
  }


 exports.getNFTsByOwner = async (req, res) => {
  let walletAddress = req.walletAddress;

  var nftsMetadata = [];
  
  //The key has API limit and it is for testing purpose.
  //Please replace it with your own one

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'X-API-Key': 'yLCRFy4StwqVlYmNqK2poPayqrQkYP2U3AtZIw6a4MYzYi14bxHlp5Y1OgI2erxH'
    }
  };
  
  const response = await fetch('https://deep-index.moralis.io/api/v2/' + walletAddress + '/nft?chain=bsc&format=decimal', options)

  if(response.status == 200) {
    const tokenMetadata1 = await response.json();
    const totalCount = tokenMetadata1.total;
    for (let i = 0; i < totalCount; i++) {
      const tokenMetadata2 = tokenMetadata1.result[i];
      // console.log(tokenMetadata2);
      var name = tokenMetadata2.name;
      var fileType = '';
      var thumbnail = '';
      var externalUrl = '';
      var description = '';
      var totalSupply = '0';
      
      var metadata = tokenMetadata2.metadata;
      if(typeof metadata != 'undefined') {

          if(metadata != null) {

            const metadataJson = JSON.parse(metadata);
            // console.log(metadataJson);

            var fileMetadata = metadataJson.file_metadata;
            if(typeof fileMetadata != 'undefined') {
              fileType = metadataJson.file_metadata.FileType;
            }

            name = metadataJson.name;
            externalUrl = metadataJson.external_url;
            description = metadataJson.description;
            thumbnail = metadataJson.image;
            if(typeof thumbnail == 'undefined'){
              thumbnail = metadataJson.file;
            }
       }
      }

      if(thumbnail.toString().startsWith('ipfs')) {
        thumbnail = 'https://cloudflare-ipfs.com/' + thumbnail.toString().replace('://', '/');
      }

      let result = {
        'contractAddress': tokenMetadata2.token_address,
        'title': name,
        'description': description,
        'tokenId': tokenMetadata2.token_id,
        'symbol': tokenMetadata2.symbol,
        'tokenType': tokenMetadata2.contract_type,
        'image': thumbnail,
        'format': fileType,
        'price': 0.0,
        'balance': tokenMetadata2.amount,
        'totalSupply': totalSupply,
        'walletAddress': walletAddress,
        'externalUrl': externalUrl,
        'error' : ''
      };

      nftsMetadata.push(result);
      // console.log(result);
    }
  }

  var jsonResult = JSON.stringify(nftsMetadata, null, 2);
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
    
  
    const count = await web3_bsc.eth.getTransactionCount(fromAddress);
    var block =  await web3_bsc.eth.getBlock("latest");
    var gasLimit = block.gasLimit/block.transactions.length;
    const gasPrice = 6;
  
    web3_bsc.eth.accounts.wallet.add(privateKey);
    var contract = new web3_bsc.eth.Contract(NFT_ABI, tokenAddress, { from: fromAddress });
  
    var rawTransaction = {
      "from": fromAddress,
      "gasPrice": web3_bsc.utils.toWei(gasPrice.toString(), 'gwei'),
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
        console.log(jsonResult);
        return jsonResult;
    }  
  }
