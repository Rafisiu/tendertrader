// components/profile-perusahaan/shared/MultiSelect.tsx
import React from 'react';
import Select2 from "react-select";

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onSelectionChange: (selected: string[]) => void;
  placeholder: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ 
  options, 
  selected, 
  onSelectionChange, 
  placeholder 
}) => {
  const selectOptions = options.map(option => ({ value: option, label: option }));
  const selectedValues = selected.map(item => ({ value: item, label: item }));

  return (
    <Select2
      isMulti
      options={selectOptions}
      value={selectedValues}
      onChange={(newValue) => {
        const values = newValue ? newValue.map(item => item.value) : [];
        onSelectionChange(values);
      }}
      placeholder={placeholder}
      className="react-select-container"
      classNamePrefix="react-select"
    />
  );
};

export default MultiSelect;