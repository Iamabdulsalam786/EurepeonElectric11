import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import TemplatePage from './pages/TemplatePage';
import manifest from './content/manifest.json';
import { PRODUCTION_ROUTES } from './config/routes';

const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const InsightDetailPage = lazy(() => import('./pages/InsightDetailPage'));

function PageFallback() {
  return null;
}

export default function App() {
  const routes = Object.keys(manifest).filter((path) => PRODUCTION_ROUTES.includes(path));

  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map((path) => (
          <Route key={path} path={path} element={<TemplatePage />} />
        ))}
        <Route
          path="/services/:groupId"
          element={
            <Suspense fallback={<PageFallback />}>
              <ServiceDetailPage />
            </Suspense>
          }
        />
        <Route
          path="/services/:groupId/:serviceSlug"
          element={
            <Suspense fallback={<PageFallback />}>
              <ServiceDetailPage />
            </Suspense>
          }
        />
        <Route
          path="/insights/:insightSlug"
          element={
            <Suspense fallback={<PageFallback />}>
              <InsightDetailPage />
            </Suspense>
          }
        />
        <Route path="*" element={<TemplatePage />} />
      </Route>
    </Routes>
  );
}
