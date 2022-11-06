import 'dart:convert';
import 'dart:math';
import 'package:bip39/bip39.dart' as bip39;
import 'package:flutter/foundation.dart';
import 'package:flutter_demo/api_calls.dart';
import 'package:flutter_demo/nft_info.dart';
import 'package:flutter_demo/token_info.dart';
import 'constants.dart';
import 'package:http/http.dart' as http;


class Utilities {

  String generateMnemonic() {
    return bip39.generateMnemonic();
  }

  Future<void> queryTokensBalance(int network, String walletAddress) async {
    List<TokenInfo> tokenList = Constants.tokens[network];

    tokenList.forEach((tokenInfo) async {
      double balance = await ApiCalls().getBalance(
          network, walletAddress, tokenInfo.tokenAddress);
      balance = balance / pow(10, tokenInfo.decimals);
      if (kDebugMode) {
        print('${Constants.networks[network]} ${tokenInfo.symbol} : $balance');
      }
    });
  }

  Future<String> transferToken(int network, String seedsPhrase, int id,
      String toAddress) async {
    List tokenList = Constants.tokens[network];
    final result = await ApiCalls().transfer(
        network, seedsPhrase, toAddress, tokenList[id], 100);
    if (kDebugMode) {
      print(result);
    }
    return result;
  }

  Future<List<NFTInfo>> queryNFTs(int network, String walletAddress) async {
    List<NFTInfo> nfts = await ApiCalls().getNFTsByOwner(
        network, walletAddress);
    for (var nftInfo in nfts) {
      if (kDebugMode) {
        print('${nftInfo.contractAddress}, ${nftInfo.title}, ${nftInfo.tokenId}, ${nftInfo.image}, ${nftInfo.externalUrl}');
      }
    }
    return nfts;
  }

  Future<String> transferNFT(int network, NFTInfo nftInfo, String seedsPhrase,
      String toAddress) async {
    String toAddress = '';
    String result = await ApiCalls().transferNFT(
        network, seedsPhrase, toAddress, nftInfo, 1);
    if (kDebugMode) {
      print(result);
    }
    return result;
  }

//Query token price of Binance exchange
  Future<void> queryTokenPrice(String tokenSymbol) async {
    Map<String, String> headers = {};
    headers['Accept'] = 'application/json';
    headers['Access-Control-Allow-Origin'] = '*';

    http.Response response = await http.get(
      Uri.http(
        'www.binance.com',
        '/api/v3/ticker/price',
        {
          'symbol': '${tokenSymbol}BUSD',
        },
      ),
      headers: headers,
    );

    final body = json.decode(response.body) as Map;
    double usdValue = double.parse(body['price']);
    if (kDebugMode) {
      print('$tokenSymbol $usdValue');
    }
  }

}