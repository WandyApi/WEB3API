import 'package:flutter_demo/token_info.dart';

TokenInfo SAMO = new TokenInfo(
    'Samoyedcoin',
    'SAMO',
    9,
    'https://s2.coinmarketcap.com/static/img/coins/64x64/9721.png',
    '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    0);

TokenInfo USDC1 = new TokenInfo(
    'USD Coin',
    'USDC',
    6,
    'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    0);

TokenInfo SOL = new TokenInfo(
    'Solana',
    'SOL',
    9,
    'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
    'SOL',
    0);

TokenInfo DOGE = new TokenInfo(
    'Dogecoin',
    'DOGE',
    8,
    'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
    '0xba2ae424d960c26247dd6c32edc70b295c744c43',
    0);

TokenInfo GMT = new TokenInfo(
    'GMT',
    'GMT',
    8,
    'https://s2.coinmarketcap.com/static/img/coins/64x64/18069.png',
    '0x3019BF2a2eF8040C242C9a4c5c4BD4C81678b2A1',
    0);

TokenInfo BNB = new TokenInfo(
'Binance',
'BNB',
18,
'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
'BNB',
0);

TokenInfo SHIB = new TokenInfo(
    'Shiba Inu',
    'SHIB',
    18,
    'https://s2.coinmarketcap.com/static/img/coins/64x64/5994.png',
    '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
    0);

TokenInfo USDC2 = new TokenInfo(
'USD Coin',
'USDC',
6,
'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
0);

TokenInfo ETH = new TokenInfo(
'Ethereum',
'ETH',
18,
'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
'ETH',
0);

TokenInfo ETHW = new TokenInfo(
    'EthereumPoW',
    'ETHW',
    18,
    'https://s2.coinmarketcap.com/static/img/coins/64x64/21296.png',
    'ETHW',
    0);


List networks = ['Solana', 'Binance', 'Ethereum', 'EthereumPoW'];

//These are some tokens samples for each network

List<TokenInfo> solanaTokens = [SAMO, USDC1, SOL];
List<TokenInfo> BinanceTokens = [DOGE, GMT, BNB];
List<TokenInfo> ethereumTokens = [SHIB, USDC2, ETH];
List<TokenInfo> ethereumPoWTokens = [ETHW];

List tokens = [solanaTokens, BinanceTokens, ethereumTokens, ethereumPoWTokens];
