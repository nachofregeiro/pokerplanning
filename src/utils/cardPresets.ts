import { CardSetPreset } from '../types';

export const CARD_SET_PRESETS: CardSetPreset[] = [
  {
    id: 'fibonacci',
    name: 'Fibonacci',
    description: 'Classic Fibonacci sequence (0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89)',
    cards: [
      { value: '0', label: '0' },
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '5', label: '5' },
      { value: '8', label: '8' },
      { value: '13', label: '13' },
      { value: '21', label: '21' },
      { value: '34', label: '34' },
      { value: '55', label: '55' },
      { value: '89', label: '89' },
      { value: '?', label: '?', isSpecial: true },
      { value: '☕', label: 'Break', isSpecial: true },
      { value: '∞', label: 'Too Big', isSpecial: true },
    ]
  },
  {
    id: 'modified-fibonacci',
    name: 'Modified Fibonacci',
    description: 'Modified Fibonacci with half points (0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100)',
    cards: [
      { value: '0', label: '0' },
      { value: '0.5', label: '½' },
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '5', label: '5' },
      { value: '8', label: '8' },
      { value: '13', label: '13' },
      { value: '20', label: '20' },
      { value: '40', label: '40' },
      { value: '100', label: '100' },
      { value: '?', label: '?', isSpecial: true },
      { value: '☕', label: 'Break', isSpecial: true },
      { value: '∞', label: 'Too Big', isSpecial: true },
    ]
  },
  {
    id: 't-shirt',
    name: 'T-Shirt Sizes',
    description: 'T-shirt sizing (XS, S, M, L, XL, XXL)',
    cards: [
      { value: 'XS', label: 'XS' },
      { value: 'S', label: 'S' },
      { value: 'M', label: 'M' },
      { value: 'L', label: 'L' },
      { value: 'XL', label: 'XL' },
      { value: 'XXL', label: 'XXL' },
      { value: '?', label: '?', isSpecial: true },
      { value: '☕', label: 'Break', isSpecial: true },
      { value: '∞', label: 'Too Big', isSpecial: true },
    ]
  },
  {
    id: 'powers-of-2',
    name: 'Powers of 2',
    description: 'Powers of 2 sequence (1, 2, 4, 8, 16, 32, 64)',
    cards: [
      { value: '0', label: '0' },
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '4', label: '4' },
      { value: '8', label: '8' },
      { value: '16', label: '16' },
      { value: '32', label: '32' },
      { value: '64', label: '64' },
      { value: '?', label: '?', isSpecial: true },
      { value: '☕', label: 'Break', isSpecial: true },
      { value: '∞', label: 'Too Big', isSpecial: true },
    ]
  },
  {
    id: 'linear',
    name: 'Linear',
    description: 'Linear sequence (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)',
    cards: [
      { value: '0', label: '0' },
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
      { value: '5', label: '5' },
      { value: '6', label: '6' },
      { value: '7', label: '7' },
      { value: '8', label: '8' },
      { value: '9', label: '9' },
      { value: '10', label: '10' },
      { value: '?', label: '?', isSpecial: true },
      { value: '☕', label: 'Break', isSpecial: true },
      { value: '∞', label: 'Too Big', isSpecial: true },
    ]
  }
];