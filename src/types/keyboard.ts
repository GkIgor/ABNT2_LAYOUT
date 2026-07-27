export interface KeyData {
  id: string;
  code: string;
  primaryLabel: string;
  shiftLabel?: string;
  altGrLabel?: string;
  widthUnits?: number; // 1 = standard key, 1.25, 1.5, 1.75, 2, 2.25, 2.75, 6.25, etc.
  heightUnits?: number; // 1 = standard, 2 = numpad enter / plus
  isIsoEnter?: boolean; // L-shaped ABNT2 Enter
  isIsoEnterBottom?: boolean; // Part of ISO enter
  customBgColor?: string;
  customTextColor?: string;
  category?: 'main' | 'function' | 'nav' | 'numpad';
}

export interface KeyRow {
  id: string;
  keys: KeyData[];
}

export interface SizePreset {
  id: string;
  name: string;
  description: string;
  baseWidthMm: number;  // 1u key width in mm
  baseHeightMm: number; // 1u key height in mm
  gapMm: number;        // gap between keys in mm
  borderRadiusMm: number;
}

export interface ColorTheme {
  id: string;
  name: string;
  bgColor: string;      // Key cap background
  textColor: string;    // Primary text color
  accentColor: string;  // AltGr / special indicator color
  borderColor: string;  // Border or cut line color
  isDark: boolean;
}

export type PrintMode = 'full-layout' | 'grid-sheet' | 'selected-only' | 'test-sheet';
export type PageOrientation = 'portrait' | 'landscape';

export interface KeyCapCustomization {
  baseWidthMm: number;
  baseHeightMm: number;
  gapMm: number;
  borderRadiusMm: number;
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  fontBold: boolean;
  themeId: string;
  customBgColor: string;
  customTextColor: string;
  customAltGrColor: string;
  showCropMarks: boolean;
  cropMarkStyle: 'dashed' | 'solid' | 'corners' | 'none';
  showRuler: boolean;
  orientation: PageOrientation;
  selectedKeyIds: string[]; // for 'selected-only' mode
  customKeyNotes: Record<string, Partial<KeyData>>;
  duplicateCounts: Record<string, number>;
}
