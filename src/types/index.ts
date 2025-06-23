export interface User {
  id: string;
  name: string;
  isHost: boolean;
  hasVoted: boolean;
  vote?: string;
}

export interface Session {
  id: string;
  name: string;
  hostId: string;
  users: User[];
  currentRound: number;
  isVotingActive: boolean;
  isRevealed: boolean;
  votingHistory: VotingRound[];
  cardSet: VotingCard[];
}

export interface VotingRound {
  roundNumber: number;
  votes: Record<string, string>;
  timestamp: number;
}

export interface VotingCard {
  value: string;
  label: string;
  isSpecial?: boolean;
}

export interface CardSetPreset {
  id: string;
  name: string;
  description: string;
  cards: VotingCard[];
}