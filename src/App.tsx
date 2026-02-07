import { useEffect } from 'react';
import { WilliamsWealthDemo } from './pages/WilliamsWealthDemo';

function App() {
  useEffect(() => { document.title = 'Williams Wealth Attribution'; }, []);
  return <WilliamsWealthDemo />;
}

export default App;
