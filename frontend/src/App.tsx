import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";

const Layout = lazy(() => import("./components/layout/Layout"));
const Home = lazy(() => import("./pages/Home"));
const DynamicPages = lazy(() => import("./pages/DynamicPages"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Router>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/:slug" element={<DynamicPages />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
