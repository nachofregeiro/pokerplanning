import React, { useState, useEffect } from 'react';
import { Session, User } from './types';
import { getSession, getCurrentUser, getCurrentSessionId } from './utils/sessionStorage';
import { CARD_SET_PRESETS } from './utils/cardPresets';
import SessionCreator from './components/SessionCreator';
import PokRoom from './components/PokRoom';

function App() {
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user has an active session
    const sessionId = getCurrentSessionId();
    const user = getCurrentUser();
    
    if (sessionId && user) {
      const session = getSession(sessionId);
      if (session) {
        // Ensure session has a valid cardSet
        if (!session.cardSet || session.cardSet.length === 0) {
          session.cardSet = CARD_SET_PRESETS[0].cards;
        }
        setCurrentSession(session);
        setCurrentUser(user);
      }
    }
    
    setLoading(false);
  }, []);

  const handleJoinSession = (session: Session, user: User) => {
    setCurrentSession(session);
    setCurrentUser(user);
  };

  const handleLeaveSession = () => {
    setCurrentSession(null);
    setCurrentUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (currentSession && currentUser) {
    return (
      <PokRoom
        session={currentSession}
        currentUser={currentUser}
        onLeaveSession={handleLeaveSession}
      />
    );
  }

  return <SessionCreator onJoinSession={handleJoinSession} />;
}

export default App;