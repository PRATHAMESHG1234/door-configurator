import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import Catalog from './pages/Catalog';
import ConfiguratorPage from './pages/ConfiguratorPage';
// import QuoteRequest from './pages/QuoteRequest';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				{/* <Route
					path="/catalog"
					element={<Catalog />}
				/> */}
				<Route
					path="/configurator"
					element={<ConfiguratorPage />}
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
