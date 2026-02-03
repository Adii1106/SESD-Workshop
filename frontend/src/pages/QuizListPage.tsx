import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { PixelCard } from '../components/PixelCard';
import { PixelButton } from '../components/PixelButton';

interface Quiz {
    id: string;
    title: string;
    creatorId: string;
}

export const QuizListPage: React.FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);

    useEffect(() => {
        api.get('/quizzes')
            .then(res => setQuizzes(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>AVAILABLE QUIZZES</h2>
            {quizzes.length === 0 && <p>No quizzes yet. Go create one!</p>}

            <div style={{ display: 'grid', gap: '20px' }}>
                {quizzes.map(quiz => (
                    <PixelCard key={quiz.id} style={{ marginBottom: '0' }}>
                        <h3>{quiz.title}</h3>
                        <p style={{ fontSize: '10px', color: '#666' }}>ID: {quiz.id.slice(0, 8)}...</p>
                        <Link to={`/attempt/${quiz.id}`}>
                            <PixelButton variant="primary" style={{ marginTop: '10px' }}>
                                PLAY NOW
                            </PixelButton>
                        </Link>
                    </PixelCard>
                ))}
            </div>
        </div>
    );
};
