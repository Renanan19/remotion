'use client';

import React, {useEffect, useRef, useState} from 'react';
import {cn} from '../../../cn';

// Three passes of 0-9 so a digit visibly rolls before it lands.
const STRIP = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const LOOPS = 3;
const CELLS = STRIP.length * LOOPS;

const Digit: React.FC<{
	readonly digit: number;
	readonly index: number;
	readonly rolling: boolean;
}> = ({digit, index, rolling}) => {
	const landed = STRIP.length * (LOOPS - 1) + digit;

	return (
		<span
			className="inline-block overflow-hidden align-baseline"
			style={{height: '1em'}}
		>
			<span
				className="flex flex-col"
				style={{
					transform: `translateY(${rolling ? -landed * (100 / CELLS) : 0}%)`,
					transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
					transitionDelay: `${index * 45}ms`,
				}}
			>
				{Array.from({length: CELLS}, (_, i) => (
					<span key={i} style={{height: '1em', lineHeight: '1em'}}>
						{STRIP[i % STRIP.length]}
					</span>
				))}
			</span>
		</span>
	);
};

/**
 * Mechanical counter: every digit rolls up through 0-9 and lands on its value.
 * Non-numeric characters (K, M, +, %) stay fixed so units never scramble.
 */
export const Odometer: React.FC<{
	readonly value: string;
	readonly className?: string;
}> = ({value, className}) => {
	const ref = useRef<HTMLSpanElement>(null);
	const [rolling, setRolling] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) {
			return;
		}

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			setRolling(true);
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					setRolling(true);
					observer.disconnect();
				}
			},
			{threshold: 0.4},
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	let digitIndex = -1;

	return (
		<span
			ref={ref}
			className={cn(
				'readout inline-flex items-baseline leading-none',
				className,
			)}
		>
			<span className="sr-only">{value}</span>
			<span aria-hidden className="inline-flex items-baseline">
				{value.split('').map((char, i) => {
					if (char >= '0' && char <= '9') {
						digitIndex++;
						return (
							<Digit
								key={i}
								digit={Number(char)}
								index={digitIndex}
								rolling={rolling}
							/>
						);
					}

					return <span key={i}>{char}</span>;
				})}
			</span>
		</span>
	);
};
