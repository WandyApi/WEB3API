
import 'dart:async';
import 'dart:convert';
import 'dart:math';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:flutter_demo/token_info.dart';
import 'nft_info.dart';

//Generate a new wallet address by a new seedsPhrase
//Retrieve a existing wallet address by a existing seedsPhrase  - does not affect the assets
Future<String> createWallet(int network, String seedsPhrase) async {
  String walletAddress = '';
  HttpsCallable request = FirebaseFunctions.instance.httpsCallable(
      'createWallet');
    final response = await request.call(<String, dynamic>{
      'network': network,
      'mnemonic': seedsPhrase,
  });

  final responseJson = json.decode(response.data);
  print('createWallet responseJson = $responseJson');

  String error = responseJson['error'].toString();
  if(error.isEmpty) {
    walletAddress = responseJson['address'].toString();
  }
  return walletAddress;
}

Future<double> getBalance(int network, String walletAddress, String seedsPhrase, String tokenAddress) async {
  double balance = 0.0;
  HttpsCallable request = FirebaseFunctions.instance.httpsCallable(
      'getBalance');
  final response = await request.call(<String, dynamic>{
    'network': network,
    'mnemonic': seedsPhrase,
    'walletAddress': walletAddress,
    'tokenAddress':tokenAddress
  });

  final responseJson = json.decode(response.data);
  print('getBalance responseJson = $responseJson');

  String error = responseJson['error'].toString();
  if(error.isEmpty) {
    balance = double.parse(responseJson['balance'].toString());
  }
  return balance;
}

Future<String> transfer(int network, String seedsPhrase, String toAddress, TokenInfo tokenInfo, double amount) async {

    HttpsCallable request = FirebaseFunctions.instance.httpsCallable('transfer');
    final response = await request.call(<String, dynamic>{
      'network': network,
      'mnemonic': seedsPhrase,
      'toAddress': toAddress,
      'tokenAddress': tokenInfo.tokenAddress,
      'amount': (amount * pow(10, tokenInfo.decimals)).toInt()
    });
    final responseJson = json.decode(response.data);
    print('transfer responseJson = $responseJson');
    String error = responseJson['error'].toString();
    return error;
  }

Future<List<NFTInfo>> getNFTsByOwner(int network, String walletAddress) async {

  HttpsCallable request = FirebaseFunctions.instance.httpsCallable(
      'getNFTsByOwner');
  final response = await request.call(<String, dynamic>{
    'network': network,
    'walletAddress': walletAddress,
  });

  final List<dynamic> responseJson = json.decode(response.data);
  print('getNFTsByOwner responseJson = ${responseJson}');
  List<NFTInfo> nfts = [];
  for (var i = 0; i < responseJson.length; i++) {
    final nftItem = responseJson[i];

      NFTInfo nftInfo = new NFTInfo(
          nftItem['tokenType'].toString(),
          nftItem['title'].toString(),
          nftItem['description'].toString(),
          nftItem['tokenId'].toString(),
          nftItem['image'].toString(),
          nftItem['format'].toString(),
          nftItem['contractAddress'].toString(),
          0,
          double.parse(nftItem['balance']),
          nftItem['externalUrl'].toString());
          nfts.add(nftInfo);
  }
  return nfts;
}

Future<String> transferNFT(int network, String seedsPhrase, String toAddress, NFTInfo nftInfo, double amount) async {

  print('transferNFT  = $toAddress ${nftInfo.contractAddress} ${nftInfo.tokenId}');

  HttpsCallable request = FirebaseFunctions.instance.httpsCallable('transferNFT');

  final response = await request.call(<String, dynamic>{
    'network': network,
    'mnemonic': seedsPhrase,
    'toAddress': toAddress,
    'tokenAddress': nftInfo.contractAddress,
    'tokenId': nftInfo.tokenId,
    'amount': amount
  });

  final responseJson = json.decode(response.data);
  print('transferNFT responseJson = $responseJson');

  String error = responseJson['error'].toString();
  return error;

}
