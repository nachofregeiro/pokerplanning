import React from 'react';
import { Crown, User, Check } from 'lucide-react';
import { User as UserType } from '../types';

interface UserListProps {
  users: UserType[];
  currentUserId: string;
}

const UserList: React.FC<UserListProps> = ({ users, currentUserId }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <User className="w-5 h-5" />
        Participants ({users.length})
      </h3>
      
      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
              user.id === currentUserId 
                ? 'bg-blue-50 border-2 border-blue-200' 
                : 'bg-gray-50 border-2 border-transparent'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                user.isHost ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-200 text-gray-600'
              }`}>
                {user.isHost ? <Crown className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {user.name}
                  {user.id === currentUserId && <span className="text-blue-600 ml-1">(You)</span>}
                </p>
                <p className="text-sm text-gray-500">
                  {user.isHost ? 'Host' : 'Participant'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {user.hasVoted && (
                <div className="flex items-center gap-1 text-green-600">
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-medium">Voted</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;