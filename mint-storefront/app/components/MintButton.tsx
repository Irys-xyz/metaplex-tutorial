"use client";

import React, { useState } from "react";
import { doMint } from "../utils/doMint";
import { useWallet } from "@solana/wallet-adapter-react";

interface SpinnerProps {
	color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ color = "text-light" }) => (
	<div className="flex items-center justify-center h-full">
		<svg
			className={`${color} animate-spin h-5 w-5`}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
			<path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			></path>
		</svg>
	</div>
);

interface MintButtonProps {
	setMessage: (message: string) => void;
}

const MintButton: React.FC<MintButtonProps> = ({ setMessage }) => {
	const wallet = useWallet();
	const [isLoading, setIsLoading] = useState(false);

	const mintNFT = async () => {};

	return (
		<button
			className="bg-dark hover:bg-light text-white font-bold py-2 px-4 rounded-xl shadow-3xl shadow-color-dark transition-colors duration-200 ease-in-out w-44 flex items-center justify-center"
			onClick={mintNFT}
			disabled={isLoading}
		>
			{isLoading ? <Spinner /> : "Mint Random NFT"}
		</button>
	);
};

export default MintButton;
