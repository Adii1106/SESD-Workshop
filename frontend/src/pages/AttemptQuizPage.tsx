import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { PixelCard } from '../components/PixelCard';
import { PixelButton } from '../components/PixelButton';

interface Quiz {
    id: string;
    title: string;
    statements: { text: string; id: number }[];
}

export const AttemptQuizPage: React.FC = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [result, setResult] = useState<{ success: boolean; correctLieIndex: number } | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/quizzes/${id}`)
            .then(res => setQuiz(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const handleGuess = async (index: number) => {
        try {
            const res = await api.post(`/quizzes/${id}/attempt`, { selectedStatementIndex: index });
            setResult(res.data);
        } catch (err) {
            alert('Something went wrong!');
        }
    };

    if (!quiz) return <div>Loading...</div>;

    if (result) {
        return (
            <PixelCard title="RESULTS" style={{ textAlign: 'center' }}>
                {result.success ? (
                    <h2 style={{ color: 'green' }}>YOU CAUGHT THE LIAR!</h2>
                ) : (
                    <h2 style={{ color: 'red' }}>YOU WERE FOOLED!</h2>
                )}

                <p>The lie was statement #{result.correctLieIndex + 1}</p>
                <div style={{ marginTop: '20px' }}>
                    <PixelButton onClick={() => navigate('/')}>BACK TO HOME</PixelButton>
                </div>
            </PixelCard>
        );
    }

    return (
        <PixelCard title={`By: Unknown`}>
            <h2>{quiz.title}</h2>
            <p>Select the one you think is the LIE:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                {quiz.statements.map((s, idx) => (
                    <PixelButton
                        key={idx}
                        variant="secondary"
                        onClick={() => handleGuess(idx)}
                        style={{ textAlign: 'left' }}
                    >
                        {idx + 1}. {s.text}
                    </PixelButton>
                ))}
            </div>
        </PixelCard>
    );
};
