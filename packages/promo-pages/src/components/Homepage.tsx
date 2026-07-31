'use client';

import React from 'react';
import {VERSION} from 'remotion';
import {BackgroundAnimation} from './homepage/BackgroundAnimation';
import CommunityStats from './homepage/CommunityStats';
import {BootSequence} from './homepage/cult/BootSequence';
import {Section} from './homepage/cult/Section';
import {SystemHud} from './homepage/cult/SystemHud';
import {TelemetryTicker} from './homepage/cult/Telemetry';
import {Demo} from './homepage/Demo';
import EvaluateRemotionSection from './homepage/EvaluateRemotion';
import type {ColorMode} from './homepage/layout/use-color-mode';
import {ColorModeProvider} from './homepage/layout/use-color-mode';
import {MakeVideosAgentically} from './homepage/MakeVideosAgentically';
import {MakeVideosInteractively} from './homepage/MakeVideosInteractively';
import {MakeVideosProgrammatically} from './homepage/MakeVideosProgrammatically';
import {NewsletterButton} from './homepage/NewsletterButton';
import {Pricing} from './homepage/Pricing';
import TrustedByBanner from './homepage/TrustedByBanner';
import {BuiltWithRemotionShowcase} from './homepage/VideoAppsShowcase';
import {WriteInReact} from './homepage/WriteInReact';

const makeVideosRowClassName = 'mt-4 md:mt-6 flex flex-col lg:flex-row gap-10';

const TICKER_ITEMS = [
	'Deterministic timeline · frame-addressed',
	'Chrome Headless Shell renderer',
	'AWS Lambda · Cloud Run · self-hosted',
	'MP4 · WebM · ProRes · GIF',
	'React 19',
] as const;

export const NewLanding: React.FC<{
	readonly colorMode: ColorMode;
	readonly setColorMode: (colorMode: ColorMode) => void;
	/**
	 * True when the landing owns the page (standalone dev server / bundle).
	 * The docs site embeds it under its own navbar and leaves this off.
	 */
	readonly standalone?: boolean;
}> = ({colorMode, setColorMode, standalone = false}) => {
	return (
		<ColorModeProvider colorMode={colorMode} setColorMode={setColorMode}>
			{standalone ? <BootSequence /> : null}
			<div className="w-full relative grain">
				<SystemHud
					version={VERSION}
					variant={standalone ? 'fixed' : 'inline'}
				/>
				<div style={{overflow: 'hidden'}}>
					<div>
						<BackgroundAnimation />
					</div>
					<div className={standalone ? 'h-20' : 'h-10'} />
					<div className="blueprint-grid max-w-[500px] lg:max-w-[1000px] m-auto pl-5 pr-5 overflow-x-clip md:overflow-x-visible relative">
						<WriteInReact />

						<Section index="02" subject="Capabilities" title="What it does">
							<div className={makeVideosRowClassName}>
								<MakeVideosAgentically
									videoSrc="/img/homepage-assets-master.webm"
									fallbackVideoSrc="/img/homepage-assets-master.mp4"
								/>
								<MakeVideosInteractively />
								<MakeVideosProgrammatically
									links={[
										{label: 'API Docs', href: '/docs/api'},
										{label: 'Resources', href: '/docs/resources'},
									]}
								/>
							</div>
							<div className={makeVideosRowClassName}>
								<MakeVideosProgrammatically
									title="Design systems"
									description="Create a library of animated assets for your organization."
									videoSrc="/img/design-systems.webm"
									fallbackVideoSrc="/img/design-systems.mp4"
									links={[
										{label: 'Motion design systems', href: '/design-systems'},
									]}
								/>
								<MakeVideosAgentically
									title="Batch rendering"
									description="Render millions of videos on your own infrastructure."
									links={[
										{
											label: 'Server-side rendering',
											href: '/docs/compare-ssr',
										},
										{
											label: 'Client-side rendering',
											href: '/docs/client-side-rendering',
										},
									]}
								/>
								<MakeVideosInteractively
									title="Applications"
									description="Publish a simple tool or a complex video editor."
									videoSrc="/img/applications.webm"
									fallbackVideoSrc="/img/applications.mp4"
									links={[
										{label: 'Player', href: '/docs/player'},
										{label: 'Editor Starter', href: '/editor-starter'},
									]}
								/>
							</div>
						</Section>

						<Demo />

						<Section
							index="04"
							subject="Field evidence"
							title="Built with Remotion"
						>
							<BuiltWithRemotionShowcase />
						</Section>
					</div>

					<TelemetryTicker items={TICKER_ITEMS} className="mt-16 md:mt-24" />

					<div className="blueprint-grid max-w-[500px] lg:max-w-[1000px] m-auto pl-5 pr-5 overflow-x-clip md:overflow-x-visible relative">
						{/*
						 * Proof of life comes before the price tag: a visitor should know
						 * the project is alive and who runs on it before being asked what
						 * it costs.
						 */}
						<Section
							index="05"
							subject="Community"
							title="Never build alone"
							note="Join a thriving community of developers."
							rule={false}
						>
							<CommunityStats />
							<TrustedByBanner />
						</Section>

						<Section
							index="06"
							subject="Terms"
							title="Pricing"
							note="No per-seat surprise. Read the licence before you deploy."
						>
							<Pricing />
						</Section>

						<Section index="07" subject="Assistance" title="Talk to a human">
							<EvaluateRemotionSection />
						</Section>

						<Section index="08" subject="Dispatch" title="Newsletter">
							<NewsletterButton />
						</Section>
						<div className="h-24" />
					</div>
				</div>
			</div>
		</ColorModeProvider>
	);
};
