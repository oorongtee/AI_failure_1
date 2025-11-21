import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { AlertCircle, RefreshCw } from 'lucide-react';

// Layout Components
import MainLayout from './layout/MainLayout';

// Route Configuration
import { routes } from './config/routes';

// Error Fallback Component
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800/50 backdrop-blur-md border border-red-500/30 rounded-xl p-8 text-center max-w-md">
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
        <p className="text-slate-300 mb-6">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="flex items-center gap-2 mx-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      </div>
    </div>
  );
};

// Loading Fallback Component
const LoadingFallback = () => {
  return (
    <div className="min-h-screen bg-gradient-cosmic flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-neutral-300 text-lg font-display">Loading...</p>
      </div>
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {routes.map(route => (
                <Route
                  key={route.path}
                  path={route.path === '/' ? '/' : route.path}
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <route.element />
                    </Suspense>
                  }
                />
              ))}
            </Route>
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
