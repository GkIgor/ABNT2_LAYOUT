import React from 'react';
import { KeyData, KeyCapCustomization, ColorTheme } from '../types/keyboard';

interface KeyCapProps {
  keyData: KeyData;
  customization: KeyCapCustomization;
  theme: ColorTheme;
  onClick?: () => void;
  isSelected?: boolean;
  showCategoryBadge?: boolean;
}

export const KeyCap: React.FC<KeyCapProps> = ({
  keyData,
  customization,
  theme,
  onClick,
  isSelected = true,
  showCategoryBadge = false,
}) => {
  // Check for individual key overrides
  const override = customization.customKeyNotes[keyData.id] || {};
  const primaryLabel = override.primaryLabel ?? keyData.primaryLabel;
  const shiftLabel = override.shiftLabel ?? keyData.shiftLabel;
  const altGrLabel = override.altGrLabel ?? keyData.altGrLabel;
  
  const widthUnits = override.widthUnits ?? keyData.widthUnits ?? 1;
  const heightUnits = override.heightUnits ?? keyData.heightUnits ?? 1;

  // Calculate physical mm sizes
  const widthMm = customization.baseWidthMm * widthUnits;
  const heightMm = customization.baseHeightMm * heightUnits;

  // Background and Text colors
  const isWASD = ['w', 'a', 's', 'd'].includes(keyData.id) && theme.id === 'gamer-wasd';
  
  let bgColor = override.customBgColor || keyData.customBgColor || (isWASD ? '#dc2626' : theme.bgColor);
  let textColor = override.customTextColor || keyData.customTextColor || (isWASD ? '#ffffff' : theme.textColor);
  const altGrColor = theme.accentColor;

  if (theme.id === 'custom') {
    bgColor = override.customBgColor || customization.customBgColor || '#1b1c1e';
    textColor = override.customTextColor || customization.customTextColor || '#ffffff';
  }

  // Border & Crop marks style
  let borderCss = `1px solid ${theme.borderColor}`;
  if (customization.cropMarkStyle === 'dashed') {
    borderCss = `1px dashed ${theme.borderColor}`;
  } else if (customization.cropMarkStyle === 'none') {
    borderCss = 'none';
  }

  // Font size classes
  let primaryFontSizeClass = 'text-xs';
  let secondaryFontSizeClass = 'text-[9px]';
  
  switch (customization.fontSize) {
    case 'small':
      primaryFontSizeClass = 'text-[10px]';
      secondaryFontSizeClass = 'text-[8px]';
      break;
    case 'medium':
      primaryFontSizeClass = 'text-xs';
      secondaryFontSizeClass = 'text-[9px]';
      break;
    case 'large':
      primaryFontSizeClass = 'text-sm';
      secondaryFontSizeClass = 'text-[10px]';
      break;
    case 'xlarge':
      primaryFontSizeClass = 'text-base';
      secondaryFontSizeClass = 'text-[11px]';
      break;
  }

  const fontBoldClass = customization.fontBold ? 'font-bold' : 'font-semibold';

  return (
    <div
      onClick={onClick}
      style={{
        width: `${widthMm}mm`,
        height: `${heightMm}mm`,
        backgroundColor: bgColor,
        color: textColor,
        border: borderCss,
        borderRadius: `${customization.borderRadiusMm}mm`,
        boxSizing: 'border-box',
      }}
      className={`relative flex flex-col justify-between p-[1.5mm] select-none cursor-pointer transition-all duration-150 hover:opacity-90 hover:scale-[1.02] active:scale-95 group ${
        !isSelected ? 'opacity-30 grayscale' : ''
      } ${
        customization.showCropMarks && customization.cropMarkStyle === 'corners'
          ? 'before:absolute before:-top-1 before:-left-1 before:w-2 before:h-2 before:border-t-2 before:border-l-2 before:border-black dark:before:border-white after:absolute after:-bottom-1 after:-right-1 after:w-2 after:h-2 after:border-b-2 after:border-r-2 after:border-black dark:after:border-white'
          : ''
      }`}
      title={`Tecla: ${primaryLabel} (Clique para personalizar)`}
    >
      {/* Top labels (ShiftLabel left, AltGr right) */}
      <div className="flex justify-between items-start w-full leading-none pointer-events-none">
        <span className={`${secondaryFontSizeClass} opacity-80 font-mono tracking-tighter`}>
          {shiftLabel || ''}
        </span>
        <span
          style={{ color: altGrColor }}
          className={`${secondaryFontSizeClass} font-bold font-mono tracking-tighter`}
        >
          {altGrLabel || ''}
        </span>
      </div>

      {/* Primary Center / Main label */}
      <div className="flex-1 flex items-center justify-center leading-none pointer-events-none text-center px-0.5">
        <span className={`${primaryFontSizeClass} ${fontBoldClass} tracking-tight break-all`}>
          {primaryLabel}
        </span>
      </div>

      {/* Category indicator for print review (screen only) */}
      {showCategoryBadge && keyData.category && (
        <span className="no-print absolute bottom-0.5 right-0.5 text-[7px] opacity-40 uppercase font-sans">
          {keyData.category}
        </span>
      )}
    </div>
  );
};
