'use client';

import React from 'react';
import {cn} from '../../../cn';
import {Odometer} from './Odometer';

/**
 * Where the company actually is, stated the way an instrument would state it.
 * Zurich, Switzerland — Remotion GmbH.
 */
export const COORDINATES = '47° 22′ 35.0″ N, 8° 32′ 24.0″ E';

export const CoordinateBlock: React.FC<{
	readonly className?: string;
}> = ({className}) => {
	return (
		<div className={cn('hud text-muted flex flex-wrap gap-x-4', className)}>
			<span className="readout text-[11px] tracking-[0.1em]">
				{COORDINATES}
			</span>
		</div>
	);
};

const SPECS: readonly {label: string; value: string}[] = [
	{label: 'Output', value: 'MP4 · WebM · ProRes · GIF'},
	{label: 'Runtime', value: 'React 19'},
	{label: 'Renderer', value: 'Chrome Headless Shell'},
	{label: 'Scale', value: 'Lambda · Cloud Run · self-hosted'},
	{label: 'Timeline', value: 'Deterministic, frame-addressed'},
	{label: 'Licence', value: 'Free for teams of up to 3'},
];

/**
 * The four questions a developer actually has, answered at reading size.
 * This used to be a marquee, where it scrolled past faster than it could be
 * read and clipped mid-word at both column edges.
 */
export const SpecGrid: React.FC<{readonly className?: string}> = ({
	className,
}) => {
	return (
		<dl
			className={cn(
				'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 hairline-t',
				className,
			)}
		>
			{SPECS.map((spec) => (
				<div key={spec.label} className="py-3 hairline-b">
					<dt className="hud text-muted">{spec.label}</dt>
					<dd className="term text-text mt-1 ml-0">{spec.value}</dd>
				</div>
			))}
		</dl>
	);
};

/**
 * A key/value plate. The label states what the number is; there is no second,
 * decorative label above it to decode first.
 */
export const TelemetryCell: React.FC<{
	readonly label: string;
	readonly value: React.ReactNode;
	readonly odometer?: string;
}> = ({label, value, odometer}) => {
	return (
		<div className="corner-ticks border-effect bg-pane px-5 py-5 flex flex-col justify-between min-h-[104px]">
			<div className="readout text-3xl md:text-4xl">
				{odometer ? <Odometer value={odometer} /> : value}
			</div>
			<div className="hud text-muted mt-3">{label}</div>
		</div>
	);
};

/**
 * Continuous readout strip. Full-bleed so it reads as tape running past the
 * page rather than as text clipped by a column, with the copy fading out at
 * both edges instead of being cut mid-word.
 */
export const TelemetryTicker: React.FC<{
	readonly items: readonly string[];
	readonly className?: string;
}> = ({items, className}) => {
	// Exactly two passes: the keyframe travels -50%, so the seam never shows.
	const line = [...items, ...items];

	return (
		<div
			className={cn(
				'hairline-t hairline-b overflow-hidden py-2.5 select-none w-full',
				className,
			)}
			style={{
				maskImage:
					'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
				WebkitMaskImage:
					'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
			}}
			aria-hidden
		>
			<div
				className="flex w-max motion-reduce:animate-none"
				style={{animation: 'ticker-scroll 60s linear infinite'}}
			>
				{line.map((item, i) => (
					<div key={i} className="hud text-muted flex items-center shrink-0">
						<span className="px-6">{item}</span>
						<span className="text-[var(--border-color)]">|</span>
					</div>
				))}
			</div>
		</div>
	);
};
