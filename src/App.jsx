import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
// import QuoteRequest from './pages/QuoteRequest';
import { Header, Footer } from './components/Header';
import { DoorConfigurator } from './pages/configurator/DoorConfigurator';

const App = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/catalog"
					element={<Catalog />}
				/>
				<Route
					path="/configurator/:doorId?"
					element={<DoorConfigurator />}
				/>
				{/* <Route
					path="/quote-request"
					element={<QuoteRequest />}
				/> */}
			</Routes>
			<Footer />
		</Router>
	);
};

export default App;
