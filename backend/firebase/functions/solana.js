const solanaWeb3 = require('@solana/web3.js')
const bip39 = require('bip39')
const splToken = require("@solana/spl-token")
const ed25519 = require('ed25519-hd-key');
const fetch = require('node-fetch');

//Solana RPC Endpoint
//The key has API limit and it is for testing purpose.
//Please replace it with your own one
const connection = new solanaWeb3.Connection('https://solana-mainnet.g.alchemy.com/v2/c81BWjjN6wrvFck9JSQ7_ackwgScBjG4/');

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
    const mnemonic = req.mnemonic;
    const tokenAddress = req.tokenAddress;
    const seedPhrase = bip39.mnemonicToSeedSync(mnemonic, "")         
    const index = 0; 
    const derivedPath = "m/44'/501'/" + index + "'/0'";
    const derivedSeed = ed25519.derivePath(derivedPath, seedPhrase.toString('hex')).key;
    const payerKeypair = solanaWeb3.Keypair.fromSeed(derivedSeed);

    if(tokenAddress.toLocaleUpperCase() == 'SOL') {
        const balance = await connection.getBalance(payerKeypair.publicKey);

        let result = {
            'error': '',
            'balance': Number(balance)
          };

          var jsonResult = JSON.stringify(result, null, 2);
          return jsonResult;

    } else {
        try {
            const tokenAddress2 = new solanaWeb3.PublicKey(tokenAddress)
            const payerAccount = await splToken.getOrCreateAssociatedTokenAccount( 
                connection,
                payerKeypair,
                tokenAddress2,
                payerKeypair.publicKey
            );
            const balance = payerAccount.amount;

            let result = {
                'error': '',
                'balance': Number(balance)
              };

              var jsonResult = JSON.stringify(result, null, 2);
              return jsonResult;

        } catch (error){
              let result = {
                'error': error.message,
                'balance': 0
              };

              var jsonResult = JSON.stringify(result, null, 2);
              return jsonResult;
        }
   }
}

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
                'gasFee': 5000  //SOL
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

exports.getEstimateGasFee = async (req, res) => {

    let amount = Number(req.amount);

    let tokenAddress = req.tokenAddress;
    let fromAddress = req.fromAddress;
    let toAddress = req.toAddress;

    let result = {
        'error': '',
        'tokenAmount': amount,
        'estimateGasPrice': 0,
        'estimateGasPriceGwei': 0,
        'estimateGas': 0,
        'estimateGasLimit': 0,
        'estimateGasFee': 5000,
        'estimateGasFeeLimit': 5000
      };

      var jsonResult = JSON.stringify(result, null, 2);
    
      return jsonResult;
}

// async function getNFTsByOwner(walletAddress){   
exports.getNFTsByOwner = async (req, res) => {

    const walletAddress = req.walletAddress;

    //The key has API limit and it is for testing purpose.
    //Please replace it with your own one
    const url = 'https://solana-gateway.moralis.io/account/mainnet/' + walletAddress + '/nft';
    const options = {
        method: 'GET',
            headers: {
            Accept: 'application/json',
            'X-API-Key': 'yLCRFy4StwqVlYmNqK2poPayqrQkYP2U3AtZIw6a4MYzYi14bxHlp5Y1OgI2erxH'
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
    
    //The key has API limit and it is for testing purpose.
    //Please replace it with your own one
    const url = 'https://solana-gateway.moralis.io/nft/mainnet/' + mintAddress + '/metadata';
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-API-Key': 'yLCRFy4StwqVlYmNqK2poPayqrQkYP2U3AtZIw6a4MYzYi14bxHlp5Y1OgI2erxH'
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

        if(metadataResponse.status == 200) {
            const tokenMetadata2 = await metadataResponse.json();
            var name = tokenMetadata2.name;
            var symbol = tokenMetadata2.symbol;
            var description = tokenMetadata2.description;
            var image = tokenMetadata2.image;
            var external_url = tokenMetadata2.external_url;

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
