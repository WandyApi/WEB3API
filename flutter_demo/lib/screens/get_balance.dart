

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_demo/constants.dart';

import '../api_calls.dart';
import '../utilities.dart';

class GetBalanceScreen extends StatefulWidget {
  static const String id = "/get_balance_screen";

  @override
  _GetBalanceScreenState createState() => _GetBalanceScreenState();
}

class _GetBalanceScreenState extends State<GetBalanceScreen> {

  bool isLoading = false;

  @override
  void initState() {
    super.initState();
    loadData();
  }

  Future<void> loadData() async {

    Future.delayed(const Duration(milliseconds: 100), () async {

      Utilities().showLoadingDialog(context);
      Constants.tokens[Constants.networkId] = await Utilities().queryTokensBalance(Constants.networkId, Constants.demoWalletAddresses[Constants.networkId]);
      Navigator.of(context).pop();

      setState(() {

      });
    });

  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Get Balance'),
      ),
    body: Center(
      child:
      Padding(
        padding: const EdgeInsets.only(left: 20, right: 20, top: 20),
        child: ListView.builder(
          itemCount: Constants.tokens[Constants.networkId].length,
          itemBuilder: (BuildContext context, int index) {
            return ListTile( title: Text('${Constants.tokens[Constants.networkId][index].symbol}  ${Constants.tokens[Constants.networkId][index].balance}'),
                leading:  CircleAvatar(backgroundImage: NetworkImage(Constants.tokens[Constants.networkId][index].logo)));
          },
        )
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