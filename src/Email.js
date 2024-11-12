import React, { useState } from 'react';
import axios from 'axios';



const Email = () => {
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/send-email', {
                recipient: recipient,
                subject: subject,
                text: text
            });
            console.log(response.data);
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    };

    return (
        <div>
            <h2>Skicka E-mejl</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    required
                />
                <input
                    type="text "
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Message"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
                <button type="submit">Send Email</button>
            </form>
        </div>
    );
};

export default Email;