
// Flutter Demo of https://www.WandyApi.xyz
// For Web3 Api & Demo supports and more, please join Black Cat Web3 Developer Club

import 'dart:convert';
import 'dart:math';
import 'package:bip39/bip39.dart' as bip39;
import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_demo/api_calls.dart';
import 'package:flutter_demo/nft_info.dart';
import 'package:flutter_demo/token_info.dart';
import 'constants.dart';
import 'package:http/http.dart' as http;

class Utilities {

  String generateMnemonic() {
    return bip39.generateMnemonic();
  }

  Future<List<TokenInfo>> queryTokensBalance(int network, String walletAddress) async {
    List<TokenInfo> tokenList = Constants.tokens[network];

    for(var i = 0; i < tokenList.length; i ++) {

      double balance = await ApiCalls().getBalance(
          network, walletAddress, tokenList[i].tokenAddress);
      balance = balance / pow(10, tokenList[i].decimals);
      if (kDebugMode) {
        print('${Constants.networks[network]} ${tokenList[i].symbol} : $balance');
      }
      tokenList[i].balance = balance;
    };

    return tokenList;
  }

  Future<List<NFTInfo>> queryNFTs(int network, String walletAddress) async {
    List<NFTInfo> nfts = await ApiCalls().getNFTsByOwner(
        network, walletAddress);
    for (var nftInfo in nfts) {
      if (kDebugMode) {
        print('${nftInfo.contractAddress}, ${nftInfo.title}, ${nftInfo.tokenId}');
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
  Future<double> queryTokenPrice(String tokenSymbol) async {
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
    double usdValue = 0;

    if(body['price'] != null) {
      usdValue = double.parse(body['price']);
      if (kDebugMode) {
        print('$tokenSymbol $usdValue');
      }
    }
    return usdValue;
  }

  //Query token list from coinmarketcap.com/api/
  Future<double> queryTokenList() async {

    Map<String, String> headers = {};
    headers['Accept'] = 'application/json';
    headers['X-CMC_PRO_API_KEY'] = 'ca3f0c0a-492b-4f75-817d-1055b1266ff2';

    http.Response response = await http.get(
      Uri.http(
        'sandbox-api.coinmarketcap.com',
        '/v1/cryptocurrency/listings/latest',
        {
          'start': '1',
          'limit': '5000',
          'convert': 'USD',
        },
      ),
      headers: headers,
    );

    final body = json.decode(response.body);

    print(body['data']);
    double usdValue = 0;
    return usdValue;
  }

  void showLoadingDialog(BuildContext context) async {

    showDialog(

        barrierDismissible: false,
        context: context,
        builder: (_) {
          return Dialog(
            // The background color
            backgroundColor: Colors.white,
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 20),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: const [
                  // The loading indicator
                  CircularProgressIndicator(),
                  SizedBox(
                    height: 15,
                  ),
                  // Some text
                  Text('Loading...')
                ],
              ),
            ),
          );
        });
  }
}