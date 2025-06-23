import React from 'react';
import { VotingCard } from '../types';

interface VotingCardsProps {
  cards: VotingCard[];
  selectedCard: string | null;
  onCardSelect: (value: string) => void;
  disabled: boolean;
}

const VotingCards: React.FC<VotingCardsProps> = ({ 
  cards, 
  selectedCard, 
  onCardSelect, 
  disabled 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Select Your Estimate
      </h3>
      
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
        {cards.map((card) => (
          <button
            key={card.value}
            onClick={() => onCardSelect(card.value)}
            disabled={disabled}
            className={`aspect-[2/3] rounded-lg border-2 transition-all duration-200 font-bold text-lg
              ${disabled 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:scale-105 hover:shadow-lg transform active:scale-95'
              }
              ${selectedCard === card.value
                ? card.isSpecial
                  ? 'border-orange-500 bg-orange-100 text-orange-700'
                  : 'border-blue-500 bg-blue-100 text-blue-700'
                : card.isSpecial
                  ? 'border-orange-200 bg-orange-50 text-orange-600 hover:border-orange-300'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }
            `}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <span className="text-2xl mb-1">{card.value}</span>
              {card.label !== card.value && (
                <span className="text-xs opacity-75">{card.label}</span>
              )}
            </div>
          </button>
        ))}
      </div>
      
      {selectedCard && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-800 text-sm text-center">
            You selected: <span className="font-bold">{selectedCard}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default VotingCards;