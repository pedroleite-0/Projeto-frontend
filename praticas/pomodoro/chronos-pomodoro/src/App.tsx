import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import { AuthContextProvider } from './contexts/AuthContext/AuthContextProvider'; // Faltava este
import { MessagesContainer } from './components/MessagesContainer';
import { MainRouter } from './routers/MainRouter';
import { BrowserRouter } from 'react-router-dom'; // Faltava este
import './styles/theme.css';
import './styles/global.css';

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <TaskContextProvider>
          <MessagesContainer>
            <MainRouter />
          </MessagesContainer>
        </TaskContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}