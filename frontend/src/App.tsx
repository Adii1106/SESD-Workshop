import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/LoginPage';
import { QuizListPage } from './pages/QuizListPage';
import { CreateQuizPage } from './pages/CreateQuizPage';
import { AttemptQuizPage } from './pages/AttemptQuizPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route path="/" element={<Layout />}>
                    <Route index element={<QuizListPage />} />
                    <Route path="create" element={<PrivateRoute><CreateQuizPage /></PrivateRoute>} />
                    <Route path="attempt/:id" element={<PrivateRoute><AttemptQuizPage /></PrivateRoute>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

// Simple PrivateRoute wrapper
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

export default App;
