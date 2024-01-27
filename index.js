import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import App from './App';

const App = () => (
	<TailwindProvider utilities={utilities}>
		<App />
	</TailwindProvider>
);

export default App;