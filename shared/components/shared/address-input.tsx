'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="981ca5db7d1c312b969ace3ec7d9c9c4103b8869"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
