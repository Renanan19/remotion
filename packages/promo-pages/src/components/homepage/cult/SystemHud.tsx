'use client';

import React from 'react';
import {cn} from '../../../cn';
import {useSessionTimer, useUtcClock} from './use-utc-clock';

const Field: React.FC<{
	readonly label: string;
	readonly value: React.ReactNode;
	readonly className?: string;
}> = ({label, value, className}) => {
	return (
		<div className={cn('hud flex items-center gap-1.5 shrink-0', className)}>
			<span className="text-muted">{label}</span>
			<span className="text-text">{value}</span>
		</div>
	);
};

const Divider: React.FC = () => (
	<div className="w-px h-3 bg-[var(--border-color)] shrink-0" />
);

const RecordingDot: React.FC = () => (
	<span
		className="inline-block w-[6px] h-[6px] rounded-full bg-signal shrink-0 motion-reduce:animate-none"
		style={{animation: 'rec-blink 1.6s steps(1, end) infinite'}}
	/>
);

/**
 * The instrument panel the whole page sits under: a hairline strip of
 * telemetry that never scrolls away. Reads as a capture session in progress.
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
					className="h-full w-[14%] opacity-15 motion-reduce:hidden"
					style={{
						background:
							'linear-gradient(90deg, transparent, var(--ember), transparent)',
						animation: 'hud-sweep 14s linear infinite',
					}}
				/>
			</div>
			<div className="relative max-w-[1200px] mx-auto px-4 h-8 flex items-center gap-3 overflow-x-auto no-scrollbar">
				<Field label="Mode:" value="RENDER_ACTIVE" />
				<Divider />
				<Field
					label="Access level:"
					value="Visitor"
					className="hidden sm:flex"
				/>
				<Divider />
				<div className="hud flex items-center gap-1.5 shrink-0">
					<RecordingDot />
					<span className="text-text">Recording</span>
					<span className="readout text-muted text-[10px]">{session}</span>
				</div>
				<div className="flex-1" />
				<Field
					label="Objective:"
					value="Ship the frame"
					className="hidden md:flex"
				/>
				<Divider />
				<Field label="Build:" value={version} className="hidden lg:flex" />
				<Divider />
				<Field label="UTC" value={utc ?? '--:--:--'} />
			</div>
		</div>
	);
};
