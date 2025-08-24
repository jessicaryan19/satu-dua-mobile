// context/CallContext.tsx
import { RNCallService, RNCallState } from '@/services/callServices';
import React, { createContext, useContext, useRef, useState } from 'react';

interface CallContextProps {
  callService: RNCallService;
  state: RNCallState;
  refreshState: () => void;
}

const CallContext = createContext<CallContextProps | undefined>(undefined);

export const CallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const callServiceRef = useRef(new RNCallService({
    onError: (err) => console.error('Call error:', err),
    onChannelJoined: () => refreshState(),
    onChannelLeft: () => {
        callServiceRef.current.cleanup()
        refreshState()
    },
    onUserJoined: () => refreshState()
  }));

  const [state, setState] = useState<RNCallState>(callServiceRef.current.getState());
  const refreshState: () => void = () => setState(callServiceRef.current.getState());

  return (
    <CallContext.Provider value={{ callService: callServiceRef.current, state, refreshState }}>
      {children}
    </CallContext.Provider>
  );
};

export const useCall = () => {
  const ctx = useContext(CallContext);
  if (!ctx) throw new Error('useCall must be used within a CallProvider');
  return ctx;
};
