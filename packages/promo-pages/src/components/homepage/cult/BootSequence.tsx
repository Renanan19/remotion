'use client';

import React, {useEffect, useState} from 'react';

const LINES = [
	'> establishing uplink ......................... ok',
	'> mounting <Composition /> registry ........... ok',
	'> ready',
];

// Kept under half a second end to end: a cold boot is a signature, a splash
// screen is a tax on the one visitor who has never seen the page.
const LINE_INTERVAL = 70;
const HOLD_AFTER_LAST = 120;
const DISSOLVE = 260;
const STORAGE_KEY = 'remotion-boot-seen';

const shouldRun = () => {
	if (typeof window === 'undefined') {
		return false;
	}

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		return false;
	}

	return window.sessionStorage.getItem(STORAGE_KEY) !== '1';
};

/**
 * A short cold boot before the page resolves. Runs once per tab and is skipped
 * entirely under reduced motion.
 *
 * The "seen" flag is written when the sequence *finishes*, not when it starts:
 * StrictMode mounts effects twice, and marking it up front meant the second
 * pass bailed out after the first pass had already shown the overlay and had
 * its timers cleared — leaving a black screen with a blinking cursor and
 * nothing behind it.
 */
export const BootSequence: React.FC = () => {
	const [visible, setVisible] = useState(false);
	const [shown, setShown] = useState(0);
	const [dissolving, setDissolving] = useState(false);

	useEffect(() => {
		if (!shouldRun()) {
			return;
		}

		setVisible(true);
		setShown(0);
		setDissolving(false);

		const timeouts: ReturnType<typeof setTimeout>[] = [];
		LINES.forEach((_, i) => {
			timeouts.push(setTimeout(() => setShown(i + 1), LINE_INTERVAL * (i + 1)));
		});

		const total = LINE_INTERVAL * LINES.length + HOLD_AFTER_LAST;
		timeouts.push(setTimeout(() => setDissolving(true), total));
		timeouts.push(
			setTimeout(() => {
				window.sessionStorage.setItem(STORAGE_KEY, '1');
				setVisible(false);
			}, total + DISSOLVE),
		);

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
