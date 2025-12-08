import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { GraphQLProvider } from './graphql/client';

const endpoint = import.meta.env.VITE_BACKEND_BASE_URL?.replace(/\/+$/, "") + "/graphql" || "http://localhost:1337/graphql";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GraphQLProvider endpoint={endpoint}>
      <App />
    </GraphQLProvider>
  </StrictMode>,
);
