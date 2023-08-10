"use client";

import React, { FC, useMemo, useState } from "react";
import Image from "next/image";
import { Navbar } from "./components/Navbar";
import NFTs from "./components/NFTs";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

export default function Home() {
	const [message, setMessage] = useState<string>("");
	const [showConfetti, setShowConfetti] = useState(false);

	// The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
	const network = WalletAdapterNetwork.Devnet;

	// You can also provide a custom RPC endpoint.
	const endpoint = useMemo(() => clusterApiUrl(network), [network]);

	const wallets = useMemo(
		() => [
			/**
			 * Wallets that implement either of these standards will be available automatically.
			 *
			 *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
			 *     (https://github.com/solana-mobile/mobile-wallet-adapter)
			 *   - Solana Wallet Standard
			 *     (https://github.com/solana-labs/wallet-standard)
			 *
			 * If you wish to support a wallet that supports neither of those standards,
			 * instantiate its legacy wallet adapter here. Common legacy adapters can be found
			 * in the npm package `@solana/wallet-adapter-wallets`.
			 */
			new UnsafeBurnerWalletAdapter(),
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[network],
	);
	return (
		<div className="relative">
			<ConnectionProvider endpoint={endpoint}>
				<WalletProvider wallets={wallets} autoConnect>
					<WalletModalProvider>
						<Navbar setMessage={setMessage} setShowConfetti={setShowConfetti} />
						<NFTs message={message} showConfetti={showConfetti} setShowConfetti={setShowConfetti} />
					</WalletModalProvider>
				</WalletProvider>
			</ConnectionProvider>
		</div>
	);
}
