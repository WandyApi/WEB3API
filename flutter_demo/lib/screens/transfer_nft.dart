// Flutter Demo of https://www.WandyApi.xyz
// For Web3 Api & Demo supports and more, please join Black Cat Web3 Developer Club

import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

import '../api_calls.dart';
import '../nft_info.dart';
import '../utilities.dart';


class TransferNftScreen extends StatefulWidget {
  static const String id = "/transfer_nft";

  @override
  _TransferNftScreenState createState() => _TransferNftScreenState();
}

class _TransferNftScreenState extends State<TransferNftScreen> {

  //NOTE - You CAN NOT transfer nft of A network to B network

  //A sample of sending a NFT token - Eth network
  //https://etherscan.io/nft/0x31f3bba9b71cb1d5e96cd62f0ba3958c034b55e9/3738

  String hash = '';
  NFTInfo nftInfo = NFTInfo('', '', '', '3738', '', '', '0x31f3bba9b71cb1d5e96cd62f0ba3958c034b55e9', 0,0,'');

  @override
  void initState() {
    super.initState();
    transferNft();
  }


  Future<void> transferNft() async {

    Future.delayed(const Duration(milliseconds: 100), () async {

      //Please fill the seedsPhrase to transfer nftInfo
      Utilities().showLoadingDialog(context);
      String seedsPhrase = '';

      if(seedsPhrase.isNotEmpty) {
        String toAddress = '0x5025b56d1f527EDaF39708B149A4FA322EA475eE';

        hash =
        await ApiCalls().transferNFT(2, seedsPhrase, toAddress, nftInfo, 1);
        if (kDebugMode) {
          print('https://etherscan.io/tx/$hash');
          //https://etherscan.io/tx/0xc74b19dee86553b194a2e8f177491e6dee186d6eb2aa845947a3ba7740184262
        }
      } else {
        Fluttertoast.showToast(
            msg: "Please fill the seeds phrase.",
            toastLength: Toast.LENGTH_LONG,
            gravity: ToastGravity.CENTER,
            timeInSecForIosWeb: 1,
            backgroundColor: Colors.red,
            textColor: Colors.white,
            fontSize: 16.0
        );
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
        title: const Text('Transfer NFT'),
      ),
    body: Center(
      child:
      Padding(
        padding: const EdgeInsets.only(left: 20, right: 20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[

            Text(
              'Transfer ${nftInfo.contractAddress} ${nftInfo.tokenId}',
              style: const TextStyle(fontSize: 22),
            ),
            const SizedBox(height: 5),

            Text(
              'hash: $hash',
              style: const TextStyle(fontSize: 18),
            ),
            const SizedBox(height: 25),


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