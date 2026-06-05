import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import TemplatePage from './pages/TemplatePage';
import manifest from './content/manifest.json';
import { DISABLED_STANDALONE_SERVICE_PAGES } from './config/routes';

export default function App() {
  const routes = Object.keys(manifest).filter(
    (path) => !DISABLED_STANDALONE_SERVICE_PAGES.includes(path),
  );

  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map((path) => (
          <Route key={path} path={path} element={<TemplatePage />} />
        ))}
        <Route path="*" element={<TemplatePage />} />
      </Route>
    </Routes>
  );
}
