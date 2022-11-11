// Flutter Demo of https://www.WandyApi.xyz
// For Web3 Api & Demo supports and more, please join Black Cat Web3 Developer Club

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_demo/constants.dart';

import '../token_info.dart';
import '../utilities.dart';

class QueryPriceScreen extends StatefulWidget {
  static const String id = "/query_price_screen";

  @override
  _QueryPriceScreenState createState() => _QueryPriceScreenState();
}

class _QueryPriceScreenState extends State<QueryPriceScreen> {

  bool isLoading = false;
  List<TokenInfo> tokenList = [];

  @override
  void initState() {
    super.initState();
    loadData();
  }

  Future<void> loadData() async {

    Future.delayed(const Duration(milliseconds: 100), () async {

      for(int i = 1; i < Constants.tokens.length - 1 ; i++) {
        Constants.tokens[i].forEach((element) {
          tokenList.add(element);
        });
      }

      Utilities().showLoadingDialog(context);

      for(int i = 0; i < tokenList.length; i++) {
        print('loadData:' + tokenList[i].symbol);
        tokenList[i].price = await Utilities().queryTokenPrice(tokenList[i].symbol);
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
        title: const Text('Query Price'),
      ),
    body: Center(
      child:
      Padding(
        padding: const EdgeInsets.only(left: 20, right: 20, top: 20),
        child: ListView.builder(
          itemCount: tokenList.length,
          itemBuilder: (BuildContext context, int index) {
            return ListTile( title: Text('${tokenList[index].symbol}  ${tokenList[index].price}'),
                leading:  CircleAvatar(backgroundImage: NetworkImage(tokenList[index].logo)));
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