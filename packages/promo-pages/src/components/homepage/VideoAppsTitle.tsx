import React from 'react';

/**
 * Section header, filed like a dossier entry: a mono index rule on top,
 * the actual product title set in display serif underneath.
 */
export const SectionTitle: React.FC<{
	readonly children: React.ReactNode;
	readonly index?: string;
	readonly subject?: string;
	readonly note?: string;
}> = ({children, index = '00', subject, note}) => {
	return (
		<div className={'text-left'}>
			<div className="flex items-center gap-3">
				<span className="hud text-muted shrink-0">§ {index}</span>
				<div className="flex-1 h-px bg-[var(--border-color)]" />
				{subject ? (
					<span className="hud text-muted shrink-0">Subject: {subject}</span>
				) : null}
			</div>
			<h2 className={'display text-4xl md:text-5xl mt-4 mb-0'}>{children}</h2>
			{note ? <div className="hud text-muted mt-3">{note}</div> : null}
		</div>
	);
};
