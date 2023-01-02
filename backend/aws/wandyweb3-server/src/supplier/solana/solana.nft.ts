import { Metaplex } from '@metaplex-foundation/js';
import { Injectable } from '@nestjs/common';
import { Cluster, clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { SolanaNFTForm } from 'src/model/form/nft/nft.form';

@Injectable()
export class SolanaNFTService {
  async findAllByOwner(nftForm: SolanaNFTForm) {
    const publicKey = new PublicKey(nftForm.address);
    console.log(PublicKey.isOnCurve(publicKey));

    const cluster: Cluster = nftForm.cluster || 'devnet';
    const connection = new Connection(clusterApiUrl(cluster), 'confirmed');
    const metaplex = new Metaplex(connection);
    const myNfts = metaplex.nfts().findAllByOwner({ owner: publicKey });
    let metadatas: any;
    // (await myNfts.run()).forEach((item) => {
    //   metadatas.push(item);
    // });
    // myNfts?.forEach((item) => {
    //   metadatas.push(item.metadata);
    //   Logger.debug(`findAllByOwner myNfts Metadata= ${item.metadata}`);
    // });
    return metadatas;
  }
}
