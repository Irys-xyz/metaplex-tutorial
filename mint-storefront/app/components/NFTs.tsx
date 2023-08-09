"use client";

import React, { useState, useEffect } from "react";
import NFT from "./NFT";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import { publicKey } from "@metaplex-foundation/umi";
import { fetchCandyMachine, fetchCandyGuard } from "@metaplex-foundation/mpl-candy-machine";
import { loadNFTs } from "../utils/loadNFTs";

const NFTs: React.FC<{ message: string }> = ({ message }) => {
	const [nftMetadata, setNftMetadata] = useState<string[]>([]);

	useEffect(() => {}, []);

	const doLoadNFTs = async () => {};

	return (
		<div className="flex flex-wrap justify-center mt-10 bg-gradient-to-b from-darkest to-light bg-fixed">
			<div className="w-4/5">
				<h1 className="text-xl mt-10 pt-5 text-center">
					With an NFT ticket, take a space-bound balloon, Space Llamas are going to the moon! For just 0.1
					SOL, a llama's affordable toll; grab one now, the adventure's on a roll!
				</h1>
				<h2 className="mt-3 type-xs pl-1 rounded-xl shadow-2xl shadow-color-lightest text-center bg-dark mt-1">
					{message}
				</h2>
			</div>
			{nftMetadata && nftMetadata.map((metadata, id) => <NFT key={id} metadataURL={metadata} />)}
		</div>
	);
};

export default NFTs;
