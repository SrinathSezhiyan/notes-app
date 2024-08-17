import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { Routes } from './routes/Routes';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RouterProvider router={Routes} />
			</PersistGate>
		</Provider>
	);
}

export default App;
