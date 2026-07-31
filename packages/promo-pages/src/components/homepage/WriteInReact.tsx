import React from 'react';
import {CoordinateBlock, SpecGrid} from './cult/Telemetry';
import {GetStarted} from './GetStartedStrip';

export const WriteInReact: React.FC = () => {
	return (
		<div className="pt-6">
			<div className="flex items-start gap-3 mb-8">
				<span className="hud text-muted shrink-0">§ 01</span>
				<div className="flex-1 h-px bg-[var(--border-color)] mt-[6px]" />
				<span className="hud text-muted shrink-0 text-right">
					Case file: Motion
				</span>
			</div>
			<div className="flex flex-col lg:flex-row lg:items-end gap-6">
				<h1 className="display text-5xl sm:text-7xl lg:text-[6.5rem] text-balance mb-0 flex-1">
					Make videos <span className="italic">programmatically</span>.
				</h1>
				{/* Anchors the right edge that the headline leaves open. */}
				<div className="hud text-muted shrink-0 lg:w-[16ch] lg:text-right lg:pb-4 leading-[2]">
					<div>Remotion GmbH</div>
					<div>Zurich, CH</div>
					<div className="text-text">Since 2021</div>
				</div>
			</div>
			<p className="term-lg text-muted max-w-[52ch] mt-8 mb-0">
				Create real MP4 videos with React. Use coding agents, build apps and
				render in bulk.
			</p>
			<div className="h-8" />
			<GetStarted />
			<div className="h-10" />
			<SpecGrid />
			<CoordinateBlock className="mt-3" />
		</div>
	);
};
