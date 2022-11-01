import 'dart:math';

import 'package:flutter/material.dart';

import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
import 'api_calls.dart';

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
  double balance = 0.0;

  Future<void> _incrementCounter() async {
      seedsPhrase ='vivid lava apple exotic reform clap pioneer blind uncle lawsuit drop label'; //generateMnemonic();
      print(seedsPhrase);
      walletAddress = await createWallet(0, seedsPhrase);
      balance = await getBalance(0,seedsPhrase, SOL.tokenAddress);
      balance = balance / pow(10, SOL.decimals);
    setState(() {

    });
  }

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
              '$network - ${networks[network]}',
              style: Theme.of(context).textTheme.headline4,
            ),

        SizedBox(height: 15),

        SizedBox(
          height: 40,
          width: 200,
          child: TextButton(
              style: TextButton.styleFrom(
                backgroundColor: Colors.green,
                foregroundColor: Colors.black54,
                textStyle: const TextStyle(fontSize: 18),
              ),
              onPressed: () {

                setState(() {
                  network = network + 1;
                  if(network == 4)
                    network = 0;
                });
              },
              child: const Text('Switch Network'),
            ),
            ),

            SizedBox(height: 15),

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
                  child: const Text('Create Wallet'),
                )
            ),

            SizedBox(height: 15),

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
                  child: const Text('Get Balance'),
                )
            ),

            SizedBox(height: 15),
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

            SizedBox(height: 15),
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
                  child: const Text('Get NFTs'),
                )
            ),

            SizedBox(height: 15),
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
}
