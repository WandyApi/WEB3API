
// Flutter Demo of https://www.WandyApi.xyz
// For Web3 Api & Demo supports and more, please join Black Cat Web3 Developer Club

import 'package:flutter_demo/token_info.dart';

class Constants {

//Solana network tokens samples
  static  TokenInfo SAMO = TokenInfo(
      'Samoyedcoin',
      'SAMO',
      9,
      'https://s2.coinmarketcap.com/static/img/coins/64x64/9721.png',
      '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
      0,
      0);

  static  TokenInfo USDT = TokenInfo(
      'Tether Coin',
      'USDT',
      6,
      'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
      'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
      0,
      0);

  static  TokenInfo SOL = TokenInfo(
      'Solana',
      'SOL',
      9,
      'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
      'SOL',
      0,
      0);


//Binance network tokens samples
  static  TokenInfo DOGE = TokenInfo(
      'Dogecoin',
      'DOGE',
      8,
      'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
      '0xba2ae424d960c26247dd6c32edc70b295c744c43',
      0,
      0);

  static  TokenInfo GMT = TokenInfo(
      'GMT Token',
      'GMT',
      8,
      'https://s2.coinmarketcap.com/static/img/coins/64x64/18069.png',
      '0x3019BF2a2eF8040C242C9a4c5c4BD4C81678b2A1',
      0,
      0);

  static  TokenInfo BNB = TokenInfo(
      'Binance',
      'BNB',
      18,
      'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
      'BNB',
      0,
      0);


//Ethereum network tokens samples
  static  TokenInfo SHIB = TokenInfo(
      'Shiba Inu',
      'SHIB',
      18,
      'https://s2.coinmarketcap.com/static/img/coins/64x64/5994.png',
      '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
      0,
      0);

  static  TokenInfo USDC = TokenInfo(
      'USD Coin',
      'USDC',
      6,
      'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      0,
      0);
  static  TokenInfo ETH = TokenInfo(
      'Ethereum',
      'ETH',
      18,
      'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
      'ETH',
      0,
      0);

//EthereumPoW network tokens samples
  static  TokenInfo ETHW = TokenInfo(
      'EthereumPoW',
      'ETHW',
      18,
      'https://s2.coinmarketcap.com/static/img/coins/64x64/21296.png',
      'ETHW',
      0,
      0);

  static  List<TokenInfo> solanaTokens = [SAMO, USDT, SOL];
  static  List<TokenInfo> binanceTokens = [DOGE, GMT, BNB];
  static  List<TokenInfo> ethereumTokens = [SHIB, USDC, ETH];
  static   List<TokenInfo> ethereumPoWTokens = [ETHW];

  static int networkId = 0;
  static String seedsPhrase = '';
  static String walletAddress = '';
  static  List<String> networks = ['Solana', 'Binance', 'Ethereum', 'EthereumPoW'];

  //Metamask connection varies
  static var connector;
  static var session;

  static List<List<TokenInfo>> tokens = [
    solanaTokens,
    binanceTokens,
    ethereumTokens,
    ethereumPoWTokens
  ];

  static const String solanaDemoWalletAddress = 'DU64YUi8nYNt3mdhmUti2BhLZdcZmgDe59HayvVBWKnb';
  static const String ethDemoWalletAddress = '0x057Fc44D60F1D31F3401d9B2739C7F37365A2689';  //eth, binance and ethw use the same address
  static  List demoWalletAddresses = [
    solanaDemoWalletAddress,  //https://solscan.io/account/DU64YUi8nYNt3mdhmUti2BhLZdcZmgDe59HayvVBWKnb
    ethDemoWalletAddress,     //https://bscscan.com/address/0x057Fc44D60F1D31F3401d9B2739C7F37365A2689
    ethDemoWalletAddress,     //https://etherscan.io/address/0x057Fc44D60F1D31F3401d9B2739C7F37365A2689
    ethDemoWalletAddress      //https://www.oklink.com/en/ethw/address/0x057Fc44D60F1D31F3401d9B2739C7F37365A2689
  ];


}