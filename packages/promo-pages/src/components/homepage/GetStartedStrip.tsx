import React, {useState} from 'react';
import {PlateButton} from './cult/PlateButton';
import {GithubButton} from './GitHubButton';

export const GetStarted: React.FC = () => {
	const [clicked, setClicked] = useState<number | null>(null);

	return (
		<div className="flex flex-col lg:flex-row items-stretch lg:items-center w-full gap-2">
			<div className="w-full lg:w-auto">
				<div className="flex flex-row w-full relative">
					{clicked ? (
						<div
							key={clicked}
							style={{
								animation: 'click 0.7s linear',
								animationFillMode: 'forwards',
							}}
							className="absolute z-0 top-[-10px] hud text-center w-full"
						>
							Copied to clipboard
						</div>
					) : null}
					<PlateButton
						className="bg-text text-[var(--background)] w-full justify-start hover:opacity-90 hover:bg-text"
						onClick={() => {
							navigator.clipboard.writeText('npx create-video@latest');

							setClicked(Date.now());
						}}
						title="Click to copy"
					>
						<span className="text-signal mr-2">$</span>
						npx create-video@latest
					</PlateButton>
				</div>
			</div>
			<div className="w-full lg:w-auto">
				<PlateButton href="/docs" className="w-full">
					Docs
				</PlateButton>
			</div>
			<div className="w-full lg:w-auto">
				<PlateButton
					href="https://remotion.dev/discord"
					target="_blank"
					className="w-full"
				>
					Discord
				</PlateButton>
			</div>
			<div className="w-full lg:w-auto">
				<PlateButton
					href="https://github.com/remotion-dev/remotion"
					target="_blank"
					className="w-full"
				>
					<GithubButton />
				</PlateButton>
			</div>
		</div>
	);
};
