import React, { useState, useRef, useEffect } from 'react';
import { generateAIResponse } from '../data/scenarios';

const AIChat = ({ networkData, onAccidentSimulation, selectedElement, onClearAccident, hasActiveAccident }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'assistant',
            content: `
        <p>Welcome to the <span class="highlight">GTS Intelligent Analyzer</span>!</p>
        <p>I will help you analyze the gas transmission system, provide current parameters, and simulate emergency scenarios.</p>
        <p>Ask a question or select an element on the map to get started.</p>
      `,
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [conversationContext, setConversationContext] = useState({});
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Добавляем сообщение при выборе элемента на карте
    useEffect(() => {
        if (selectedElement) {
            const { type, data } = selectedElement;
            const elementName = type === 'station' ? data.name : data.name;

            addAssistantMessage(`
        <p>You selected: <span class="highlight">${elementName}</span></p>
        <p>Parameters are displayed on the left panel. You can ask me:</p>
        <ul>
          <li>"What happens during an emergency on this section?"</li>
          <li>"What are the current parameters?"</li>
        </ul>
      `);
        }
    }, [selectedElement]);

    const addAssistantMessage = (content) => {
        setMessages(prev => [...prev, {
            id: Date.now(),
            type: 'assistant',
            content,
        }]);
    };

    const quickActions = hasActiveAccident ? [
        { label: '✓ Clear Accident', query: null, action: 'clear' },
    ] : [
        { label: '💥 Pipeline Rupture', query: 'Simulate accident on Line 1' },
        { label: '💥 Main Trunk Failure', query: 'Simulate accident on Line 5' },
        { label: '⚙️ Station Failure', query: 'Simulate station failure' },
        { label: '📊 System Status', query: 'Show system status' },
    ];

    const handleSend = async (directMessage = null) => {
        const userMessage = directMessage || inputValue.trim();
        if (!userMessage) return;

        if (!directMessage) {
            setInputValue('');
        }

        // Add user message
        setMessages(prev => [...prev, {
            id: Date.now(),
            type: 'user',
            content: userMessage,
        }]);

        // Show typing indicator
        setIsTyping(true);

        // Simulate response delay
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

        // Generate response with conversation context
        const response = generateAIResponse(userMessage, networkData, conversationContext);

        setIsTyping(false);

        // Update conversation context if provided
        if (response.topicContext) {
            setConversationContext(response.topicContext);
        }

        // Handle different response types
        if (response.type === 'graph') {
            // Add message with embedded graph
            const graphContent = `
                ${response.content}
                <div class="chat-graph">
                    <div class="graph-title">${response.graphData.label}</div>
                    <div class="graph-bars">
                        ${response.graphData.data.map((value, index) => `
                            <div class="graph-bar-container">
                                <div class="graph-bar" style="height: ${(value / 25) * 100}%">
                                    <span class="graph-value">${value}${response.graphData.unit}</span>
                                </div>
                                <span class="graph-label">${response.graphData.labels[index]}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            setMessages(prev => [...prev, {
                id: Date.now(),
                type: 'assistant',
                content: graphContent,
            }]);
        } else if (response.type === 'document') {
            // Add message with document reference
            const docContent = `
                ${response.content}
                <div class="chat-document">
                    <div class="document-icon">📄</div>
                    <div class="document-info">
                        <span class="document-name">${response.documentName}</span>
                        <span class="document-action">Click to open</span>
                    </div>
                </div>
            `;
            setMessages(prev => [...prev, {
                id: Date.now(),
                type: 'assistant',
                content: docContent,
            }]);
        } else {
            // Add standard assistant response
            setMessages(prev => [...prev, {
                id: Date.now(),
                type: 'assistant',
                content: response.content,
            }]);
        }

        // If this is an accident scenario - run simulation
        if (response.type === 'accident') {
            onAccidentSimulation({
                pipelineId: response.pipelineId,
                stationId: response.stationId,
                accidentType: response.accidentType,
                affectedStations: response.affectedStations,
                affectedPipelines: response.affectedPipelines,
            });

            // Add recommendations as a separate message
            if (response.recommendations) {
                setTimeout(() => {
                    setMessages(prev => [...prev, {
                        id: Date.now(),
                        type: 'assistant',
                        content: `
              <p><span class="highlight">Recommendations:</span></p>
              <ul>
                ${response.recommendations.map(r => `<li>${r}</li>`).join('')}
              </ul>
            `,
                    }]);
                }, 1500);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleQuickAction = (action) => {
        if (action.action === 'clear') {
            onClearAccident();
            addAssistantMessage(`
                <p><span class="success">Accident simulation cleared</span></p>
                <p>The network has returned to normal operating state.</p>
            `);
            return;
        }
        handleSend(action.query);
    };

    return (
        <div className="glass-card ai-chat">
            <div className="card-header">
                <span className="card-title">AI Assistant</span>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.75rem',
                    color: 'var(--color-accent-green)',
                }}>
                    <span className="status-indicator normal" style={{ width: '8px', height: '8px' }}></span>
                    Online
                </div>
            </div>

            <div className="chat-messages">
                {messages.map(message => (
                    <div key={message.id} className={`message ${message.type}`}>
                        <div className="message-avatar">
                            {message.type === 'assistant' ? '🤖' : '👤'}
                        </div>
                        <div
                            className="message-content"
                            dangerouslySetInnerHTML={{ __html: message.content }}
                        />
                    </div>
                ))}

                {isTyping && (
                    <div className="message assistant">
                        <div className="message-avatar">🤖</div>
                        <div className="message-content">
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-container">
                <div className="chat-input-wrapper">
                    <input
                        type="text"
                        className="chat-input"
                        placeholder="Ask a question about the system..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button
                        className="chat-send-btn"
                        onClick={handleSend}
                        disabled={!inputValue.trim()}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" />
                        </svg>
                    </button>
                </div>

                <div className="quick-actions">
                    {quickActions.map((action, index) => (
                        <button
                            key={index}
                            className="quick-action"
                            onClick={() => handleQuickAction(action)}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AIChat;
