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
      border: '1px solid rgba(156, 163, 175, 1)',
    },
  }),
  option: (baseStyles, { isDisabled, isSelected, isFocused }) => ({
    ...baseStyles,
    color: '#374151',
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
          ? 'rgba(168, 85, 247, 0.5)'
          : 'rgba(168, 85, 247, 0.8)'
        : undefined,
    },
  }),
};
