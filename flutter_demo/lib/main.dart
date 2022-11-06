import 'dart:math';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import 'package:firebase_core/firebase_core.dart';
import 'package:flutter_demo/api_calls.dart';
import 'package:flutter_demo/utilities.dart';
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
      home: const MyHomePage(title: 'WandyApi Flutter Demo V0.50'),
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

  String seedsPhrase = '';
  String walletAddress = '';
  int network = 0;
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
            Text(
              '$network - ${Constants.networks[network]}',
              style: Theme.of(context).textTheme.headline4,
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
                    ScaffoldMessenger.of(context).showSnackBar(snackBar);
                    seedsPhrase = Utilities().generateMnemonic();
                    if (kDebugMode) {
                      print(seedsPhrase);
                    }
                    walletAddress = await ApiCalls().createWallet(network, seedsPhrase);
                    if (kDebugMode) {
                      print('seedsPhrase = $seedsPhrase walletAddress = $walletAddress');
                    }
                    ScaffoldMessenger.of(context).hideCurrentSnackBar();
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
                    if(seedsPhrase.isNotEmpty) {
                      walletAddress =
                      await ApiCalls().createWallet(network, seedsPhrase);
                      if (kDebugMode) {
                        print(
                            'seedsPhrase = $seedsPhrase walletAddress = $walletAddress');
                      }
                    }
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
                        ScaffoldMessenger.of(context).showSnackBar(snackBar);
                        await Utilities().queryTokensBalance(network, Constants.demoWalletAddresses[network]);
                        ScaffoldMessenger.of(context).hideCurrentSnackBar();
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
                    await Utilities().queryNFTs(network, Constants.demoWalletAddresses[network]);
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
                  },
                  child: const Text('Transfer NFT'),
                )
            ),

          ],
        ),
      ),

    );
  }

  showNetworkSelectionDialog() async {
    await showDialog(
        context: context,
        builder: (context) {
          int selectedIndex = network;
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
                    network = selectedIndex;
                    setState(() {

                    });
                    Navigator.pop(context, "confirm");
                  }),
            ],
          );
        });
  }
}
