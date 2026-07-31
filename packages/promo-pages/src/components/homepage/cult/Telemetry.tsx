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
		<div
			className={cn('hud text-muted flex flex-wrap gap-x-4 gap-y-1', className)}
		>
			<span>Origin: Zurich, CH</span>
			<span className="readout text-[10px] tracking-[0.12em]">
				{COORDINATES}
			</span>
		</div>
	);
};

/**
 * A key/value plate. The label is instrument chrome, the value is the product
 * fact — never the other way around.
 */
export const TelemetryCell: React.FC<{
	readonly label: string;
	readonly value: React.ReactNode;
	readonly odometer?: string;
	readonly caption?: string;
}> = ({label, value, odometer, caption}) => {
	return (
		<div className="corner-ticks border-effect bg-pane px-4 py-4 flex flex-col justify-between min-h-[104px]">
			<div className="hud-sm text-muted">{label}</div>
			<div className="mt-3 flex items-baseline gap-2">
				{odometer ? (
					<Odometer value={odometer} className="text-3xl md:text-4xl" />
				) : (
					<span className="display text-3xl md:text-4xl">{value}</span>
				)}
			</div>
			{caption ? <div className="hud-sm text-muted mt-2">{caption}</div> : null}
		</div>
	);
};

/**
 * Continuous readout strip. Duplicated once so the loop has no seam, and the
 * copy stays factual — it is the frame around the product, not a claim.
 */
export const TelemetryTicker: React.FC<{
	readonly items: readonly string[];
	readonly className?: string;
}> = ({items, className}) => {
	const line = [...items, ...items];

	return (
		<div
			className={cn(
				'hairline-t hairline-b overflow-hidden py-2 select-none',
				className,
			)}
		>
			<div
				className="flex w-max motion-reduce:animate-none"
				style={{animation: 'ticker-scroll 48s linear infinite'}}
			>
				{line.map((item, i) => (
					<div key={i} className="hud text-muted flex items-center shrink-0">
						<span className="px-5">{item}</span>
						<span className="text-signal">/</span>
					</div>
				))}
			</div>
		</div>
	);
};
