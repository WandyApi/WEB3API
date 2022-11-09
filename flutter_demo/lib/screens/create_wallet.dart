

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_demo/constants.dart';

import '../api_calls.dart';
import '../utilities.dart';

class CreateWalletScreen extends StatefulWidget {
  static const String id = "/create_wallet";

  @override
  _CreateWalletScreenState createState() => _CreateWalletScreenState();
}

class _CreateWalletScreenState extends State<CreateWalletScreen> {

  @override
  void initState() {
    super.initState();
    loadData();
  }


  Future<void> loadData() async {

    Future.delayed(const Duration(milliseconds: 100), () async {

      Utilities().showLoadingDialog(context);
      Constants.seedsPhrase = Utilities().generateMnemonic();
      Constants.walletAddress = await ApiCalls().createWallet(Constants.networkId, Constants.seedsPhrase);
      Navigator.of(context).pop();

      setState(() {

      });
    });

  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Create Wallet'),
      ),
    body: Center(
      child:
      Padding(
        padding: const EdgeInsets.only(left: 20, right: 20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              '${Constants.networkId} - ${Constants.networks[Constants.networkId]} Wallet Address',
              style: Theme.of(context).textTheme.headline5,
            ),
            const SizedBox(height: 35),
            Text(
              Constants.walletAddress,
              style: const TextStyle(fontSize: 22),
            ),
            const SizedBox(height: 25),
            Text(
              Constants.seedsPhrase,
              style: const TextStyle(fontSize: 15),
            ),

            const SizedBox(height: 25)

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