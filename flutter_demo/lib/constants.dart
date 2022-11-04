import 'package:flutter_demo/token_info.dart';

class Constants {

//Solana network token samples
  TokenInfo SAMO = TokenInfo(
      'Samoyedcoin',
      'SAMO',
      9,
      'https://s2.coinmarketcap.com/static/img/coins/64x64/9721.png',
      '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
      0);

  TokenInfo USDT = TokenInfo(
      'Tether Coin',
      'USDT',
      6,
      'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
      'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
      0);

  TokenInfo SOL = TokenInfo(
      'Solana',
      'SOL',
      9,
      'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
      'SOL',
      0);

//Binance network token samples
  TokenInfo DOGE = TokenInfo(
      'Dogecoin',
      'DOGE',
      8,
      'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
      '0xba2ae424d960c26247dd6c32edc70b295c744c43',
      0);

  TokenInfo GMT = TokenInfo(
      'GMT Token',
      'GMT',
      8,
      'https://s2.coinmarketcap.com/static/img/coins/64x64/18069.png',
      '0x3019BF2a2eF8040C242C9a4c5c4BD4C81678b2A1',
      0);

  TokenInfo BNB = TokenInfo(
      'Binance',
      'BNB',
      18,
      'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
      'BNB',
      0);

//Ethereum network token samples
  TokenInfo SHIB = TokenInfo(
      'Shiba Inu',
      'SHIB',
      18,
      'https://s2.coinmarketcap.com/static/img/coins/64x64/5994.png',
      '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
      0);

  TokenInfo USDC = TokenInfo(
      'USD Coin',
      'USDC',
      6,
      'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      0);

  TokenInfo ETH = TokenInfo(
      'Ethereum',
      'ETH',
      18,
      'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
      'ETH',
      0);

//EthereumPoW network token samples
  TokenInfo ETHW = TokenInfo(
      'EthereumPoW',
      'ETHW',
      18,
      'https://s2.coinmarketcap.com/static/img/coins/64x64/21296.png',
      'ETHW',
      0);

  List networks = ['Solana', 'Binance', 'Ethereum', 'EthereumPoW'];
  List<TokenInfo> solanaTokens = [Constants().SAMO, Constants().USDT, Constants().SOL];
  List<TokenInfo> binanceTokens = [Constants().DOGE, Constants().GMT, Constants().BNB];
  List<TokenInfo> ethereumTokens = [Constants().SHIB, Constants().USDC, Constants().ETH];
  List<TokenInfo> ethereumPoWTokens = [Constants().ETHW];

  List tokens = [
    Constants().solanaTokens,
    Constants().binanceTokens,
    Constants().ethereumTokens,
    Constants().ethereumPoWTokens
  ];
}