// utils/loadNFTs.ts

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

export const doMint = async (wallet: WalletAdapter) => {
	const umi = createUmi(process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com").use(mplCandyMachine());
	umi.use(walletAdapterIdentity(wallet));

	const candyMachinePublicKey = publicKey(process.env.NEXT_PUBLIC_CANDY_MACHINE || "");

	const collectionUpdateAuthority = generateSigner(umi);
	const candyMachine = await fetchCandyMachine(umi, candyMachinePublicKey);

	const nftMint = generateSigner(umi);
	const nftMetadata = await fetchMetadataFromSeeds(umi, { mint: candyMachine.collectionMint });
	console.log("candyMachine=", candyMachine);
	await transactionBuilder()
		.add(setComputeUnitLimit(umi, { units: 800_000 }))
		.add(
			mintV2(umi, {
				candyMachine: candyMachine.publicKey,
				candyGuard: candyMachine.mintAuthority,
				nftMint,
				collectionMint: candyMachine.collectionMint,
				collectionUpdateAuthority: nftMetadata.updateAuthority,
				tokenStandard: candyMachine.tokenStandard,
				mintArgs: {
					solPayment: { destination: candyMachine.authority },
				},
			}),
		)
		.sendAndConfirm(umi);
	// If you have guards, add them. EXPAND ON THIS
};

//0.93406
