'use client';

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const App = () => {
    const [markdown, setMarkdown] = useState("");
    const [loadingText, setLoadingText] = useState("");

    useEffect(() => {
        const fetchPredictions = async () => {
            if (markdown) {
                const response = await fetch('http://localhost:8000/generate_next_paragraph', {
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
        <div className="flex flex-col h-screen font-['Open Sans']">
            <h1 className="text-2xl text-center py-4 font-['Aerial_Light']" >
                RAKO - Realtime Markdown Editor
            </h1>
            <div className="flex flex-1">
                <div className="editor w-1/2 p-4">
                    <textarea 
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        placeholder="Enter your text..."
                        className="w-full h-full p-2 border rounded resize-none font-['Open Sans']"
                    />
                </div>
                <div className="w-1/2 p-4 flex flex-col">
                    <div className="preview flex-1 border p-4 overflow-y-auto">
                        <ReactMarkdown className="prose font-['Open Sans']">{markdown}</ReactMarkdown>
                    </div>
                </div>
            </div>
       
        </div>
    );
};

export default App;
