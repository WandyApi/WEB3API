
// Flutter Demo of https://www.WandyApi.xyz
// For Web3 Api & Demo supports and more, please join Black Cat Web3 Developer Club

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import 'package:firebase_core/firebase_core.dart';
import 'package:flutter_demo/screens/create_wallet.dart';
import 'package:flutter_demo/screens/get_balance.dart';
import 'package:flutter_demo/screens/get_nfts.dart';
import 'package:flutter_demo/screens/query_price.dart';
import 'package:flutter_demo/screens/retrieve_wallet.dart';
import 'package:flutter_demo/screens/transfer_nft.dart';
import 'package:flutter_demo/screens/transfer_token.dart';
import 'package:url_launcher/url_launcher.dart';
import 'constants.dart';
import 'firebase_options.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'WandyApi Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.green,
      ),
      home: const MyHomePage(title: 'WandyApi Flutter Demo V0.92'),
      routes: {
        CreateWalletScreen.id: (context) => CreateWalletScreen(),
        RetrieveWalletScreen.id: (context) => RetrieveWalletScreen(),
        GetBalanceScreen.id: (context) => GetBalanceScreen(),
        GetNFTsScreen.id: (context) => GetNFTsScreen(),
        TransferTokenScreen.id: (context) => TransferTokenScreen(),
        QueryPriceScreen.id: (context) => QueryPriceScreen(),
        TransferNftScreen.id: (context) => TransferNftScreen()
      }
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}


class _MyHomePageState extends State<MyHomePage> {

  String networkName = Constants.networks[0];
  static const snackBar = SnackBar(
    content: Text('Calling WandyApi ...'),
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[

            Image.asset(
              "assets/icon_wandyapi.png",
              height: 72,
            ),
            const SizedBox(height: 40),

            Text(
              '${Constants.networkId} - ${Constants.networks[Constants.networkId]}',
              style: Theme.of(context).textTheme.headline6,
            ),

        const SizedBox(height: 10),

        SizedBox(
          height: 40,
          width: 200,
          child: TextButton(
              style: TextButton.styleFrom(
                backgroundColor: Colors.green,
                foregroundColor: Colors.white,
                textStyle: const TextStyle(fontSize: 18),
              ),
              onPressed: () {
                showNetworkSelectionDialog();
              },
              child: const Text('Switch Network'),
            ),
            ),

            const SizedBox(height: 25),

            SizedBox(
                height: 40,
                width: 200,
                child: TextButton(
                  style: TextButton.styleFrom(
                    backgroundColor: Colors.green,
                    foregroundColor: Colors.white,
                    textStyle: const TextStyle(fontSize: 18),
                  ),
                  onPressed: () async {
                    // create a new wallet
                    Navigator.pushNamed(context, CreateWalletScreen.id);
                  },
                  child: const Text('Create Wallet'),
                )
            ),

            const SizedBox(height: 10),

            SizedBox(
                height: 40,
                width: 200,
                child: TextButton(
                  style: TextButton.styleFrom(
                    backgroundColor: Colors.green,
                    foregroundColor: Colors.white,
                    textStyle: const TextStyle(fontSize: 18),
                  ),
                  onPressed: () async {
                    // retrieve a wallet
                    Navigator.pushNamed(context, RetrieveWalletScreen.id);
                  },
                  child: const Text('Retrieve Wallet'),
                )
            ),

            const SizedBox(height: 25),

            SizedBox(
                height: 40,
                width: 200,
                child: TextButton(
                  style: TextButton.styleFrom(
                    backgroundColor: Colors.green,
                    foregroundColor: Colors.white,
                    textStyle: const TextStyle(fontSize: 18),
                  ),
                  onPressed: () async {
                    Navigator.pushNamed(context, GetBalanceScreen.id);
                  },
                  child: const Text('Get Balance'),
                )
            ),

            const SizedBox(height: 10),

            SizedBox(
                height: 40,
                width: 200,
                child: TextButton(
                  style: TextButton.styleFrom(
                    backgroundColor: Colors.green,
                    foregroundColor: Colors.white,
                    textStyle: const TextStyle(fontSize: 18),
                  ),
                  onPressed: () {
                    Navigator.pushNamed(context, TransferTokenScreen.id);
                  },
                  child: const Text('Transfer Token'),
                )
            ),

            const SizedBox(height: 25),
            SizedBox(
                height: 40,
                width: 200,
                child: TextButton(
                  style: TextButton.styleFrom(
                    backgroundColor: Colors.green,
                    foregroundColor: Colors.white,
                    textStyle: const TextStyle(fontSize: 18),
                  ),
                  onPressed: () async {
                    Navigator.pushNamed(context, GetNFTsScreen.id);
                  },
                  child: const Text('Get NFTs'),
                )
            ),

            const SizedBox(height: 10),
            SizedBox(
                height: 40,
                width: 200,
                child: TextButton(
                  style: TextButton.styleFrom(
                    backgroundColor: Colors.green,
                    foregroundColor: Colors.white,
                    textStyle: const TextStyle(fontSize: 18),
                  ),
                  onPressed: () {
                    Navigator.pushNamed(context, TransferNftScreen.id);
                  },
                  child: const Text('Transfer NFT'),
                )
            ),

            const SizedBox(height: 25),
            SizedBox(
                height: 40,
                width: 200,
                child: TextButton(
                  style: TextButton.styleFrom(
                    backgroundColor: Colors.green,
                    foregroundColor: Colors.white,
                    textStyle: const TextStyle(fontSize: 18),
                  ),
                  onPressed: () async {
                    Navigator.pushNamed(context, QueryPriceScreen.id);
                  },
                  child: const Text('Query Price'),
                )
            ),

            const SizedBox(height: 35),
            SizedBox(
                height: 40,
                width: 200,
                child: TextButton(
                  style: TextButton.styleFrom(
                    backgroundColor: Colors.green,
                    foregroundColor: Colors.white,
                    textStyle: const TextStyle(fontSize: 18),
                  ),
                  onPressed: () {
                    final Uri _url = Uri.parse('https://www.WandyApi.xyz');
                    launchUrl(_url);
                  },
                  child: const Text('About'),
                )
            ),

          ],
        ),
      ),

    );
  }

  void showNetworkSelectionDialog() async {
    await showDialog(
        context: context,
        builder: (context) {
          int selectedIndex = Constants.networkId;
          return AlertDialog(
            title: const Text("Please select a network"),
            content: StatefulBuilder(builder: (context, StateSetter setState) {
              return SingleChildScrollView(
                child: ListBody(
                  children: Constants.networks.asMap().keys.map((index) =>
                      Padding(
                          padding:EdgeInsets.all(5),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: <Widget>[
                              Radio(
                                value: index,
                                groupValue: selectedIndex,
                                onChanged: (v) {

                                    selectedIndex = v!;
                                    setState(() {

                                    });

                                },
                              ),
                              Text(Constants.networks[index]),
                            ],
                          )
                      )
                  ).toList(),
                ),
              );
            }),


            actions: <Widget>[
              TextButton(
                  child: const Text("Cancel"),
                  onPressed: () {
                    Navigator.pop(context, "cancel");} ),
              TextButton(
                  child: const Text("OK"),
                  onPressed: (){
                    networkName = Constants.networks[selectedIndex];
                    Constants.networkId = selectedIndex;
                    setState(() {

                    });
                    Navigator.pop(context, "confirm");
                  }),
            ],
          );
        });
  }
}
