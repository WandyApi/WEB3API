
import 'dart:async';
import 'dart:convert';
import 'package:cloud_functions/cloud_functions.dart';

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