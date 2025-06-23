import React from 'react';
import { BarChart3, TrendingUp, Users } from 'lucide-react';
import { User, VotingCard } from '../types';

interface ResultsProps {
  users: User[];
  cards: VotingCard[];
  isRevealed: boolean;
}

const Results: React.FC<ResultsProps> = ({ users, cards, isRevealed }) => {
  const votedUsers = users.filter(user => user.hasVoted);
  const votes = votedUsers.map(user => user.vote).filter(Boolean);
  
  const voteCounts = votes.reduce((acc, vote) => {
    acc[vote!] = (acc[vote!] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedVotes = Object.entries(voteCounts).sort((a, b) => b[1] - a[1]);
  const maxCount = Math.max(...Object.values(voteCounts));

  // Calculate statistics
  const numericVotes = votes.filter(vote => !isNaN(Number(vote))).map(Number);
  const average = numericVotes.length > 0 
    ? (numericVotes.reduce((sum, vote) => sum + vote, 0) / numericVotes.length).toFixed(1)
    : 'N/A';

  const getCardInfo = (value: string) => {
    return cards.find(card => card.value === value) || { value, label: value };
  };

  if (!isRevealed) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Voting Progress
        </h3>
        
        <div className="text-center py-8">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {votedUsers.length} / {users.length}
          </div>
          <p className="text-gray-600">votes cast</p>
          
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(votedUsers.length / users.length) * 100}%` }}
            />
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 gap-3">
          {users.map((user) => (
            <div
              key={user.id}
              className={`flex items-center justify-between p-3 rounded-lg ${
                user.hasVoted ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <span className="font-medium text-gray-900">{user.name}</span>
              <span className={`text-sm font-medium ${
                user.hasVoted ? 'text-green-600' : 'text-gray-500'
              }`}>
                {user.hasVoted ? 'Voted' : 'Waiting...'}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Voting Results
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{votes.length}</div>
            <div className="text-sm text-blue-800">Total Votes</div>
          </div>
          <div className="text-center p-4 bg-emerald-50 rounded-lg">
            <div className="text-2xl font-bold text-emerald-600">{average}</div>
            <div className="text-sm text-emerald-800">Average</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{sortedVotes[0]?.[0] || 'N/A'}</div>
            <div className="text-sm text-purple-800">Most Popular</div>
          </div>
        </div>

        <div className="space-y-3">
          {sortedVotes.map(([vote, count]) => {
            const cardInfo = getCardInfo(vote);
            const percentage = (count / votes.length) * 100;
            
            return (
              <div key={vote} className="flex items-center gap-4">
                <div className={`w-12 h-8 rounded border-2 flex items-center justify-center text-sm font-bold
                  ${cardInfo.isSpecial 
                    ? 'border-orange-300 bg-orange-100 text-orange-700' 
                    : 'border-blue-300 bg-blue-100 text-blue-700'
                  }
                `}>
                  {vote}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {count} vote{count !== 1 ? 's' : ''} ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(count / maxCount) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Individual Votes
        </h3>
        
        <div className="grid grid-cols-1 gap-3">
          {votedUsers.map((user) => {
            const cardInfo = getCardInfo(user.vote!);
            
            return (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">{user.name}</span>
                <div className={`px-3 py-1 rounded-lg text-sm font-bold
                  ${cardInfo.isSpecial 
                    ? 'bg-orange-100 text-orange-700' 
                    : 'bg-blue-100 text-blue-700'
                  }
                `}>
                  {user.vote}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Results;