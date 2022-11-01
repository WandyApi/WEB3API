
import 'dart:async';
import 'dart:convert';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:flutter_demo/token_info.dart';
import 'package:bip39/bip39.dart' as bip39;

TokenInfo GST = new TokenInfo(
    'STEPN Green Satoshi Token',
    'GST',
    9,
    'https://s2.coinmarketcap.com/static/img/coins/64x64/16352.png',
    'AFbX8oGjGpmVFywbVouvhQSRmiW2aR1mohfahi4Y2AdB',
    0);

TokenInfo USDC = new TokenInfo(
    'USD Coin',
    'USDC',
    6,
    'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    0);

TokenInfo SOL = new TokenInfo(
    'Solana',
    'SOL',
    9,
    'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
    'SOL',
    0);

TokenInfo DOGE = new TokenInfo(
    'Dogecoin',
    'DOGE',
    8,
    'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
    '0xba2ae424d960c26247dd6c32edc70b295c744c43',
    0);

TokenInfo GMT = new TokenInfo(
'GMT',
'GMT',
8,
'https://s2.coinmarketcap.com/static/img/coins/64x64/18069.png',
'0x3019BF2a2eF8040C242C9a4c5c4BD4C81678b2A1',
0);

List networks = ['Solana', 'Binance', 'Ethereum', 'EthereumPoW'];
List solanaTokens = [GST, USDC, SOL];
List tokens = [solanaTokens];

String generateMnemonic(){
  return bip39.generateMnemonic();
}

Future<String> createWallet(int network, String mnemonic) async {
  String walletAddress = '';
  HttpsCallable request = FirebaseFunctions.instance.httpsCallable(
      'createWallet');
    final response = await request.call(<String, dynamic>{
      'network': network,
      'mnemonic': mnemonic,
  });

  final responseJson = json.decode(response.data);
  print('createWallet responseJson = $responseJson');

  String error = responseJson['error'].toString();
  if(error.isEmpty) {
    walletAddress = responseJson['address'].toString();
  }
  return walletAddress;
}

Future<double> getBalance(int network, String mnemonic, String tokenAddress) async {

  double balance = 0.0;
  HttpsCallable request = FirebaseFunctions.instance.httpsCallable(
      'getBalance');
  final response = await request.call(<String, dynamic>{
    'network': network,
    'mnemonic': mnemonic,
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