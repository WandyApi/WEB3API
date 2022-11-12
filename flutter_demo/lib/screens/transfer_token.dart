// Flutter Demo of https://www.WandyApi.xyz
// For Web3 Api & Demo supports and more, please join Black Cat Web3 Developer Club

import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_demo/constants.dart';
import 'package:flutter_demo/token_info.dart';

import '../api_calls.dart';
import '../utilities.dart';

class TransferTokenScreen extends StatefulWidget {
  static const String id = "/transfer_token";

  @override
  _TransferTokenScreenState createState() => _TransferTokenScreenState();
}

class _TransferTokenScreenState extends State<TransferTokenScreen> {

  //NOTE - You CAN NOT transfer coins of A network to B network

  //A sample of sending DOGE coin - Binance network
  String hash1 = '';
  TokenInfo tokenInfo1 = Constants.tokens[1][0];
  double amount1 = 5;

  //A sample of sending SAMO coin  - Solana network
  String hash2 = '';
  TokenInfo tokenInfo2 = Constants.tokens[0][0];
  double amount2 = 18;

  @override
  void initState() {
    super.initState();
    // transferToken();
  }


  Future<void> transferToken() async {

    Future.delayed(const Duration(milliseconds: 100), () async {

      Utilities().showLoadingDialog(context);

      //Please fill the seedsPhrase1
      int network1 = 1;
      String seedsPhrase1 = '';
      String toAddress1 = '0x5025b56d1f527EDaF39708B149A4FA322EA475eE';

      hash1 = await ApiCalls().transfer(network1, seedsPhrase1, toAddress1, tokenInfo1 , amount1);
      if (kDebugMode) {
        print('https://bscscan.com/tx/$hash1');
        //https://bscscan.com/tx/0x1b1c2ea1644a435f1aebb01b96b008a7629c69d319d24bd496d27223f0445024
      }

      //Please fill the seedsPhrase2
      int network2 = 0;
      String seedsPhrase2 = '';
      String toAddress2 = 'AZ6NvKK2spzg1rsqfLYrTqJV8yZNpeNLGCNpCNMxZ5WS';

      hash2 = await ApiCalls().transfer(network2, seedsPhrase2, toAddress2, tokenInfo2 , amount2);
      if (kDebugMode) {
        print('https://solscan.io/tx/$hash2');
        //https://solscan.io/tx/5hRsYcqdLJiZGHSs7aLT6PUSaTbJYsikMqkw92McTmPZqp9bMbbLoJqGjtnvJoLH5hEwRr9FvHztg8spb3XPahWE
      }

      Navigator.of(context).pop();
      setState(() {

      });

    });

  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Transfer Token'),
      ),
    body: Center(
      child:
      Padding(
        padding: const EdgeInsets.only(left: 20, right: 20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[

            Text(
              'Transfer ${tokenInfo1.symbol} $amount1',
              style: const TextStyle(fontSize: 22),
            ),
            const SizedBox(height: 5),

            Text(
              'hash: $hash1',
              style: const TextStyle(fontSize: 18),
            ),
            const SizedBox(height: 25),

            Text(
              'Transfer ${tokenInfo2.symbol} $amount2',
              style: const TextStyle(fontSize: 22),
            ),
            const SizedBox(height: 5),
            Text(
              'hash: $hash2',
              style: const TextStyle(fontSize: 18),
            ),

          ],
        ),
      ),

    ),
    );
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  void reassemble() {
    super.reassemble();
  }
  
}