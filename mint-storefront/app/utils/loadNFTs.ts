// utils/loadNFTs.ts

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { fetchCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import { PublicKey, Pda } from "@metaplex-foundation/umi";

export const loadNFTs = async (): Promise<string[]> => {
	const umi = createUmi(process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com");
	const candyMachine = await fetchCandyMachine(umi, process.env.NEXT_PUBLIC_CANDY_MACHINE || "");
	const arrayBuilder: string[] = [];
	for (let i = 0; i < candyMachine.items.length; i++) {
		arrayBuilder.push(candyMachine.items[i].uri);
	}
	return arrayBuilder;
};
