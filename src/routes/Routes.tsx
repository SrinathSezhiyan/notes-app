import { createBrowserRouter } from "react-router-dom";
import HomePage from "../components/pages/HomePage";

export const Routes = createBrowserRouter([
	{ path: '*', element: <HomePage /> }
]);