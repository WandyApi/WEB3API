const solanaWeb3 = require('@solana/web3.js')
const bip39 = require('bip39')
const splToken = require("@solana/spl-token")
const ed25519 = require('ed25519-hd-key');
const fetch = require('node-fetch');
require('dotenv').config();
const { RPC_API_KEY_SOLANA, NFT_API_KEY_SOLANA } = process.env;

//Solana RPC by 3rd parties like alchemy.com, quicknode.com
//The key has API calls limit and it is for testing purpose.
//Please replace it with your own one from alchemy.com
// const connection = new solanaWeb3.Connection('https://solana-mainnet.g.alchemy.com/v2/' + RPC_API_KEY_SOLANA +'/');

//Solana RPC by Solana.com
const connection = new solanaWeb3.Connection('https://api.mainnet-beta.solana.com');

// async function createWallet(mnemonic){
exports.createWallet = (req, res) => {
    let mnemonic = req.mnemonic;
    const seedPhrase = bip39.mnemonicToSeedSync(mnemonic, "") 
    const index = 0; 
    const derivedPath = "m/44'/501'/" + index + "'/0'";
    const derivedSeed = ed25519.derivePath(derivedPath, seedPhrase.toString('hex')).key;
    const keypair = solanaWeb3.Keypair.fromSeed(derivedSeed);

    let result = {
        'error': '',
        'address': keypair.publicKey.toString()
      };

      var jsonResult = JSON.stringify(result, null, 2);
      // console.log(jsonResult);
      return jsonResult;
}

exports.getBalance = async (req, res) => {
  // async function getBalance (walletAddress, tokenAddress) {
    const walletAddress = req.walletAddress;
    const tokenAddress = req.tokenAddress;
  
    //get SPL Token Balance
    const tokenAccounts = await connection.getTokenAccountsByOwner(
        new solanaWeb3.PublicKey(walletAddress),
        {
            programId: splToken.TOKEN_PROGRAM_ID,
        }
    )
  
    var result = {
      'error': '',
      'tokenAddress': tokenAddress,
      'balance': 0
    };
  
    tokenAccounts.value.forEach((e) => {
        const accountInfo = splToken.AccountLayout.decode(e.account.data);
        let tokenAddress2 = new solanaWeb3.PublicKey(accountInfo.mint);
        let tokenAmount = accountInfo.amount;
  
        // console.log(tokenAddress2 + ' ' + tokenAmount);
  
        if(tokenAddress == tokenAddress2) {
          result = {
            'error': '',
            'tokenAddress': tokenAddress,
            'balance': Number(tokenAmount)
          };
        }
    })
    
  
    //get SOL Balance
    if(tokenAddress == 'SOL') {
    try {
      const solBalance = await connection.getBalance( new solanaWeb3.PublicKey(walletAddress)); 
      result = {
        'error': '',
        'tokenAddress': 'SOL',
        'balance': Number(solBalance)
      };
      } catch (error) {
      }
    }
  
    var jsonResult = JSON.stringify(result, null, 2);
    console.log(jsonResult);
  
    return jsonResult
  }

// async function transfer(mnemonic, tokenAddress, toAddress, amount){   
exports.transfer = async (req, res) => {
    var mnemonic = req.mnemonic;
    const tokenAddress = req.tokenAddress;
    const amount = req.amount;
    var toAddress = req.toAddress;
        
    const seedPhrase = bip39.mnemonicToSeedSync(mnemonic, "") 
    const index = 0; 
    const derivedPath = "m/44'/501'/" + index + "'/0'";
    const derivedSeed = ed25519.derivePath(derivedPath, seedPhrase.toString('hex')).key;
    const payerKeypair = solanaWeb3.Keypair.fromSeed(derivedSeed);

    if(tokenAddress.toLocaleUpperCase() == 'SOL') {
        const toAddress2 = new solanaWeb3.PublicKey(toAddress)
        const transaction = new solanaWeb3.Transaction().add(
            solanaWeb3.SystemProgram.transfer({
              fromPubkey: payerKeypair.publicKey,
              toPubkey: toAddress2,
              lamports: amount,
            }),
          );

          try {
            const signature = await solanaWeb3.sendAndConfirmTransaction(
                connection,
                transaction,
                [payerKeypair],
            );

            let result = {
                'error': '',
                'transactionHash': signature.toString(),
                'tokenAddress': tokenAddress,
                'fromAddress': payerKeypair.publicKey,
                'toAddress': toAddress,
                'amount': amount,
                'gasPrice': 0,
                'gasUsed': 0,
                'gasFee': 5000  //Estimate Gas Fee, Unit: SOL
              };

              var jsonResult = JSON.stringify(result, null, 2);
              return jsonResult;

          } catch (error) {
            let result = {
                'error': error.message,
                'transactionHash': '',
                'tokenAddress': tokenAddress,
                'fromAddress': payerKeypair.publicKey,
                'toAddress': toAddress,
                'amount': amount,
                'gasPrice': 0,
                'gasUsed': 0,
                'gasFee': 0
              };

              var jsonResult = JSON.stringify(result, null, 2);
              return jsonResult;
        }
    }

    const tokenAddress2 = new solanaWeb3.PublicKey(tokenAddress);
    const payerAccount = await splToken.getOrCreateAssociatedTokenAccount(
        connection,
        payerKeypair,
        tokenAddress2,
        payerKeypair.publicKey
    );

    const toAddress2 = new solanaWeb3.PublicKey(toAddress)

    const recipientAccount = await splToken.getOrCreateAssociatedTokenAccount(
        connection,
        payerKeypair,
        tokenAddress2,
        toAddress2
    )

    try {
        const transferTransaction = await splToken.transfer(
            connection,
            payerKeypair,
            payerAccount.address,
            recipientAccount.address,
            payerKeypair.publicKey,
            amount
        );

          let result = {
            'error': '',
            'transactionHash': transferTransaction.toString(),
            'tokenAddress': tokenAddress,
            'fromAddress': payerKeypair.publicKey,
            'toAddress': toAddress,
            'amount': amount,
            'gasPrice': 0,
            'gasUsed': 0,
            'gasFee': 5000  //SOL
          };

          var jsonResult = JSON.stringify(result, null, 2);
          console.log(jsonResult);
          return jsonResult;

    } catch (error) {

        let result = {
            'error': error.message,
            'transactionHash': '',
            'tokenAddress': tokenAddress,
            'fromAddress': payerKeypair.publicKey,
            'toAddress': toAddress,
            'amount': amount,
            'gasPrice': 0,
            'gasUsed': 0,
            'gasFee': 0
          };

          var jsonResult = JSON.stringify(result, null, 2);
          console.log(jsonResult);
          return jsonResult;
    }
}

//Solana gas has been fixed and low for a long time, normally 0.000005 SOL per signature and most of time less than 0.000008SOL.
exports.getEstimateGasFee = async (req, res) => {

    let amount = Number(req.amount);

    let tokenAddress = req.tokenAddress;
    let fromAddress = req.fromAddress;
    let toAddress = req.toAddress;

    let result = {
        'error': '',
        'tokenAddress': tokenAddress,
        'tokenAmount': amount,
        'estimateGasFee': 5000,  //Estimated gas fee, unit: SOL 
        'estimateGasFeeLimit': 8000, //Estimated gas limit, unit: SOL 
        'fundingRecipient' : 2039280 //If recipient's associated token account does not exist, the sender needs to fund the recipient when you send SPL token.  unit: SOL
      };

      var jsonResult = JSON.stringify(result, null, 2);
    
      return jsonResult;
}

// async function getNFTsByOwner(walletAddress){   
exports.getNFTsByOwner = async (req, res) => {

    const walletAddress = req.walletAddress;

    //The key has API calls limit and it is for testing purpose.
    //Please replace it with your own one from moralis.io
    const url = 'https://solana-gateway.moralis.io/account/mainnet/' + walletAddress + '/nft';
    const options = {
        method: 'GET',
            headers: {
            Accept: 'application/json',
            'X-API-Key': NFT_API_KEY_SOLANA
        }
    };


    const response = await fetch(url, options);
    var jsonArrayString = new Array();

    if(response.status == 200) {
        const tokenMetadata1 = await response.json();
        // console.log(tokenMetadata1);
        const totalCount = tokenMetadata1.length;
        for (let i = 0; i < totalCount; i++) {
          const mintAddress = tokenMetadata1[i].mint;
          let result = await getNFTMetadata(walletAddress, mintAddress);
        //   console.log(result);
          jsonArrayString.push(result);
        }
    }

    var jsonResult = JSON.stringify(jsonArrayString, null, 2);
    return jsonResult;
}


async function getNFTMetadata(walletAddress, mintAddress){
    
    //The key has API calls limit and it is for testing purpose.
    //Please replace it with your own one from moralis.io
    const url = 'https://solana-gateway.moralis.io/nft/mainnet/' + mintAddress + '/metadata';
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-API-Key': NFT_API_KEY_SOLANA
      }
    };
    
    var result = {};
    const response = await fetch(url, options); 

    if(response.status == 200) {
        const tokenMetadata1 = await response.json();

        var name = tokenMetadata1.name;
        const standard = tokenMetadata1.standard;
        var symbol = tokenMetadata1.symbol;
        const metadataUri = tokenMetadata1.metaplex.metadataUri;
        const metadataResponse = await fetch(metadataUri); 
        var totalSupply = '0';

        if(metadataResponse.status == 200) {
            const tokenMetadata2 = await metadataResponse.json();
            var name = tokenMetadata2.name;
            var symbol = tokenMetadata2.symbol;
            var description = tokenMetadata2.description;
            var image = tokenMetadata2.image;
            var external_url = tokenMetadata2.external_url;

            //Opensea, Magic Eden etc. are the famouse NFT marketplaces.
            //The NFTs maybe listed on one or more martkets.

            if(typeof external_url != 'undefined') {
                if(!external_url.includes('opensea.io')) {
                    external_url = 'https://opensea.io/assets/solana/' + mintAddress;
                }
            }

            result = {
                'contractAddress': mintAddress,
                'title': name,
                'description': description,
                'tokenId': '',
                'symbol': symbol,
                'tokenType': standard,
                'image': image,
                'format': '',
                'price': 0.0,
                'balance': '1',
                'totalSupply': totalSupply,
                'walletAddress': walletAddress,
                'externalUrl': external_url,
                'error' : ''
              };
        } else {
            result = {
                'contractAddress': mintAddress,
                'title': '',
                'description': '',
                'tokenId': '',
                'symbol': '',
                'tokenType': '',
                'image': '',
                'format': '',
                'price': 0.0,
                'balance': '1',
                'totalSupply': totalSupply,
                'walletAddress': walletAddress,
                'externalUrl': '',
                'error' : metadataResponse.status + ' ' + metadataResponse.statusText
              };
        }
    }

    return result;
}

// async function transferNFT(mnemonic, toAddress, tokenAddress, tokenId, amount){
exports.transferNFT = async (req, res) => {
    var mnemonic = req.mnemonic;
    const tokenAddress = req.tokenAddress;
    const tokenId = req.tokenId;
    var toAddress = req.toAddress;
    const amount = req.amount;
        
    const seedPhrase = bip39.mnemonicToSeedSync(mnemonic, "") 
    const index = 0; 
    const derivedPath = "m/44'/501'/" + index + "'/0'";
    const derivedSeed = ed25519.derivePath(derivedPath, seedPhrase.toString('hex')).key;
    const payerKeypair = solanaWeb3.Keypair.fromSeed(derivedSeed);

    const tokenAddress2 = new solanaWeb3.PublicKey(tokenAddress);
    const payerAccount = await splToken.getOrCreateAssociatedTokenAccount(
        connection,
        payerKeypair,
        tokenAddress2,
        payerKeypair.publicKey
    );

    const toAddress2 = new solanaWeb3.PublicKey(toAddress)

    const recipientAccount = await splToken.getOrCreateAssociatedTokenAccount(
        connection,
        payerKeypair,
        tokenAddress2,
        toAddress2
    )

    try {
        const transferTransaction = await splToken.transfer(
            connection,
            payerKeypair,
            payerAccount.address,
            recipientAccount.address,
            payerKeypair.publicKey,
            1
        );


          let result = {
            'error': '',
            'transactionHash': transferTransaction.toString(),
            'tokenAddress': tokenAddress,
            'fromAddress': payerKeypair.publicKey,
            'toAddress': toAddress,
            'tokenId': tokenId,
            'amount': amount,
            'gasPrice': 0,
            'gasUsed': 0,
            'gasFee': 5000  //SOL
          };

          var jsonResult = JSON.stringify(result, null, 2);
        //   console.log(jsonResult);
          return jsonResult;

    } catch (error) {

        let result = {
            'error': error.message,
            'transactionHash': '',
            'tokenAddress': tokenAddress,
            'fromAddress': payerKeypair.publicKey,
            'toAddress': toAddress,
            'tokenId': tokenId,
            'amount': amount,
            'gasPrice': 0,
            'gasUsed': 0,
            'gasFee': 0
          };

          var jsonResult = JSON.stringify(result, null, 2);
        //   console.log(jsonResult);
          return jsonResult;
    }
}

//get all the tokens balance of an address, inlcude coins & nfts
async function getTokensBalance (walletAddress) {

  //get SPL Tokens Balance
  const tokenAccounts = await connection.getTokenAccountsByOwner(
      new solanaWeb3.PublicKey(walletAddress),
      {
          programId: splToken.TOKEN_PROGRAM_ID,
      }
  )

  var results = [];

  tokenAccounts.value.forEach((e) => {
      const accountInfo = splToken.AccountLayout.decode(e.account.data);
      let tokenAddress = new solanaWeb3.PublicKey(accountInfo.mint);
      let tokenAmount = accountInfo.amount;

      // console.log(tokenAddress + ' ' + tokenAmount);

      let result = {
        'error': '',
        'tokenAddress': tokenAddress,
        'balance': Number(tokenAmount)
      };

      results.push(result);

  })
  
  //get SOL Balance
  try {
    const solBalance = await connection.getBalance( new solanaWeb3.PublicKey(walletAddress)); 
    let solResult = {
      'error': '',
      'tokenAddress': 'SOL',
      'balance': Number(solBalance)
    };
    results.push(solResult);
  }  catch (error) {
    let solResult = {
      'error': '',
      'tokenAddress': 'SOL',
      'balance': 0
    };
    results.push(solResult);
  }

  var jsonResult = JSON.stringify(results, null, 2);
  console.log(jsonResult);

  return jsonResult
}
