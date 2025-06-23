import React, { useState } from 'react';
import { Users, Plus, ArrowRight } from 'lucide-react';
import { User, Session, VotingCard } from '../types';
import { saveSession, saveCurrentUser, saveCurrentSession, generateSessionId, generateUserId } from '../utils/sessionStorage';
import { CARD_SET_PRESETS } from '../utils/cardPresets';
import CardSetSelector from './CardSetSelector';

interface SessionCreatorProps {
  onJoinSession: (session: Session, user: User) => void;
}

const SessionCreator: React.FC<SessionCreatorProps> = ({ onJoinSession }) => {
  const [mode, setMode] = useState<'select' | 'create' | 'join'>('select');
  const [sessionName, setSessionName] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [userName, setUserName] = useState('');
  const [selectedCardSet, setSelectedCardSet] = useState<VotingCard[]>(CARD_SET_PRESETS[0].cards);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateSession = async () => {
    if (!sessionName.trim() || !userName.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (selectedCardSet.length === 0) {
      setError('Please select at least one card for voting');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const newSessionId = generateSessionId();
      const userId = generateUserId();
      
      const user: User = {
        id: userId,
        name: userName.trim(),
        isHost: true,
        hasVoted: false
      };

      const session: Session = {
        id: newSessionId,
        name: sessionName.trim(),
        hostId: userId,
        users: [user],
        currentRound: 1,
        isVotingActive: false,
        isRevealed: false,
        votingHistory: [],
        cardSet: selectedCardSet
      };

      saveSession(session);
      saveCurrentUser(user);
      saveCurrentSession(newSessionId);
      
      onJoinSession(session, user);
    } catch (err) {
      setError('Failed to create session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinSession = async () => {
    if (!sessionId.trim() || !userName.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // In a real app, this would make an API call
      // For now, we'll simulate joining a session
      const userId = generateUserId();
      
      const user: User = {
        id: userId,
        name: userName.trim(),
        isHost: false,
        hasVoted: false
      };

      // Create a mock session for demo purposes
      const session: Session = {
        id: sessionId.trim().toUpperCase(),
        name: `Planning Session ${sessionId.trim().toUpperCase()}`,
        hostId: 'host-id',
        users: [
          {
            id: 'host-id',
            name: 'Session Host',
            isHost: true,
            hasVoted: false
          },
          user
        ],
        currentRound: 1,
        isVotingActive: false,
        isRevealed: false,
        votingHistory: [],
        cardSet: CARD_SET_PRESETS[0].cards // Default to Fibonacci for joined sessions
      };

      saveSession(session);
      saveCurrentUser(user);
      saveCurrentSession(sessionId.trim().toUpperCase());
      
      onJoinSession(session, user);
    } catch (err) {
      setError('Failed to join session. Please check the session ID.');
    } finally {
      setLoading(false);
    }
  };

  if (mode === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Poker Planning</h1>
            <p className="text-gray-600">Collaborative story point estimation for agile teams</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setMode('create')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              Create New Session
            </button>
            
            <button
              onClick={() => setMode('join')}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <ArrowRight className="w-5 h-5" />
              Join Existing Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {mode === 'create' ? 'Create Session' : 'Join Session'}
            </h2>
            <p className="text-gray-600">
              {mode === 'create' 
                ? 'Start a new poker planning session' 
                : 'Enter the session ID to join'
              }
            </p>
          </div>

          <div className="space-y-6">
            {mode === 'create' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Name
                </label>
                <input
                  type="text"
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Sprint 23 Planning"
                />
              </div>
            )}

            {mode === 'join' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session ID
                </label>
                <input
                  type="text"
                  value={sessionId}
                  onChange={(e) => setSessionId(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono"
                  placeholder="ABC123"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="John Doe"
              />
            </div>

            {mode === 'create' && (
              <CardSetSelector
                selectedCardSet={selectedCardSet}
                onCardSetChange={setSelectedCardSet}
              />
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setMode('select')}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                onClick={mode === 'create' ? handleCreateSession : handleJoinSession}
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                {loading ? 'Loading...' : mode === 'create' ? 'Create' : 'Join'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCreator;