import React from 'react';
import {TelemetryCell} from './cult/Telemetry';
import {SectionTitle} from './VideoAppsTitle';

type Metric = {
	readonly label: string;
	readonly value: string;
	readonly caption: string;
	readonly href: string;
};

const METRICS: readonly Metric[] = [
	{
		label: 'Registry pulls',
		value: '5M+',
		caption: 'installs per month',
		href: 'https://www.npmjs.com/package/remotion',
	},
	{
		label: 'Written record',
		value: '1000',
		caption: 'pages of docs',
		href: 'https://www.remotion.dev/docs/',
	},
	{
		label: 'Starting points',
		value: '35',
		caption: 'templates & examples',
		href: 'https://www.remotion.dev/templates',
	},
	{
		label: 'Public approval',
		value: '53K',
		caption: 'GitHub stars',
		href: 'https://github.com/remotion-dev/remotion',
	},
	{
		label: 'Assembly',
		value: '10K+',
		caption: 'Discord members',
		href: 'https://remotion.dev/discord',
	},
	{
		label: 'Hands on the code',
		value: '300+',
		caption: 'contributors',
		href: 'https://github.com/remotion-dev/remotion/graphs/contributors',
	},
];

const CommunityStats: React.FC = () => (
	<div className={'m-auto'}>
		<SectionTitle
			index="07"
			subject="Congregation"
			note="Join a thriving community of developers."
		>
			Never build alone
		</SectionTitle>
		<div className="h-8" />
		<div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'}>
			{METRICS.map((metric) => (
				<a
					key={metric.caption}
					target="_blank"
					href={metric.href}
					className={'no-underline text-inherit block'}
				>
					<TelemetryCell
						label={metric.label}
						odometer={metric.value}
						value={metric.value}
						caption={metric.caption}
					/>
				</a>
			))}
		</div>
	</div>
);

export default CommunityStats;
