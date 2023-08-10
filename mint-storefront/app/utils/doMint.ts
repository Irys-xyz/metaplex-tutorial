import { PublicKey, Pda } from "@metaplex-foundation/umi";
import { mintV2, fetchCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import { setComputeUnitLimit } from "@metaplex-foundation/mpl-toolbox";
import { transactionBuilder, generateSigner } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import { publicKey } from "@metaplex-foundation/umi";
import { createNft, TokenStandard, fetchMetadataFromSeeds } from "@metaplex-foundation/mpl-token-metadata";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { WalletAdapter } from "@solana/wallet-adapter-base";

/**
 * Mints a random NFT from the colletion owned by the
 */
export const doMint = async (wallet: WalletAdapter) => {

  
};
