import React, { useEffect, useState } from "react";
import Image from "next/image";
import MintButton from "./MintButton";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "../globals.css";

/**
 * A bit of a hack to force client-side rendering and prevent NextJS
 * Hydration errors with the WalletMultiButton component
 */
const ClientSideWalletMultiButton = (props) => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}

	return <WalletMultiButton {...props} />;
};

interface NavbarProps {
	setMessage: (message: string) => void;
	setShowConfetti: (showConfetti: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ setMessage, setShowConfetti }) => {
	return (
		<header className="w-full fixed top-0 z-50 bg-normal text-text shadow-xl">
			<nav className="container mx-auto">
				<div className="flex flex-row items-center justify-between pl-5">
					<Image src="/spaceLlamas.png" alt="Space Llamas" width={445} height={42} />
					<div className="my-1 flex flex-row">
						<div className="mr-2">
							<ClientSideWalletMultiButton /> {/* Using the wrapper here */}
						</div>
						<MintButton setMessage={setMessage} setShowConfetti={setShowConfetti} />
					</div>
				</div>
			</nav>
		</header>
	);
};
