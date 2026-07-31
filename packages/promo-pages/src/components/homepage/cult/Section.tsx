import React from 'react';
import {cn} from '../../../cn';
import {SectionTitle} from '../VideoAppsTitle';

/**
 * One rhythm value for the whole page, one hairline per boundary. Sections
 * used to be separated by stacks of `<br />`, which made the gap depend on
 * whatever line-height happened to be inherited.
 */
export const Section: React.FC<{
	readonly children: React.ReactNode;
	readonly index?: string;
	readonly subject?: string;
	readonly title?: React.ReactNode;
	readonly note?: string;
	readonly className?: string;
	readonly rule?: boolean;
}> = ({children, index, subject, title, note, className, rule = true}) => {
	return (
		<section
			className={cn('pt-16 md:pt-24', rule && 'full-bleed-rule', className)}
		>
			{title ? (
				<SectionTitle index={index} subject={subject} note={note}>
					{title}
				</SectionTitle>
			) : null}
			<div className={title ? 'mt-8 md:mt-10' : undefined}>{children}</div>
		</section>
	);
};
