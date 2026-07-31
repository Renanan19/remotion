import {Button} from '@remotion/design';
import React from 'react';
import {cn} from '../../../cn';

type PlateButtonProps = React.ComponentProps<typeof Button>;

/**
 * The design-system button, filed down to a plate: square corners, one
 * hairline, mono label. Keeps the shared component (and its hover physics)
 * instead of forking it — only the surface treatment changes.
 */
export const PlateButton: React.FC<PlateButtonProps> = ({
	className,
	...props
}) => {
	return (
		<Button
			{...(props as PlateButtonProps)}
			className={cn(
				'rounded-none border border-b border-[var(--border-color)] bg-pane text-text',
				'hud-lg h-11 px-5 transition-colors hover:bg-[var(--clear-hover)]',
				className,
			)}
		/>
	);
};
