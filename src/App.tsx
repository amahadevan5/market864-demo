import { useEffect } from 'react';
import { Market864Demo } from './pages/Market864Demo';


function App() {
  useEffect(() => { document.title = 'Market864 Attribution'; }, []);
  return <Market864Demo />;
}

export default App;
