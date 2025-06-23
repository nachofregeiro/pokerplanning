import React, { useState, useEffect } from 'react';
import { LogOut, RotateCcw, Eye, EyeOff, Copy, Check } from 'lucide-react';
import { Session, User } from '../types';
import { saveSession, clearCurrentSession } from '../utils/sessionStorage';
import UserList from './UserList';
import VotingCards from './VotingCards';
import Results from './Results';

interface PokRoomProps {
  session: Session;
  currentUser: User;
  onLeaveSession: () => void;
}

const PokRoom: React.FC<PokRoomProps> = ({ session: initialSession, currentUser: initialUser, onLeaveSession }) => {
  const [session, setSession] = useState<Session>(initialSession);
  const [currentUser, setCurrentUser] = useState<User>(initialUser);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate other users voting
      if (session.isVotingActive && !session.isRevealed) {
        setSession(prev => {
          const updatedUsers = prev.users.map(user => {
            if (user.id !== currentUser.id && !user.hasVoted && Math.random() > 0.7) {
              const randomCard = prev.cardSet[Math.floor(Math.random() * prev.cardSet.length)];
              return {
                ...user,
                hasVoted: true,
                vote: randomCard.value
              };
            }
            return user;
          });
          
          const updatedSession = { ...prev, users: updatedUsers };
          saveSession(updatedSession);
          return updatedSession;
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [session.isVotingActive, session.isRevealed, currentUser.id]);

  const handleCardSelect = (value: string) => {
    if (!session.isVotingActive) return;
    
    setSelectedCard(value);
    
    // Update user's vote
    const updatedUser = { ...currentUser, hasVoted: true, vote: value };
    const updatedUsers = session.users.map(user => 
      user.id === currentUser.id ? updatedUser : user
    );
    
    const updatedSession = { ...session, users: updatedUsers };
    
    setCurrentUser(updatedUser);
    setSession(updatedSession);
    saveSession(updatedSession);
  };

  const handleStartVoting = () => {
    const updatedSession = {
      ...session,
      isVotingActive: true,
      isRevealed: false,
      users: session.users.map(user => ({ ...user, hasVoted: false, vote: undefined }))
    };
    
    setSession(updatedSession);
    setSelectedCard(null);
    setCurrentUser(prev => ({ ...prev, hasVoted: false, vote: undefined }));
    saveSession(updatedSession);
  };

  const handleRevealVotes = () => {
    const updatedSession = { ...session, isRevealed: true };
    setSession(updatedSession);
    saveSession(updatedSession);
  };

  const handleNewRound = () => {
    const updatedSession = {
      ...session,
      currentRound: session.currentRound + 1,
      isVotingActive: false,
      isRevealed: false,
      users: session.users.map(user => ({ ...user, hasVoted: false, vote: undefined })),
      votingHistory: [
        ...session.votingHistory,
        {
          roundNumber: session.currentRound,
          votes: session.users.reduce((acc, user) => {
            if (user.vote) acc[user.id] = user.vote;
            return acc;
          }, {} as Record<string, string>),
          timestamp: Date.now()
        }
      ]
    };
    
    setSession(updatedSession);
    setSelectedCard(null);
    setCurrentUser(prev => ({ ...prev, hasVoted: false, vote: undefined }));
    saveSession(updatedSession);
  };

  const handleCopySessionId = async () => {
    try {
      await navigator.clipboard.writeText(session.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy session ID:', err);
    }
  };

  const handleLeaveSession = () => {
    clearCurrentSession();
    onLeaveSession();
  };

  const allVoted = session.users.every(user => user.hasVoted);
  const canReveal = session.isVotingActive && allVoted && !session.isRevealed;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-900">{session.name}</h1>
              <div className="flex items-center gap-2">
                <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                  {session.id}
                </code>
                <button
                  onClick={handleCopySessionId}
                  className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                  title="Copy session ID"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Round {session.currentRound}</span>
              <button
                onClick={handleLeaveSession}
                className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Leave
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Voting Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Control Panel */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {session.isVotingActive 
                    ? session.isRevealed 
                      ? 'Voting Complete' 
                      : 'Voting in Progress'
                    : 'Ready to Vote'
                  }
                </h2>
                
                {currentUser.isHost && (
                  <div className="flex gap-2">
                    {!session.isVotingActive && (
                      <button
                        onClick={handleStartVoting}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Start Voting
                      </button>
                    )}
                    
                    {canReveal && (
                      <button
                        onClick={handleRevealVotes}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Reveal Votes
                      </button>
                    )}
                    
                    {session.isRevealed && (
                      <button
                        onClick={handleNewRound}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        New Round
                      </button>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Status: {session.isVotingActive ? (session.isRevealed ? 'Revealed' : 'Active') : 'Waiting'}</span>
                <span>•</span>
                <span>Votes: {session.users.filter(u => u.hasVoted).length} / {session.users.length}</span>
                {session.isVotingActive && !session.isRevealed && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <EyeOff className="w-4 h-4" />
                      Hidden
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Voting Cards */}
            <VotingCards
              cards={session.cardSet}
              selectedCard={selectedCard}
              onCardSelect={handleCardSelect}
              disabled={!session.isVotingActive || session.isRevealed}
            />

            {/* Results */}
            <Results
              users={session.users}
              cards={session.cardSet}
              isRevealed={session.isRevealed}
            />
          </div>

          {/* Right Column - User List */}
          <div className="space-y-6">
            <UserList users={session.users} currentUserId={currentUser.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokRoom;