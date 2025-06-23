import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
import { CardSetPreset, VotingCard } from '../types';
import { CARD_SET_PRESETS } from '../utils/cardPresets';

interface CardSetSelectorProps {
  selectedCardSet: VotingCard[];
  onCardSetChange: (cards: VotingCard[]) => void;
}

const CardSetSelector: React.FC<CardSetSelectorProps> = ({ selectedCardSet, onCardSetChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('fibonacci');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customCards, setCustomCards] = useState<VotingCard[]>([]);
  const [newCardValue, setNewCardValue] = useState('');
  const [newCardLabel, setNewCardLabel] = useState('');

  const handlePresetSelect = (preset: CardSetPreset) => {
    setSelectedPreset(preset.id);
    setIsCustomMode(false);
    onCardSetChange(preset.cards);
  };

  const handleCustomMode = () => {
    setIsCustomMode(true);
    setCustomCards([...selectedCardSet]);
  };

  const addCustomCard = () => {
    if (!newCardValue.trim()) return;
    
    const newCard: VotingCard = {
      value: newCardValue.trim(),
      label: newCardLabel.trim() || newCardValue.trim(),
      isSpecial: false
    };
    
    const updatedCards = [...customCards, newCard];
    setCustomCards(updatedCards);
    onCardSetChange(updatedCards);
    setNewCardValue('');
    setNewCardLabel('');
  };

  const removeCustomCard = (index: number) => {
    const updatedCards = customCards.filter((_, i) => i !== index);
    setCustomCards(updatedCards);
    onCardSetChange(updatedCards);
  };

  const addSpecialCards = () => {
    const specialCards: VotingCard[] = [
      { value: '?', label: '?', isSpecial: true },
      { value: '☕', label: 'Break', isSpecial: true },
      { value: '∞', label: 'Too Big', isSpecial: true },
    ];
    
    const updatedCards = [...customCards, ...specialCards];
    setCustomCards(updatedCards);
    onCardSetChange(updatedCards);
  };

  const currentPreset = CARD_SET_PRESETS.find(p => p.id === selectedPreset);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Set
        </label>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
        >
          <div className="text-left">
            <div className="font-medium text-gray-900">
              {isCustomMode ? 'Custom Card Set' : currentPreset?.name}
            </div>
            <div className="text-sm text-gray-500">
              {isCustomMode ? `${selectedCardSet.length} cards` : currentPreset?.description}
            </div>
          </div>
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Preset Card Sets</h4>
            <div className="grid gap-2">
              {CARD_SET_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handlePresetSelect(preset)}
                  className={`text-left p-3 rounded-lg border transition-colors ${
                    selectedPreset === preset.id && !isCustomMode
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium text-gray-900">{preset.name}</div>
                  <div className="text-sm text-gray-600">{preset.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <button
              type="button"
              onClick={handleCustomMode}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                isCustomMode
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="font-medium text-gray-900">Custom Card Set</div>
              <div className="text-sm text-gray-600">Create your own card values</div>
            </button>
          </div>

          {isCustomMode && (
            <div className="border-t pt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Value
                  </label>
                  <input
                    type="text"
                    value={newCardValue}
                    onChange={(e) => setNewCardValue(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1, 2, 3..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Label (optional)
                  </label>
                  <input
                    type="text"
                    value={newCardLabel}
                    onChange={(e) => setNewCardLabel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="One, Two..."
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={addCustomCard}
                  disabled={!newCardValue.trim()}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Card
                </button>
                
                <button
                  type="button"
                  onClick={addSpecialCards}
                  className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  Add Special Cards
                </button>
              </div>

              {customCards.length > 0 && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Current Cards</h5>
                  <div className="flex flex-wrap gap-2">
                    {customCards.map((card, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${
                          card.isSpecial
                            ? 'border-orange-200 bg-orange-50 text-orange-700'
                            : 'border-blue-200 bg-blue-50 text-blue-700'
                        }`}
                      >
                        <span className="font-medium">{card.value}</span>
                        {card.label !== card.value && (
                          <span className="text-sm opacity-75">({card.label})</span>
                        )}
                        <button
                          type="button"
                          onClick={() => removeCustomCard(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Preview */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
        <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-10 gap-2">
          {selectedCardSet.slice(0, 10).map((card, index) => (
            <div
              key={index}
              className={`aspect-[2/3] rounded border-2 flex items-center justify-center text-xs font-bold ${
                card.isSpecial
                  ? 'border-orange-200 bg-orange-50 text-orange-700'
                  : 'border-blue-200 bg-blue-50 text-blue-700'
              }`}
            >
              {card.value}
            </div>
          ))}
          {selectedCardSet.length > 10 && (
            <div className="aspect-[2/3] rounded border-2 border-gray-200 bg-gray-50 flex items-center justify-center text-xs text-gray-500">
              +{selectedCardSet.length - 10}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardSetSelector;