import React from 'react';
import { Lock, Unlock } from 'lucide-react';

interface Props {
  isUnlocked: boolean;
  onToggle: () => void;
}

export const FieldLockToggle: React.FC<Props> = ({ isUnlocked, onToggle }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onToggle();
      }}
      title={isUnlocked ? "Editable in Ghost Admin after publish" : "Fixed value (will not be editable in Ghost Admin)"}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '2px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: isUnlocked ? '#0284c7' : '#94a3b8',
        opacity: isUnlocked ? 1 : 0.6,
        transition: 'all 0.2s ease',
      }}
      onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
      onMouseOut={(e) => e.currentTarget.style.opacity = isUnlocked ? '1' : '0.6'}
    >
      {isUnlocked ? <Unlock size={14} /> : <Lock size={14} />}
    </button>
  );
};
