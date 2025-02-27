import React, { useEffect, useState } from 'react';

const TTSLogs = () => {
    const [logs, setLogs] = useState([]);

    // Function to fetch logs
    const fetchLogs = async () => {
        try {
            const response = await fetch("https://kevinatruong.com/api/tts/logs");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setLogs(data.reverse());
        } catch (error) {
            console.error("Error fetching logs:", error);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    // Function to group logs by date
    const groupLogsByDate = (logs) => {
        return logs.reduce((acc, log) => {
            const date = log.timestamp.split(' ')[0];
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(log);
            return acc;
        }, {});
    };

    const groupedLogs = groupLogsByDate(logs);

    return (
        <div id="logs-container">
            {Object.entries(groupedLogs).map(([date, entries]) => (
                <div key={date}>
                    <h3 style={{ marginBottom: '0px' }}>{date}</h3>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                        {entries.map(log => {
                            const logTime = log.timestamp.split(' ')[1] + ' ' + log.timestamp.split(' ')[2].toLowerCase();
                            return (
                                <li key={log.timestamp} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontWeight: 550,
                                    padding: '5px 0',
                                    fontSize: '0.9em'
                                }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>{log.voice_name}:</span>
                                        <span style={{ fontWeight: 400 }}>{log.message}</span>
                                    </div>
                                    <span style={{
                                        alignSelf: 'start',
                                        whiteSpace: 'nowrap',
                                        marginLeft: '50px'
                                    }}>{logTime}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default TTSLogs;