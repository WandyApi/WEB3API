const functions = require("firebase-functions");
const admin = require('firebase-admin');
const solana = require('./solana')
admin.initializeApp(functions.config().firebase);

//WandyAPI
exports.createWallet = functions.https.onCall(async (req, res) => {
  
  let result = {
    'error': 'Network not found',
    'address': ''
  };
  var jsonResult = JSON.stringify(result, null, 2);

  if(req.network == 0) {
       jsonResult = await solana.createWallet(req, res);
    }
    
    // if(req.network == 1) {
    //     jsonResult = await binance.createWallet(req, res);
    // }

    // if(req.network == 2) {
    //     jsonResult = await eth.createWallet(req, res);
    // }

    // if(req.network == 3) {
    //     jsonResult = await ethw.createWallet(req, res);
    // }

    return jsonResult;
})

exports.getBalance = functions.https.onCall(async (req, res) => {

  let result = {
    'error': 'Network not found',
    'balance': 0
 };

 var jsonResult = JSON.stringify(result, null, 2);

  if(req.network == 0) {
    jsonResult = await solana.getBalance(req, res);
  }
  // if(req.network == 1) {
  //     jsonResult = await binance.getBalance(req, res);
  // }
  // if(req.network == 2) {
  //     jsonResult = await eth.getBalance(req, res);
  // }
  // if(req.network == 3) {
  //     jsonResult = await ethw.getBalance(req, res);
  // }

   return jsonResult;
})


exports.transfer = functions.https.onCall(async (req, res) => {

  let result = {
      'error': 'Network not found',
      'transactionHash': '',
      'tokenAddress': '',
      'fromAddress': '',
      'toAddress': '',
      'amount': 0,
      'gasFee': 0  
    };

  var jsonResult = JSON.stringify(result, null, 2);

  if(req.network == 0) {
      jsonResult = await solana.transfer(req, res)
  }

  // if(req.network == 1) {
  //     jsonResult = await binance.transfer(req, res)
  // }

  // if(req.network == 2) {
  //     jsonResult = await eth.transfer(req, res)
  // }

  // if(req.network == 3) {
  //   jsonResult = await ethw.transfer(req, res)
  // }

  return jsonResult;
})


exports.getNFTsByOwner = functions.https.onCall(async (req, res) => {
  
  const result = {
    'contractAddress': '',
    'title': '',
    'description': '',
    'tokenId': '',
    'symbol': '',
    'tokenType': '',
    'image': '',
    'format': '',
    'price': 0.0,
    'balance': '0',
    'walletAddress': req.walletAddress,
    'externalUrl': '',
    'error': 'Network not found'
  };

  var jsonResult = JSON.stringify(result, null, 2);

  if(req.network == 0) {
    jsonResult = await solana.getNFTsByOwner(req, res)
  }

  // if(req.network == 1) {
  //    jsonResult = await binance.getNFTsByOwner(req, res)
  // }

  // if(req.network == 2) {
  //    jsonResult = await eth.getNFTsByOwner(req, res)
  // }

  // if(req.network == 3) {
  //   jsonResult = await ethw.getNFTsByOwner(req, res)
  // }

  return jsonResult;
})

exports.transferNFT = functions.https.onCall(async (req, res) => {

  let result = {
      'error': 'Network not found',
      'transactionHash': '',
      'tokenAddress': '',
      'fromAddress': '',
      'toAddress': '',
      'amount': 0,
      'gasFee': 0  
    };
    
  var jsonResult = JSON.stringify(result, null, 2);

  if(req.network == 0) {
      jsonResult = await solana.transferNFT(req, res)
  }

  // if(req.network == 1) {
  //     jsonResult = await binance.transferNFT(req, res)
  // }

  // if(req.network == 2) {
  //     jsonResult = await eth.transferNFT(req, res)
  // }

  // if(req.network == 3) {
  //   jsonResult = await ethw.transferNFT(req, res)
  // }

  return jsonResult;
})