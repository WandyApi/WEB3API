
// Flutter Demo of https://www.WandyApi.xyz
// For Web3 Api & Demo supports and more, please join Black Cat Web3 Developer Club

class TokenInfo {
  String name;
  String logo;
  String symbol;
  String tokenAddress;
  int decimals;
  double balance;
  double price;

  TokenInfo(
      this.name,
      this.symbol,
      this.decimals,
      this.logo,
      this.tokenAddress,
      this.balance,
      this.price
      );
}