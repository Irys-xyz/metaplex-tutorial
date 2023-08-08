"use client";

import { doMint } from "../utils/doMint";
import { useWallet } from "@solana/wallet-adapter-react";

interface MintButtonProps {
	setMessage: (message: string) => void;
}

const MintButton: React.FC<MintButtonProps> = ({ setMessage }) => {
	const wallet = useWallet();

	const mintNFT = async () => {
		doMint(wallet);
		setMessage("NFT minted, check your wallet!");
	};

	return (
		<button
			className="bg-dark hover:bg-light text-white font-bold py-2 px-4 rounded-xl shadow-3xl shadow-color-dark transition-colors duration-200 ease-in-out"
			onClick={mintNFT}
		>
			Mint Random NFT
		</button>
	);
};

export default MintButton;
