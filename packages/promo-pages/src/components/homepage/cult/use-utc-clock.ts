import {useEffect, useState} from 'react';

const format = (date: Date) => {
	const h = date.getUTCHours().toString().padStart(2, '0');
	const m = date.getUTCMinutes().toString().padStart(2, '0');
	const s = date.getUTCSeconds().toString().padStart(2, '0');
	return `${h}:${m}:${s}`;
};

/**
 * Wall clock in UTC, ticking once a second.
 * Starts empty so the server-rendered and the client markup agree.
 */
export const useUtcClock = () => {
	const [time, setTime] = useState<string | null>(null);

	useEffect(() => {
		setTime(format(new Date()));
		const interval = setInterval(() => {
			setTime(format(new Date()));
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return time;
};

/** Seconds elapsed since the component mounted, as `T+00:00:00`. */
export const useSessionTimer = () => {
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		const start = Date.now();
		const interval = setInterval(() => {
			setSeconds(Math.floor((Date.now() - start) / 1000));
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const h = Math.floor(seconds / 3600)
		.toString()
		.padStart(2, '0');
	const m = Math.floor((seconds % 3600) / 60)
		.toString()
		.padStart(2, '0');
	const s = (seconds % 60).toString().padStart(2, '0');

	return `T+${h}:${m}:${s}`;
};
