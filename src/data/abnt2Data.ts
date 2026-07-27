import { KeyRow, KeyData, SizePreset, ColorTheme } from '../types/keyboard';

export const ABNT2_FUNCTION_ROW: KeyRow = {
  id: 'row-fn',
  keys: [
    { id: 'esc', code: 'Escape', primaryLabel: 'Esc', widthUnits: 1, category: 'function' },
    { id: 'f1', code: 'F1', primaryLabel: 'F1', widthUnits: 1, category: 'function' },
    { id: 'f2', code: 'F2', primaryLabel: 'F2', widthUnits: 1, category: 'function' },
    { id: 'f3', code: 'F3', primaryLabel: 'F3', widthUnits: 1, category: 'function' },
    { id: 'f4', code: 'F4', primaryLabel: 'F4', widthUnits: 1, category: 'function' },
    { id: 'f5', code: 'F5', primaryLabel: 'F5', widthUnits: 1, category: 'function' },
    { id: 'f6', code: 'F6', primaryLabel: 'F6', widthUnits: 1, category: 'function' },
    { id: 'f7', code: 'F7', primaryLabel: 'F7', widthUnits: 1, category: 'function' },
    { id: 'f8', code: 'F8', primaryLabel: 'F8', widthUnits: 1, category: 'function' },
    { id: 'f9', code: 'F9', primaryLabel: 'F9', widthUnits: 1, category: 'function' },
    { id: 'f10', code: 'F10', primaryLabel: 'F10', widthUnits: 1, category: 'function' },
    { id: 'f11', code: 'F11', primaryLabel: 'F11', widthUnits: 1, category: 'function' },
    { id: 'f12', code: 'F12', primaryLabel: 'F12', widthUnits: 1, category: 'function' },
    { id: 'prtsc', code: 'PrintScreen', primaryLabel: 'PrtScn', shiftLabel: 'SysRq', widthUnits: 1, category: 'function' },
    { id: 'scrlk', code: 'ScrollLock', primaryLabel: 'ScrLk', widthUnits: 1, category: 'function' },
    { id: 'pause', code: 'Pause', primaryLabel: 'Pause', shiftLabel: 'Break', widthUnits: 1, category: 'function' },
  ]
};

export const ABNT2_ROW_1: KeyRow = {
  id: 'row-1',
  keys: [
    { id: 'quote', code: 'Backquote', primaryLabel: "'", shiftLabel: '"', widthUnits: 1, category: 'main' },
    { id: 'num1', code: 'Digit1', primaryLabel: '1', shiftLabel: '!', altGrLabel: '¹', widthUnits: 1, category: 'main' },
    { id: 'num2', code: 'Digit2', primaryLabel: '2', shiftLabel: '@', altGrLabel: '²', widthUnits: 1, category: 'main' },
    { id: 'num3', code: 'Digit3', primaryLabel: '3', shiftLabel: '#', altGrLabel: '³', widthUnits: 1, category: 'main' },
    { id: 'num4', code: 'Digit4', primaryLabel: '4', shiftLabel: '$', altGrLabel: '£', widthUnits: 1, category: 'main' },
    { id: 'num5', code: 'Digit5', primaryLabel: '5', shiftLabel: '%', altGrLabel: '¢', widthUnits: 1, category: 'main' },
    { id: 'num6', code: 'Digit6', primaryLabel: '6', shiftLabel: '¨', altGrLabel: '¬', widthUnits: 1, category: 'main' },
    { id: 'num7', code: 'Digit7', primaryLabel: '7', shiftLabel: '&', widthUnits: 1, category: 'main' },
    { id: 'num8', code: 'Digit8', primaryLabel: '8', shiftLabel: '*', widthUnits: 1, category: 'main' },
    { id: 'num9', code: 'Digit9', primaryLabel: '9', shiftLabel: '(', widthUnits: 1, category: 'main' },
    { id: 'num0', code: 'Digit0', primaryLabel: '0', shiftLabel: ')', widthUnits: 1, category: 'main' },
    { id: 'minus', code: 'Minus', primaryLabel: '-', shiftLabel: '_', widthUnits: 1, category: 'main' },
    { id: 'equal', code: 'Equal', primaryLabel: '=', shiftLabel: '+', widthUnits: 1, category: 'main' },
    { id: 'backspace', code: 'Backspace', primaryLabel: 'Backspace', widthUnits: 2, category: 'main' },
  ]
};

export const ABNT2_ROW_2: KeyRow = {
  id: 'row-2',
  keys: [
    { id: 'tab', code: 'Tab', primaryLabel: 'Tab', widthUnits: 1.5, category: 'main' },
    { id: 'q', code: 'KeyQ', primaryLabel: 'Q', altGrLabel: '/', widthUnits: 1, category: 'main' },
    { id: 'w', code: 'KeyW', primaryLabel: 'W', altGrLabel: '?', widthUnits: 1, category: 'main' },
    { id: 'e', code: 'KeyE', primaryLabel: 'E', altGrLabel: '°', widthUnits: 1, category: 'main' },
    { id: 'r', code: 'KeyR', primaryLabel: 'R', widthUnits: 1, category: 'main' },
    { id: 't', code: 'KeyT', primaryLabel: 'T', widthUnits: 1, category: 'main' },
    { id: 'y', code: 'KeyY', primaryLabel: 'Y', widthUnits: 1, category: 'main' },
    { id: 'u', code: 'KeyU', primaryLabel: 'U', widthUnits: 1, category: 'main' },
    { id: 'i', code: 'KeyI', primaryLabel: 'I', widthUnits: 1, category: 'main' },
    { id: 'o', code: 'KeyO', primaryLabel: 'O', widthUnits: 1, category: 'main' },
    { id: 'p', code: 'KeyP', primaryLabel: 'P', widthUnits: 1, category: 'main' },
    { id: 'acute', code: 'Quote', primaryLabel: '´', shiftLabel: '`', widthUnits: 1, category: 'main' },
    { id: 'bracketleft', code: 'BracketLeft', primaryLabel: '[', shiftLabel: '{', altGrLabel: 'ª', widthUnits: 1, category: 'main' },
    { id: 'enter', code: 'Enter', primaryLabel: 'Enter', widthUnits: 1.5, category: 'main' },
  ]
};

export const ABNT2_ROW_3: KeyRow = {
  id: 'row-3',
  keys: [
    { id: 'caps', code: 'CapsLock', primaryLabel: 'Fixa / Caps', widthUnits: 1.75, category: 'main' },
    { id: 'a', code: 'KeyA', primaryLabel: 'A', widthUnits: 1, category: 'main' },
    { id: 's', code: 'KeyS', primaryLabel: 'S', widthUnits: 1, category: 'main' },
    { id: 'd', code: 'KeyD', primaryLabel: 'D', widthUnits: 1, category: 'main' },
    { id: 'f', code: 'KeyF', primaryLabel: 'F', widthUnits: 1, category: 'main' },
    { id: 'g', code: 'KeyG', primaryLabel: 'G', widthUnits: 1, category: 'main' },
    { id: 'h', code: 'KeyH', primaryLabel: 'H', widthUnits: 1, category: 'main' },
    { id: 'j', code: 'KeyJ', primaryLabel: 'J', widthUnits: 1, category: 'main' },
    { id: 'k', code: 'KeyK', primaryLabel: 'K', widthUnits: 1, category: 'main' },
    { id: 'l', code: 'KeyL', primaryLabel: 'L', widthUnits: 1, category: 'main' },
    { id: 'cedilla', code: 'Semicolon', primaryLabel: 'Ç', widthUnits: 1, category: 'main' },
    { id: 'tilde', code: 'Backslash', primaryLabel: '~', shiftLabel: '^', widthUnits: 1, category: 'main' },
    { id: 'bracketright', code: 'BracketRight', primaryLabel: ']', shiftLabel: '}', altGrLabel: 'º', widthUnits: 1.25, category: 'main' },
  ]
};

export const ABNT2_ROW_4: KeyRow = {
  id: 'row-4',
  keys: [
    { id: 'shiftleft', code: 'ShiftLeft', primaryLabel: 'Shift', widthUnits: 1.25, category: 'main' },
    { id: 'backslash', code: 'IntlBackslash', primaryLabel: '\\', shiftLabel: '|', widthUnits: 1, category: 'main' },
    { id: 'z', code: 'KeyZ', primaryLabel: 'Z', widthUnits: 1, category: 'main' },
    { id: 'x', code: 'KeyX', primaryLabel: 'X', widthUnits: 1, category: 'main' },
    { id: 'c', code: 'KeyC', primaryLabel: 'C', altGrLabel: '₢', widthUnits: 1, category: 'main' },
    { id: 'v', code: 'KeyV', primaryLabel: 'V', widthUnits: 1, category: 'main' },
    { id: 'b', code: 'KeyB', primaryLabel: 'B', widthUnits: 1, category: 'main' },
    { id: 'n', code: 'KeyN', primaryLabel: 'N', widthUnits: 1, category: 'main' },
    { id: 'm', code: 'KeyM', primaryLabel: 'M', widthUnits: 1, category: 'main' },
    { id: 'comma', code: 'Comma', primaryLabel: ',', shiftLabel: '<', widthUnits: 1, category: 'main' },
    { id: 'period', code: 'Period', primaryLabel: '.', shiftLabel: '>', widthUnits: 1, category: 'main' },
    { id: 'semicolon', code: 'Slash', primaryLabel: ';', shiftLabel: ':', widthUnits: 1, category: 'main' },
    { id: 'slash_abnt', code: 'IntlRo', primaryLabel: '?', shiftLabel: '/', altGrLabel: '°', widthUnits: 1, category: 'main' },
    { id: 'shiftright', code: 'ShiftRight', primaryLabel: 'Shift', widthUnits: 1.75, category: 'main' },
  ]
};

export const ABNT2_ROW_5: KeyRow = {
  id: 'row-5',
  keys: [
    { id: 'ctrlleft', code: 'ControlLeft', primaryLabel: 'Ctrl', widthUnits: 1.25, category: 'main' },
    { id: 'winleft', code: 'MetaLeft', primaryLabel: 'Win ⊞', widthUnits: 1.25, category: 'main' },
    { id: 'altleft', code: 'AltLeft', primaryLabel: 'Alt', widthUnits: 1.25, category: 'main' },
    { id: 'space', code: 'Space', primaryLabel: 'Espaço / Space', widthUnits: 6.25, category: 'main' },
    { id: 'altgr', code: 'AltRight', primaryLabel: 'Alt Gr', widthUnits: 1.25, category: 'main' },
    { id: 'winright', code: 'MetaRight', primaryLabel: 'Win / Fn', widthUnits: 1.25, category: 'main' },
    { id: 'menu', code: 'ContextMenu', primaryLabel: 'Menu ▤', widthUnits: 1.25, category: 'main' },
    { id: 'ctrlright', code: 'ControlRight', primaryLabel: 'Ctrl', widthUnits: 1.25, category: 'main' },
  ]
};

export const ABNT2_NAV_CLUSTER: KeyData[] = [
  { id: 'ins', code: 'Insert', primaryLabel: 'Ins', widthUnits: 1, category: 'nav' },
  { id: 'home', code: 'Home', primaryLabel: 'Home', widthUnits: 1, category: 'nav' },
  { id: 'pgup', code: 'PageUp', primaryLabel: 'PgUp', widthUnits: 1, category: 'nav' },
  { id: 'del', code: 'Delete', primaryLabel: 'Del', widthUnits: 1, category: 'nav' },
  { id: 'end', code: 'End', primaryLabel: 'End', widthUnits: 1, category: 'nav' },
  { id: 'pgdn', code: 'PageDown', primaryLabel: 'PgDn', widthUnits: 1, category: 'nav' },
  { id: 'arrowup', code: 'ArrowUp', primaryLabel: '▲', widthUnits: 1, category: 'nav' },
  { id: 'arrowleft', code: 'ArrowLeft', primaryLabel: '◀', widthUnits: 1, category: 'nav' },
  { id: 'arrowdown', code: 'ArrowDown', primaryLabel: '▼', widthUnits: 1, category: 'nav' },
  { id: 'arrowright', code: 'ArrowRight', primaryLabel: '▶', widthUnits: 1, category: 'nav' },
];

export const ABNT2_NUMPAD: KeyData[] = [
  { id: 'numlock', code: 'NumLock', primaryLabel: 'NumLock', widthUnits: 1, category: 'numpad' },
  { id: 'numdiv', code: 'NumpadDivide', primaryLabel: '/', widthUnits: 1, category: 'numpad' },
  { id: 'nummult', code: 'NumpadMultiply', primaryLabel: '*', widthUnits: 1, category: 'numpad' },
  { id: 'numsub', code: 'NumpadSubtract', primaryLabel: '-', widthUnits: 1, category: 'numpad' },
  { id: 'num7', code: 'Numpad7', primaryLabel: '7', shiftLabel: 'Home', widthUnits: 1, category: 'numpad' },
  { id: 'num8', code: 'Numpad8', primaryLabel: '8', shiftLabel: '▲', widthUnits: 1, category: 'numpad' },
  { id: 'num9', code: 'Numpad9', primaryLabel: '9', shiftLabel: 'PgUp', widthUnits: 1, category: 'numpad' },
  { id: 'numadd', code: 'NumpadAdd', primaryLabel: '+', widthUnits: 1, heightUnits: 2, category: 'numpad' },
  { id: 'num4', code: 'Numpad4', primaryLabel: '4', shiftLabel: '◀', widthUnits: 1, category: 'numpad' },
  { id: 'num5', code: 'Numpad5', primaryLabel: '5', widthUnits: 1, category: 'numpad' },
  { id: 'num6', code: 'Numpad6', primaryLabel: '6', shiftLabel: '▶', widthUnits: 1, category: 'numpad' },
  { id: 'num1', code: 'Numpad1', primaryLabel: '1', shiftLabel: 'End', widthUnits: 1, category: 'numpad' },
  { id: 'num2', code: 'Numpad2', primaryLabel: '2', shiftLabel: '▼', widthUnits: 1, category: 'numpad' },
  { id: 'num3', code: 'Numpad3', primaryLabel: '3', shiftLabel: 'PgDn', widthUnits: 1, category: 'numpad' },
  { id: 'numenter', code: 'NumpadEnter', primaryLabel: 'Enter', widthUnits: 1, heightUnits: 2, category: 'numpad' },
  { id: 'num0', code: 'Numpad0', primaryLabel: '0', shiftLabel: 'Ins', widthUnits: 2, category: 'numpad' },
  { id: 'numdot', code: 'NumpadDecimal', primaryLabel: ',', shiftLabel: 'Del', widthUnits: 1, category: 'numpad' },
];

export const SIZE_PRESETS: SizePreset[] = [
  {
    id: 'desktop-standard',
    name: 'Desktop Padrão (18mm)',
    description: 'Teclados de PC Desktop convencionais (18x18mm)',
    baseWidthMm: 18,
    baseHeightMm: 18,
    gapMm: 1.2,
    borderRadiusMm: 2,
  },
  {
    id: 'desktop-compact',
    name: 'Desktop Compacto (16.5mm)',
    description: 'Teclados perfil baixo / ABNT2 Slim',
    baseWidthMm: 16.5,
    baseHeightMm: 16.5,
    gapMm: 1.0,
    borderRadiusMm: 2,
  },
  {
    id: 'notebook-standard',
    name: 'Notebook Padrão (15mm)',
    description: 'Maioria dos Notebooks (Dell, Lenovo, HP, Acer, Asus, Positivo)',
    baseWidthMm: 15,
    baseHeightMm: 15,
    gapMm: 1.0,
    borderRadiusMm: 2,
  },
  {
    id: 'notebook-slim',
    name: 'Notebook Slim / Ultrabook (14mm)',
    description: 'Notebooks ultra finos e teclados compactos',
    baseWidthMm: 14,
    baseHeightMm: 14,
    gapMm: 0.8,
    borderRadiusMm: 1.5,
  },
  {
    id: 'notebook-mini',
    name: 'Netbook / Mini (13mm)',
    description: 'Teclados muito pequenos de 10-12 polegadas',
    baseWidthMm: 13,
    baseHeightMm: 13,
    gapMm: 0.8,
    borderRadiusMm: 1,
  },
  {
    id: 'custom',
    name: 'Personalizado (mm)',
    description: 'Defina a largura e altura exatas em milímetros com régua',
    baseWidthMm: 15,
    baseHeightMm: 15,
    gapMm: 1,
    borderRadiusMm: 2,
  }
];

export const COLOR_THEMES: ColorTheme[] = [
  {
    id: 'black-matte',
    name: 'Preto Fosco (Notebooks)',
    bgColor: '#1b1c1e',
    textColor: '#ffffff',
    accentColor: '#38bdf8', // Blue sky for AltGr
    borderColor: '#404040',
    isDark: true,
  },
  {
    id: 'white-classic',
    name: 'Branco / Prata',
    bgColor: '#f8fafc',
    textColor: '#0f172a',
    accentColor: '#2563eb',
    borderColor: '#cbd5e1',
    isDark: false,
  },
  {
    id: 'beige-vintage',
    name: 'Bege Retro / IBM',
    bgColor: '#e5e0d8',
    textColor: '#1c1917',
    accentColor: '#b45309',
    borderColor: '#a8a29e',
    isDark: false,
  },
  {
    id: 'gamer-wasd',
    name: 'Gamer Destaque WASD',
    bgColor: '#111827',
    textColor: '#f9fafb',
    accentColor: '#f59e0b',
    borderColor: '#374151',
    isDark: true,
  },
  {
    id: 'high-contrast',
    name: 'Alto Contraste (Amarelo/Preto)',
    bgColor: '#facc15',
    textColor: '#000000',
    accentColor: '#b91c1c',
    borderColor: '#000000',
    isDark: false,
  }
];

export function getAllAbnt2Keys(): KeyData[] {
  const all: KeyData[] = [];
  ABNT2_FUNCTION_ROW.keys.forEach(k => all.push(k));
  ABNT2_ROW_1.keys.forEach(k => all.push(k));
  ABNT2_ROW_2.keys.forEach(k => all.push(k));
  ABNT2_ROW_3.keys.forEach(k => all.push(k));
  ABNT2_ROW_4.keys.forEach(k => all.push(k));
  ABNT2_ROW_5.keys.forEach(k => all.push(k));
  ABNT2_NAV_CLUSTER.forEach(k => all.push(k));
  ABNT2_NUMPAD.forEach(k => all.push(k));
  return all;
}
