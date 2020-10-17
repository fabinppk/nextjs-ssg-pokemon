import React from 'react';

export default function Input({ value, onChange }) {
  return (
    <div className="inputText">
      <input
        type="text"
        name="searchInput"
        placeholder="Search pokémons..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
