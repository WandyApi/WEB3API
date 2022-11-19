// Flutter Demo of https://www.WandyApi.xyz
// For Web3 Api & Demo supports and more, please join Black Cat Web3 Developer Club

import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_demo/constants.dart';
import 'package:flutter_demo/utilities.dart';

import 'package:walletconnect_dart/walletconnect_dart.dart';
import 'package:url_launcher/url_launcher_string.dart';

class ConnectMetamaskScreen extends StatefulWidget {
  static const String id = "/connect_metamask";

  @override
  _ConnectMetamaskScreenState createState() => _ConnectMetamaskScreenState();
}

class _ConnectMetamaskScreenState extends State<ConnectMetamaskScreen> {


  var _uri;

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Connect Metamask'),
      ),
    body: Center(
      child:
      Padding(
        padding: const EdgeInsets.only(left: 20, right: 20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              Constants.session != null ?
              '${Constants.networkId} ${Constants.networks[Constants.networkId]} ': '',
              style: Theme.of(context).textTheme.headline5,
            ),
            const SizedBox(height: 35),
            Text(
              Constants.session != null ?
              '${Constants.session.accounts[0]}' : '',
              style: const TextStyle(fontSize: 22),
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
                    Constants.connector = WalletConnect(
                        bridge: 'https://bridge.walletconnect.org',
                        clientMeta: const PeerMeta(
                            name: 'WandyApi Flutter Demo',
                            description: 'An app for converting pictures to NFT',
                            url: 'https://walletconnect.org',
                            icons: [
                              'https://files.gitbook.com/v0/b/gitbook-legacy-files/o/spaces%2F-LJJeCjcLrr53DcT1Ml7%2Favatar.png?alt=media'
                            ]));

                    Constants.connector.on('connect', (session) {
                      if (kDebugMode) {
                        print('Connect: $session');
                      }
                      Constants.session = session;
                      Constants.networkId = Utilities().getNetworkId(Constants.session.chainId);

                      setState(() {

                      });
                    });

                    Constants.connector.on('session_update', (session) {
                      if (kDebugMode) {
                        print('Update: $session');
                      }
                      Constants.session = session;
                      Constants.networkId = Utilities().getNetworkId(Constants.session.chainId);

                      setState(() {

                      });
                    });

                    Constants.connector.on('disconnect', (session) {
                      if (kDebugMode) {
                        print('Disconnect: $session');
                      }
                      Constants.connector = null;
                      Constants.session = null;
                      Constants.networkId = 0;

                      setState(() {

                      });
                    });

                     if(!Constants.connector.connected) {
                      try {
                        var session = await Constants.connector.createSession(
                            onDisplayUri: (uri) async {
                              _uri = uri;
                              await launchUrlString(
                                  uri, mode: LaunchMode.externalApplication);
                            });

                        setState(() {
                          Constants.session = session;
                          Constants.networkId = Utilities().getNetworkId(Constants.session.chainId);
                        });
                      } catch(exp){
                        if (kDebugMode) {
                          print(exp);
                        }
                      }
                     }

                  },
                  child: const Text('Connect Metamask'),
                )
            ),

            const SizedBox(height: 25),

            SizedBox(
          height: 40,
          width: 200,
          child: TextButton(
            style: TextButton.styleFrom(
              backgroundColor:

              Constants.connector == null ?
              Colors.grey : (Constants.connector.connected ? Colors.green : Colors.grey),
              foregroundColor: Colors.white,
              textStyle: const TextStyle(fontSize: 18),
            ),
            onPressed: () async {

              if(Constants.connector != null && Constants.connector.connected) {
                Constants.connector.killSession();
                Constants.connector = null;
                Constants.session = null;
                Constants.networkId = 0;
                setState(() {
                  
                });
              }

            },
            child: const Text('Disconnect Metamask'),
          )
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