import React, { useEffect, useState } from 'react';

const SoundWave: React.FC = () => {
  const [active, setActive] = useState(false);
  
  useEffect(() => {
    // Simulate activity
    const interval = setInterval(() => {
      setActive(prev => !prev);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-12 space-x-1">
      {[...Array(15)].map((_, i) => {
        const height = active ? 
          Math.max(4, Math.floor(Math.sin((i / 14) * Math.PI) * 24)) : 
          4 + Math.floor(Math.random() * 4);
        
        return (
          <div 
            key={i}
            className="bg-indigo-500 rounded-full w-1"
            style={{ 
              height: `${height}px`,
              transition: 'height 0.2s ease',
              animationDelay: `${i * 0.05}s`
            }}
          />
        );
      })}
    </div>
  );
};

export default SoundWave;