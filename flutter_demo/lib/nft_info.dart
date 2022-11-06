
// Flutter Demo of https://www.WandyApi.xyz
// For Web3 Api & Demo supports and more, please join Black Cat Web3 Developer Club

class NFTInfo {
  String title = "";
  String description = "";
  String tokenId = "";
  String image = "";
  String format = "";
  String contractAddress = "";
  double balance = 0.0;
  String tokenType = "";
  double price = 0.0;
  String externalUrl = "";

  NFTInfo(
      this.tokenType,  //ERC-721,ERC-1155
      this.title,
      this.description,
      this.tokenId,
      this.image,
      this.format,
      this.contractAddress,
      this.price,
      this.balance,
      this.externalUrl
      );
}