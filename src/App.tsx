import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AppRoutes } from './AppRoutes';

function App() {

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppRoutes/>
    </BrowserRouter>
  );
}

export default App;