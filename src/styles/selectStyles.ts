import { StylesConfig } from 'react-select';

export const singleSelectStyles: StylesConfig<{
  value: string;
  label: string;
}> = {
  control: (baseStyles) => ({
    ...baseStyles,
    border: '1px solid rgba(209, 213, 219, 1)',
    boxShadow: 'none',
    ':hover': {
      cursor: 'pointer',
      border: '1px solid rgba(209, 213, 219, 1)',
      boxShadow:
        '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    },
  }),
  option: (baseStyles, { isDisabled, isSelected, isFocused }) => ({
    ...baseStyles,
    color: '#4b5563',
    backgroundColor: isDisabled
      ? undefined
      : isSelected
      ? 'rgba(168, 85, 247, 0.5)'
      : isFocused
      ? 'rgba(168, 85, 247, 0.3)'
      : undefined,
    ':active': {
      ...baseStyles[':active'],
      backgroundColor: !isDisabled
        ? isSelected
          ? 'rgba(168, 85, 247, 0.6)'
          : 'rgba(168, 85, 247, 0.6)'
        : undefined,
    },
  }),
  input: (baseStyles) => ({
    ...baseStyles,
    color: '#6b7280',
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    color: '#6b7280',
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: '#6b7280',
  }),
};
