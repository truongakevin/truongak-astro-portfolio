import React, { useEffect, useState } from 'react';

interface TTSLogEntry {
  timestamp: string;
  message: string;
  voice_name: string;
}

const TTSLogs: React.FC = () => {
  const [logs, setLogs] = useState<TTSLogEntry[]>([]);

  const fetchLogs = async () => {
    try {
      const response = await fetch("https://kevinatruong.com/api/tts/logs");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: TTSLogEntry[] = await response.json();
      setLogs(data.reverse());
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const groupLogsByDate = (logs: TTSLogEntry[]): Record<string, TTSLogEntry[]> => {
    return logs.reduce((acc: Record<string, TTSLogEntry[]>, log) => {
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
    <div className='flex flex-col gap-4'>
      {Object.entries(groupedLogs).map(([date, entries]) => (
        <div key={date} className='flex flex-col gap-1'>
          <h3>{date}</h3>
          <ul className='flex flex-col gap-4'>
            {entries.map(log => {
              const [day, time, ampm] = log.timestamp.split(' ');
              const logTime = `${time} ${ampm.toLowerCase()}`;
              return (
                <li key={log.timestamp} className='w-full'>
                    <div className='flex flex-row gap-4 justify-between items-start'>
                      <div className='flex flex-col'>
                        <h5>{log.voice_name}:</h5>
                        <h5 className='break-all !font-normal'>{log.message}</h5>
                      </div>
                    <h6 className='whitespace-nowrap !font-extralight'>{logTime}</h6>
                </div>
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