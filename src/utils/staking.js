import { Marinade, MarinadeConfig } from "@marinade.finance/marinade-ts-sdk";
import BN from "bn.js";

export const stakeSOL = async (connection, wallet, amountSOL) => {
  try {
    const config = new MarinadeConfig({
      connection,
      publicKey: wallet.publicKey,
    });

    const marinade = new Marinade(config);

    const { transaction } = await marinade.deposit(
      new BN(amountSOL * 1e9)
    );

    const signed = await wallet.signTransaction(transaction);
    const txId = await connection.sendRawTransaction(
      signed.serialize()
    );

    return txId;
  } catch (err) {
    console.error("Staking Error:", err);
  }
};