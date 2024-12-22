import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
	<header style={{ background: '#333', color: '#fff', padding: '10px' }}>
		<nav>
			<Link
				to="/"
				style={{ marginRight: '10px', color: '#fff' }}
			>
				Home
			</Link>
			<Link
				to="/catalog"
				style={{ marginRight: '10px', color: '#fff' }}
			>
				Catalog
			</Link>
			<Link
				to="/configurator"
				style={{ marginRight: '10px', color: '#fff' }}
			>
				Configurator
			</Link>
			<Link
				to="/quote-request"
				style={{ color: '#fff' }}
			>
				Quote Request
			</Link>
		</nav>
	</header>
);

export default Header;
