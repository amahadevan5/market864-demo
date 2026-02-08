import { useEffect } from 'react';
import { Market864Demo } from './pages/Market864Demo';
import { ToastProvider } from './components/ToastProvider';


function App() {
  useEffect(() => { document.title = 'Market864 Attribution'; }, []);
  return (
    <ToastProvider>
      <Market864Demo />
    </ToastProvider>
  );
}

export default App;
