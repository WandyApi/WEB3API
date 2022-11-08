

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class CreateWalletScreen extends StatefulWidget {
  static const String id = "/invite_screen";

  @override
  _CreateWalletScreenState createState() => _CreateWalletScreenState();
}

class _CreateWalletScreenState extends State<CreateWalletScreen> {

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Create Wallet'),
      ),
    body: Center(

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