import React, {useState} from 'react';
import {PlateButton} from './cult/PlateButton';
import {GithubButton} from './GitHubButton';

const CopyIcon: React.FC = () => (
	<svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
		<rect
			x="4.75"
			y="4.75"
			width="8.5"
			height="8.5"
			stroke="currentColor"
			strokeWidth="1.2"
		/>
		<path
			d="M9.25 2.25H0.75V10.75"
			stroke="currentColor"
			strokeWidth="1.2"
			fill="none"
		/>
	</svg>
);

export const GetStarted: React.FC = () => {
	const [clicked, setClicked] = useState<number | null>(null);

	return (
		<div className="flex flex-col lg:flex-row lg:items-center w-full gap-2">
			<div className="w-full lg:w-auto">
				<div className="flex flex-row w-full relative">
					{clicked ? (
						<div
							key={clicked}
							style={{
								animation: 'click 0.7s linear',
								animationFillMode: 'forwards',
							}}
							className="absolute z-0 top-[-10px] hud w-full"
						>
							Copied to clipboard
						</div>
					) : null}
					{/*
					 * The only control here that does not navigate, so it says so
					 * with a copy glyph rather than a title attribute alone.
					 */}
					<PlateButton
						className="bg-text text-[var(--background)] w-full justify-between gap-6 hover:opacity-90 hover:bg-text"
						onClick={() => {
							navigator.clipboard.writeText('npx create-video@latest');

							setClicked(Date.now());
						}}
						title="Click to copy"
					>
						<span>
							<span className="text-signal mr-2">$</span>
							npx create-video@latest
						</span>
						<CopyIcon />
					</PlateButton>
				</div>
			</div>
			{/*
			 * Secondary actions stay on one row on mobile, so the install command
			 * keeps its rank instead of becoming one of four identical plates.
			 */}
			<div className="flex flex-row gap-2 w-full lg:w-auto">
				<PlateButton href="/docs" className="flex-1 lg:flex-none">
					Docs
				</PlateButton>
				<PlateButton
					href="https://remotion.dev/discord"
					target="_blank"
					className="flex-1 lg:flex-none"
				>
					Discord
				</PlateButton>
				<PlateButton
					href="https://github.com/remotion-dev/remotion"
					target="_blank"
					className="flex-1 lg:flex-none"
				>
					<GithubButton />
				</PlateButton>
			</div>
		</div>
	);
};
