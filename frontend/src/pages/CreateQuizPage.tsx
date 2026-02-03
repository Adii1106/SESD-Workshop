import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { PixelCard } from '../components/PixelCard';
import { PixelButton } from '../components/PixelButton';

export const CreateQuizPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [statements, setStatements] = useState(['', '', '']);
    const [lieIndex, setLieIndex] = useState<number | null>(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleStatementChange = (index: number, value: string) => {
        const newStatements = [...statements];
        newStatements[index] = value;
        setStatements(newStatements);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (lieIndex === null) {
            setError('Please mark one statement as the LIE!');
            return;
        }

        const payload = {
            title,
            statements: statements.map((text, idx) => ({
                text,
                isLie: idx === lieIndex
            }))
        };

        try {
            await api.post('/quizzes', payload);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error creating quiz');
        }
    };

    return (
        <PixelCard title="CREATE NEW QUIZ">
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label>QUIZ TITLE</label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="e.g. My Coding Facts"
                        style={{ width: '100%', padding: '10px', border: '2px solid #000', marginTop: '5px', fontFamily: 'inherit' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>enter 3 statements & click the radio button for the LIE:</div>

                {statements.map((st, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <input
                            type="radio"
                            name="lie"
                            checked={lieIndex === idx}
                            onChange={() => setLieIndex(idx)}
                            style={{ marginRight: '10px', transform: 'scale(1.5)' }}
                        />
                        <input
                            type="text"
                            value={st}
                            onChange={e => handleStatementChange(idx, e.target.value)}
                            placeholder={`Statement ${idx + 1}`}
                            style={{ flex: 1, padding: '10px', border: '2px solid #000', fontFamily: 'inherit' }}
                        />
                    </div>
                ))}

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <PixelButton type="submit" variant="accent">PUBLISH QUIZ</PixelButton>
            </form>
        </PixelCard>
    );
};
