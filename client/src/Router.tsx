import { Route, createBrowserRouter, createRoutesFromChildren } from "react-router-dom";
import App from "./App";
import { lazy } from "react";

// pages lazy import
const Landing = lazy(() => import('./pages/Landing'));

const router = createBrowserRouter(
    createRoutesFromChildren(
        <Route>
            <Route element={<App />}>
                <Route path="/" element={<Landing />} />
            </Route>
        </Route>
    )
)

export default router;