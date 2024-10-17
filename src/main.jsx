import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import { AuthWrapper } from './context/auth.context.jsx';
import { ThemeWrapper } from './context/theme.context.jsx';

createRoot(document.getElementById('root')).render(
    <AuthWrapper>
      <ThemeWrapper>
        <Router>
          <App />
        </Router>
      </ThemeWrapper>
    </AuthWrapper>
  
)
