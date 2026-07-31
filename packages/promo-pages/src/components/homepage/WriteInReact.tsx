import React from 'react';
import {CoordinateBlock} from './cult/Telemetry';
import {GetStarted} from './GetStartedStrip';

export const WriteInReact: React.FC = () => {
	return (
		<div>
			<div className="flex items-center gap-3 mb-6">
				<span className="hud text-muted shrink-0">§ 01</span>
				<div className="flex-1 h-px bg-[var(--border-color)]" />
				<span className="hud text-muted shrink-0">Case file: Motion</span>
			</div>
			<h1
				className="display text-5xl sm:text-6xl lg:text-[6.5rem] text-balance mb-0"
				style={{
					textShadow: '0 5px 40px var(--background)',
				}}
			>
				Make videos <span className="italic text-ember">programmatically</span>.
			</h1>
			<p
				style={{
					textShadow: '0 5px 30px var(--background)',
				}}
				className="fontbrand text-lg text-muted max-w-[46ch] mt-6 mb-0"
			>
				Create real MP4 videos with React. Use coding agents, build apps and
				render in bulk.
			</p>
			<div className="h-8" />
			<div>
				<GetStarted />
			</div>
			<div className="h-8" />
			<CoordinateBlock className="hairline-t pt-3" />
			<br />
			<br />
		</div>
	);
};
