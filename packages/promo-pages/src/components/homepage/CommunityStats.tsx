import React from 'react';
import {TelemetryCell} from './cult/Telemetry';

type Metric = {
	readonly label: string;
	readonly value: string;
	readonly href: string;
};

const METRICS: readonly Metric[] = [
	{
		label: 'Installs per month',
		value: '5M+',
		href: 'https://www.npmjs.com/package/remotion',
	},
	{
		label: 'Pages of docs',
		value: '1000',
		href: 'https://www.remotion.dev/docs/',
	},
	{
		label: 'Templates & examples',
		value: '35',
		href: 'https://www.remotion.dev/templates',
	},
	{
		label: 'GitHub stars',
		value: '55K',
		href: 'https://github.com/remotion-dev/remotion',
	},
	{
		label: 'Discord members',
		value: '10K+',
		href: 'https://remotion.dev/discord',
	},
	{
		label: 'Contributors',
		value: '300+',
		href: 'https://github.com/remotion-dev/remotion/graphs/contributors',
	},
];

const CommunityStats: React.FC = () => (
	<div className={'m-auto'}>
		<div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'}>
			{METRICS.map((metric) => (
				<a
					key={metric.label}
					target="_blank"
					href={metric.href}
					className={'no-underline text-inherit block'}
				>
					<TelemetryCell
						label={metric.label}
						odometer={metric.value}
						value={metric.value}
					/>
				</a>
			))}
		</div>
	</div>
);

export default CommunityStats;
