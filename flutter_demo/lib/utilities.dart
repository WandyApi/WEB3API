import 'dart:convert';
import 'dart:math';
import 'package:bip39/bip39.dart' as bip39;
import 'package:flutter_demo/api_calls.dart';
import 'package:flutter_demo/nft_info.dart';
import 'package:flutter_demo/token_info.dart';
import 'constants.dart';
import 'package:http/http.dart' as http;

String generateMnemonic(){
  return bip39.generateMnemonic();
}

Future<void> queryTokensBalance(int network, String walletAddress, String seedsPhrase) async {
  List<TokenInfo> tokenList = tokens[network];
  tokenList.forEach((tokenInfo) async {
    double balance = await getBalance(0, walletAddress, seedsPhrase, tokenInfo.tokenAddress);
    balance = balance / pow(10, tokenInfo.decimals);
    print('${tokenInfo.name} $balance');
  });
}

Future<String> transferToken(int network, String seedsPhrase) async {
     List tokenList = tokens[network];
     String toAddress = '';
     final error = await transfer(network, seedsPhrase, toAddress, tokenList[0], 100);
     return error;
}

Future<List<NFTInfo>> queryMyNFTs(int network) async {
  String walletAddress = '';
  List<NFTInfo> myNfts = await getNFTsByOwner(network, walletAddress);
  myNfts.forEach((nftInfo) {
    print('${nftInfo.title} ${nftInfo.contractAddress} ${nftInfo
        .tokenId} ${nftInfo.image}');
  });
  return myNfts;
}

  Future<String> transferANFT(int network, String seedsPhrase) async {
    String toAddress = '';
    NFTInfo nftInfo = NFTInfo('', '', '', '1', '', '', '0x', 0, 0, '');
    String error = await transferNFT(network, seedsPhrase, toAddress, nftInfo, 1);
    print(error);
    return error;
  }

//Query token price on Binance exchange
Future<void> queryTokenPrice(String tokenSymbol) async {
  Map<String, String> headers = {};
  headers['Accept'] = 'application/json';
  headers['Access-Control-Allow-Origin'] = '*';

  http.Response response = await http.get(
    Uri.http(
      'www.binance.com',
      '/api/v3/ticker/price',
      {
        'symbol': tokenSymbol + 'BUSD',
      },
    ),
    headers: headers,
  );

  final body = json.decode(response.body) as Map;
  double usdValue = double.parse(body['price']);
  print(tokenSymbol + ' ' + usdValue.toString());

}