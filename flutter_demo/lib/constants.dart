import 'package:flutter_demo/token_info.dart';

TokenInfo GST = new TokenInfo(
    'STEPN Green Satoshi Token',
    'GST',
    9,
    'https://s2.coinmarketcap.com/static/img/coins/64x64/16352.png',
    'AFbX8oGjGpmVFywbVouvhQSRmiW2aR1mohfahi4Y2AdB',
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

List solanaTokens = [GST, USDC1, SOL];
List BinanceTokens = [DOGE, GMT, BNB];
List ethereumTokens = [SHIB, USDC2, ETH];
List ethereumPoWTokens = [ETHW];

List tokens = [solanaTokens, BinanceTokens, ethereumTokens, ethereumPoWTokens];