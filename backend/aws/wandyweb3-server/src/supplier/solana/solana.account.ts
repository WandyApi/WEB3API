import { HttpException, Injectable, Logger } from '@nestjs/common';
import {
  AccountLayout,
  getOrCreateAssociatedTokenAccount,
  TOKEN_PROGRAM_ID,
  transfer,
} from '@solana/spl-token';
import {
  BlockResponse,
  Cluster,
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { AccountDTO } from 'src/model/dto/solana/account.dto';
import { AccountBaseForm } from 'src/model/solana/account/account.base.form';
import { BlockForm } from 'src/model/solana/account/block.form';
import { TransactionForm } from 'src/model/solana/account/transaction.form';
import { TransactionsForm } from 'src/model/solana/account/transactions.form';

import { SOLANA_TOKEN_MNEMONIC } from '../../model/constant/token.constant';
import { BaseResult } from '../../model/base.result';
import { TransferDTO } from '../../model/dto/transfer.dto';
import { BalanceForm } from '../../model/solana/account/balance.form';
import { TransferForm } from '../../model/form/transfer.form';

@Injectable()
export class SolanaAccountService {
  private getKeypair(mnemonic: string): Keypair {
    const seedPhrase = mnemonicToSeedSync(mnemonic);
    const index = 0;
    const derivedPath = "m/44'/501'/" + index + "'/0'";
    const derivedSeed = derivePath(derivedPath, seedPhrase.toString('hex')).key;
    return Keypair.fromSeed(derivedSeed);
  }

  checkAddress(address: string): boolean {
    let flag = false;
    try {
      const publicKey = new PublicKey(address);
      flag = PublicKey.isOnCurve(publicKey);
    } catch (error) {
      Logger.error(error.stack, SolanaAccountService.name);
      throw new HttpException('address is invalid!', 400);
    }

    return flag;
  }

  createWallet(
    mnemonic: string,
  ): BaseResult<{ address: string; privateKey: string }> {
    const keypair = this.getKeypair(mnemonic);
    const address = keypair.publicKey.toString();
    const privateKey = keypair.secretKey.toString();

    const addressResult = new BaseResult<{
      address: string;
      privateKey: string;
    }>();
    addressResult.code = 0;
    addressResult.msg = 'success';
    addressResult.data = {
      address,
      privateKey,
    };

    return addressResult;
  }

  async getTokenAccountsByOwner(
    accountForm: AccountBaseForm,
  ): Promise<BaseResult<Array<AccountDTO>>> {
    const blanceResult = new BaseResult<Array<AccountDTO>>();
    blanceResult.code = 0;
    blanceResult.msg = 'success';

    const publicKey = new PublicKey(accountForm.address);
    console.log(PublicKey.isOnCurve(publicKey));

    const cluster: Cluster = accountForm.cluster || 'devnet';
    const connection = new Connection(clusterApiUrl(cluster), 'confirmed');
    const tokenAccounts = await connection.getTokenAccountsByOwner(
      new PublicKey(accountForm.address),
      {
        programId: TOKEN_PROGRAM_ID,
      },
    );
    blanceResult.data = [];
    // const value = ;
    console.log('Token                                         Balance');
    console.log('------------------------------------------------------------');
    tokenAccounts.value.forEach((tokenAccount) => {
      const accountData = AccountLayout.decode(tokenAccount.account.data);
      console.log(`${new PublicKey(accountData.mint)}   ${accountData.amount}`);
      const accountDTO = new AccountDTO();
      accountDTO.mint = accountData.mint.toString();
      accountDTO.owner = accountData.owner.toString();
      accountDTO.amount = Number(accountData.amount);
      accountDTO.delegateOption = accountData.delegateOption;
      accountDTO.delegate = accountData.delegate.toString();
      accountDTO.state = accountData.state;
      accountDTO.isNativeOption = accountData.isNativeOption;
      accountDTO.isNative = Number(accountData.isNative);
      accountDTO.delegatedAmount = Number(accountData.delegatedAmount);
      accountDTO.closeAuthorityOption = accountData.closeAuthorityOption;
      accountDTO.closeAuthority = accountData.closeAuthority.toString();

      blanceResult.data.push(accountDTO);
    });
    // blanceResult.data = value;
    return blanceResult;
  }

  async getBlock(blockForm: BlockForm): Promise<BlockResponse> {
    const cluster: Cluster = blockForm.cluster || 'devnet';
    const connection = new Connection(clusterApiUrl(cluster), 'confirmed');
    return await connection.getBlock(Number(blockForm.slot));
  }

  async getTransaction(transactionForm: TransactionForm) {
    const cluster: Cluster = transactionForm.cluster || 'devnet';
    const connection = new Connection(clusterApiUrl(cluster), 'confirmed');
    return await connection.getTransaction(transactionForm.signature);
  }

  async getTransactions(transactionsForm: TransactionsForm) {
    const cluster: Cluster = transactionsForm.cluster || 'devnet';
    const connection = new Connection(clusterApiUrl(cluster), 'confirmed');
    const publicKey = new PublicKey(transactionsForm.address);
    PublicKey.isOnCurve(publicKey);
    return await connection.getSignaturesForAddress(publicKey);
  }

  async additional(address: string) {
    const publicKey = new PublicKey(address);
    PublicKey.isOnCurve(publicKey);
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const airdropSignature = await connection.requestAirdrop(
      publicKey,
      LAMPORTS_PER_SOL,
    );
    const latestBlockHash = await connection.getLatestBlockhash();
    // TransactionConfirmationConfig
    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: airdropSignature,
    });

    return LAMPORTS_PER_SOL;
  }

  async airdrop(address: string): Promise<BaseResult<number>> {
    const blanceResult = new BaseResult<number>();
    blanceResult.code = 0;
    blanceResult.msg = 'success';
    const transferForm = new TransferForm();
    transferForm.toAddress = address;
    transferForm.amount = 0.001 * LAMPORTS_PER_SOL;
    transferForm.mnemonic = SOLANA_TOKEN_MNEMONIC;
    await this.transfer(transferForm);
    blanceResult.data = transferForm.amount;
    return blanceResult;
  }

  async getBalance(balanceForm: BalanceForm): Promise<BaseResult<number>> {
    const blanceResult = new BaseResult<number>();
    blanceResult.code = 0;
    blanceResult.msg = 'success';

    const publicKey = new PublicKey(balanceForm.address);
    console.log(PublicKey.isOnCurve(publicKey));

    const cluster: Cluster = balanceForm.cluster || 'devnet';
    const connection = new Connection(clusterApiUrl(cluster), 'confirmed');

    const token = balanceForm.token || 'SOL';
    if (token.toLocaleUpperCase() === 'SOL') {
      const balance = await connection.getBalance(publicKey);
      blanceResult.data = balance;
    } else {
      const mintPuk = new PublicKey(token);
      // console.log(PublicKey.isOnCurve(mintPuk));
      const tokenAccounts = await connection.getTokenAccountsByOwner(
        publicKey,
        {
          mint: mintPuk,
        },
      );
      // const payerAccount = await getOrCreateAssociatedTokenAccount(
      //   connection,
      //   payerKeypair,
      //   mintPuk,
      //   publicKey,
      // );
      blanceResult.data = 0;
      tokenAccounts.value.forEach((e) => {
        const accountInfo = AccountLayout.decode(e.account.data);
        console.log(
          `${new PublicKey(accountInfo.mint)}   ${accountInfo.amount}`,
        );
        blanceResult.data = Number(accountInfo.amount);
      });
      // const balance = payerAccount.amount;
    }

    return blanceResult;
  }

  async transfer(transferForm: TransferForm): Promise<BaseResult<TransferDTO>> {
    const transferResult = new BaseResult<TransferDTO>();
    transferResult.data = new TransferDTO();
    transferResult.code = 0;
    transferResult.msg = 'success';

    const mnemonic = transferForm.mnemonic;
    const payerKeypair = this.getKeypair(mnemonic);
    const payerAddress = payerKeypair.publicKey.toString();

    if (!this.checkAddress(transferForm.toAddress)) {
      transferResult.code = -1;
      transferResult.msg = 'to address is error!';
      return transferResult;
    }
    const toPubKey = new PublicKey(transferForm.toAddress);
    // console.log(PublicKey.isOnCurve(toPubKey));

    const cluster: Cluster = transferForm.cluster || 'devnet';
    const connection = new Connection(clusterApiUrl(cluster), 'confirmed');

    const token = transferForm.token || 'SOL';
    if (token.toLocaleUpperCase() === 'SOL') {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: payerKeypair.publicKey,
          toPubkey: toPubKey,
          lamports: transferForm.amount,
        }),
      );

      try {
        const signature = await sendAndConfirmTransaction(
          connection,
          transaction,
          [payerKeypair],
        );

        transferResult.data.transactionHash = signature;
        transferResult.data.token = token;
        transferResult.data.fromAddress = payerAddress;
        transferResult.data.toAddress = transferForm.toAddress;
        transferResult.data.amount = transferForm.amount;
      } catch (error) {
        // console.log(error);
        Logger.error(error.stack, SolanaAccountService.name);
        transferResult.code = -1;
        transferResult.msg = error.message;
        return transferResult;
      }
    } else {
      const tokenPuk = new PublicKey(token);
      console.log(PublicKey.isOnCurve(tokenPuk));

      const payerAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payerKeypair,
        tokenPuk,
        payerKeypair.publicKey,
      );

      const recipientAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payerKeypair,
        tokenPuk,
        toPubKey,
      );

      const transferTransaction = await transfer(
        connection,
        payerKeypair,
        payerAccount.address,
        recipientAccount.address,
        payerKeypair.publicKey,
        transferForm.amount,
      );
      transferResult.data.transactionHash = transferTransaction.toString();
      transferResult.data.token = token;
      transferResult.data.fromAddress = payerAddress;
      transferResult.data.toAddress = transferForm.toAddress;
      transferResult.data.amount = transferForm.amount;
    }

    return transferResult;
  }
}
