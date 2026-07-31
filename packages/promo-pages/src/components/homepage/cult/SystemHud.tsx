'use client';

import React from 'react';
import {cn} from '../../../cn';
import {useSessionTimer, useUtcClock} from './use-utc-clock';

const Field: React.FC<{
	readonly label: string;
	readonly value: React.ReactNode;
	/**
	 * Fields drop out at narrow widths, so each one carries its own leading
	 * separator. A shared `<Divider />` between them left orphaned pipes
	 * behind on mobile.
	 */
	readonly className?: string;
}> = ({label, value, className}) => {
	return (
		<div className={cn('items-center gap-1.5 shrink-0', className)}>
			<span className="w-px h-3 bg-[var(--border-color)] mr-3" />
			<span className="hud text-muted">{label}</span>
			<span className="hud text-text">{value}</span>
		</div>
	);
};

const RecordingDot: React.FC = () => (
	<span
		className="inline-block w-[6px] h-[6px] rounded-full bg-signal shrink-0 motion-reduce:animate-none"
		style={{animation: 'rec-blink 2.4s ease-in-out infinite'}}
	/>
);

/**
 * The instrument panel the whole page sits under: a hairline strip of
 * telemetry that never scrolls away. Every field states something true —
 * invented status lines next to one live clock read as costume, so the
 * version is the real published version and the licence line is the real
 * threshold.
 */
export const SystemHud: React.FC<{
	readonly version: string;
	/**
	 * `fixed` when the landing owns the whole viewport, `inline` when it is
	 * embedded under another navbar (the docs site) and must not overlap it.
	 */
	readonly variant?: 'fixed' | 'inline';
}> = ({version, variant = 'inline'}) => {
	const utc = useUtcClock();
	const session = useSessionTimer();

	return (
		<div
			className={cn(
				'hairline-b bg-[var(--hud-bg)] backdrop-blur-md',
				variant === 'fixed'
					? 'fixed top-0 left-0 right-0 z-50'
					: 'relative w-full',
			)}
		>
			{/* Scanning sweep: a single pass of light along the strip. */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div
					className="h-full w-[18%] opacity-10 motion-reduce:hidden"
					style={{
						background:
							'linear-gradient(90deg, transparent, var(--ember), transparent)',
						animation: 'hud-sweep 22s linear infinite',
					}}
				/>
			</div>
			{/* Same column as the page below it, so the panel reads as its frame. */}
			<div className="relative max-w-[500px] lg:max-w-[1000px] mx-auto px-5 h-9 flex items-center gap-3 overflow-hidden">
				<div className="hud flex items-center gap-1.5 shrink-0">
					<RecordingDot />
					<span className="text-text">Live</span>
					<span className="readout text-muted normal-case">{session}</span>
				</div>
				<Field label="Version:" value={version} className="hidden sm:flex" />
				<Field
					label="Licence:"
					value="Free ≤ 3 devs"
					className="hidden lg:flex"
				/>
				<div className="flex-1" />
				<Field label="UTC" value={utc ?? '--:--:--'} className="flex" />
			</div>
		</div>
	);
};
