'use client';

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const App = () => {
    const [markdown, setMarkdown] = useState("");
    const [loadingText, setLoadingText] = useState("");

    useEffect(() => {
        const fetchPredictions = async () => {
            if (markdown) {
                const response = await fetch('./api/predict-next-sentence', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: markdown }),
                });
                const data = await response.json();
                setLoadingText(data.predictedSentence);
            }
        };
        fetchPredictions();
    }, [markdown]);

    return (
        <div className="container mx-auto p-4 flex">
            <div className="editor flex-1 mr-4">
                <textarea 
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    placeholder="Enter your text..."
                    className="w-full h-96 p-2 border rounded"
                />
            </div>
            <div className="preview flex-1 border p-4 h-96 overflow-y-auto">
                <h2 className="text-xl font-bold mb-2">Your Markdown Preview</h2>
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
        </div>
    );
};

export default App;
