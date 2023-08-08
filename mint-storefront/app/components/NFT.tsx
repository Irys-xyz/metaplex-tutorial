"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

type NFTProps = {
	metadataURL: string;
};

const NFT: React.FC<NFTProps> = ({ metadataURL }) => {
	const [name, setName] = useState<string>("");
	const [imageUrl, setImageUrl] = useState<string>("");

	useEffect(() => {
		loadMetadata();
	}, []);

	const loadMetadata = async () => {
		const response = await fetch(metadataURL);
		const data = await response.json();

		setName(data.name);
		setImageUrl(data.properties.files[0].uri);
	};

	return (
		<div className="mt-10 px-2 py-2 mx-4 rounded-xl shadow-2xl bg-normal">
			{imageUrl && (
				<Image
					className="rounded-xl shadow-2xl shadow-color-lightest"
					src={imageUrl}
					alt={name}
					width={300}
					height={300}
				/>
			)}
			<h2 className="type-xs pl-1 rounded-xl shadow-2xl shadow-color-lightest text-center bg-dark mt-1">
				{name}
			</h2>
		</div>
	);
};

export default NFT;
