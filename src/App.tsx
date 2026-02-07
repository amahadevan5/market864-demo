import { useEffect } from 'react';
import { WilliamsWealthDemo } from './pages/WilliamsWealthDemo';

function App() {
  useEffect(() => { document.title = 'Market864 Attribution'; }, []);
  return <WilliamsWealthDemo />;
}

export default App;
