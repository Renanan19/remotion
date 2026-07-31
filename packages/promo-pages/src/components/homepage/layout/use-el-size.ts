import {useCallback, useEffect, useMemo, useState} from 'react';

export type Size = {
	width: number;
	height: number;
};

/**
 * Every measurement used to allocate a fresh object, so a ResizeObserver that
 * fired with unchanged dimensions still re-rendered the consumer — and if that
 * render nudged layout at all, the two fed each other until React bailed out
 * with "Maximum update depth exceeded". Keeping the previous object when the
 * numbers are identical breaks the cycle at the source.
 */
const sameSize = (a: Size | null, b: Size) =>
	a !== null && a.width === b.width && a.height === b.height;

export const useElementSize = (ref: HTMLElement | null): Size | null => {
	const [size, setSize] = useState<Size | null>(null);

	const setSizeIfChanged = useCallback((next: Size) => {
		setSize((prev) => (sameSize(prev, next) ? prev : next));
	}, []);

	const observer = useMemo(() => {
		if (typeof ResizeObserver === 'undefined') {
			return;
		}

		return new ResizeObserver((entries) => {
			setSizeIfChanged({
				width: entries[0].contentRect.width,
				height: entries[0].contentRect.height,
			});
		});
	}, [setSizeIfChanged]);

	const updateSize = useCallback(() => {
		if (ref === null) {
			return;
		}

		const rect = ref.getClientRects();
		if (!rect[0]) {
			return;
		}

		setSizeIfChanged({
			width: rect[0].width,
			height: rect[0].height,
		});
	}, [ref, setSizeIfChanged]);

	useEffect(() => {
		updateSize();
		if (!observer) {
			return;
		}

		if (ref) {
			observer.observe(ref);
		}

		return (): void => {
			if (ref) {
				observer.unobserve(ref);
			}
		};
	}, [observer, ref, updateSize]);
	return size;
};
