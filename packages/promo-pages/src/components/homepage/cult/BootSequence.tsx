'use client';

import React, {useEffect, useState} from 'react';

const LINES = [
	'> establishing uplink ......................... ok',
	'> loading @remotion/core 4.x .................. ok',
	'> mounting <Composition /> registry ........... ok',
	'> subject detected: developer',
	'> objective: make videos programmatically',
];

const LINE_INTERVAL = 110;
const HOLD_AFTER_LAST = 320;
const DISSOLVE = 420;
const STORAGE_KEY = 'remotion-boot-seen';

/**
 * A short cold-boot before the page resolves. Runs once per tab, is skipped
 * entirely under reduced motion, and never blocks interaction for longer than
 * it takes to read one line.
 */
export const BootSequence: React.FC = () => {
	const [visible, setVisible] = useState(false);
	const [shown, setShown] = useState(0);
	const [dissolving, setDissolving] = useState(false);

	useEffect(() => {
		const reduced = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches;
		const seen = window.sessionStorage.getItem(STORAGE_KEY) === '1';
		if (reduced || seen) {
			return;
		}

		window.sessionStorage.setItem(STORAGE_KEY, '1');
		setVisible(true);

		const timeouts: ReturnType<typeof setTimeout>[] = [];
		LINES.forEach((_, i) => {
			timeouts.push(setTimeout(() => setShown(i + 1), LINE_INTERVAL * (i + 1)));
		});

		const total = LINE_INTERVAL * LINES.length + HOLD_AFTER_LAST;
		timeouts.push(setTimeout(() => setDissolving(true), total));
		timeouts.push(setTimeout(() => setVisible(false), total + DISSOLVE));

		return () => timeouts.forEach(clearTimeout);
	}, []);

	if (!visible) {
		return null;
	}

	return (
		<div
			aria-hidden
			className="fixed inset-0 z-[100] bg-[var(--background)] flex items-center justify-center px-6"
			style={
				dissolving
					? {animation: `boot-dissolve ${DISSOLVE}ms ease-out forwards`}
					: undefined
			}
		>
			<div className="w-full max-w-[520px]">
				{LINES.slice(0, shown).map((line) => (
					<div
						key={line}
						className="readout text-[12px] leading-6 text-muted"
						style={{animation: 'boot-line-in 160ms ease-out both'}}
					>
						{line}
					</div>
				))}
				<div className="h-4 w-2 bg-signal mt-1 motion-reduce:hidden" />
			</div>
		</div>
	);
};
