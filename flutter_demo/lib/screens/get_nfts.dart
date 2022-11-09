

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_demo/constants.dart';

import '../api_calls.dart';
import '../nft_info.dart';
import '../utilities.dart';

class GetNFTsScreen extends StatefulWidget {
  static const String id = "/get_nfts_screen";

  @override
  _GetNFTsScreenState createState() => _GetNFTsScreenState();
}

class _GetNFTsScreenState extends State<GetNFTsScreen> {

  List<NFTInfo> myNfts = [];

  @override
  void initState() {
    super.initState();
    loadData();
  }

  Future<void> loadData() async {

    Future.delayed(const Duration(milliseconds: 100), () async {

      Utilities().showLoadingDialog(context);
      myNfts = await Utilities().queryNFTs(Constants.networkId, Constants.demoWalletAddresses[Constants.networkId]);
      Navigator.of(context).pop();

      setState(() {

      });
    });

  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Get NFTs'),
      ),
    body: Center(
      child:
      Padding(
        padding: const EdgeInsets.only(left: 20, right: 20, top: 20),
        child: ListView.builder(
          itemCount: myNfts.length,
          itemBuilder: (BuildContext context, int index) {
            return ListTile( title: Text('${myNfts[index].title}  ${myNfts[index].tokenId}'),
                leading:  CircleAvatar(backgroundImage: NetworkImage(myNfts[index].image)));
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