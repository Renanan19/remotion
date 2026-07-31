import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {NewLanding} from './components/Homepage';
import './index.css';

// Dark is the operating mode of the landing; light stays available as the
// declassified-paper variant.
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<div data-theme="dark" className="min-h-screen bg-[var(--background)]">
			<NewLanding colorMode="dark" setColorMode={() => {}} standalone />
		</div>
	</StrictMode>,
);
