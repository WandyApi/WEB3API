import 'dart:math';

import 'package:bip39/bip39.dart' as bip39;
import 'package:flutter_demo/api_calls.dart';
import 'package:flutter_demo/token_info.dart';

import 'constants.dart';

String generateMnemonic(){
  return bip39.generateMnemonic();
}

Future<void> queryTokensBalance(int network, String seedsPhrase) async {

   List tokenList = tokens[network];
   tokenList.forEach((tokenInfo) async {
     double balance = await getBalance(network, seedsPhrase, tokenInfo.tokenAddress);
     balance = await getBalance(0,seedsPhrase, SOL.tokenAddress);
     balance = balance / pow(10, tokenInfo.decimals);
   });

}