import React from 'react';
import { KeyCapCustomization, PrintMode, ColorTheme } from '../types/keyboard';
import { SIZE_PRESETS, COLOR_THEMES } from '../data/abnt2Data';
import {
  Sliders,
  Palette,
  LayoutGrid,
  Maximize2,
  Type,
  Grid,
  CheckCircle2,
  Edit,
  Printer,
  Sparkles,
  Scissors
} from 'lucide-react';

interface ControlPanelProps {
  customization: KeyCapCustomization;
  onChangeCustomization: (updated: KeyCapCustomization) => void;
  printMode: PrintMode;
  onChangePrintMode: (mode: PrintMode) => void;
  onOpenKeyCustomizer: () => void;
  onOpenInstructions: () => void;
  onPrint: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  customization,
  onChangeCustomization,
  printMode,
  onChangePrintMode,
  onOpenKeyCustomizer,
  onOpenInstructions,
  onPrint,
}) => {
  const activePresetId = SIZE_PRESETS.find(
    p => p.baseWidthMm === customization.baseWidthMm && p.baseHeightMm === customization.baseHeightMm
  )?.id || 'custom';

  const activeTheme = COLOR_THEMES.find(t => t.id === customization.themeId) || COLOR_THEMES[0];

  const handlePresetSelect = (presetId: string) => {
    const preset = SIZE_PRESETS.find(p => p.id === presetId);
    if (!preset) return;
    onChangeCustomization({
      ...customization,
      baseWidthMm: preset.baseWidthMm,
      baseHeightMm: preset.baseHeightMm,
      gapMm: preset.gapMm,
      borderRadiusMm: preset.borderRadiusMm,
    });
  };

  const handleThemeSelect = (themeId: string) => {
    const theme = COLOR_THEMES.find(t => t.id === themeId);
    onChangeCustomization({
      ...customization,
      themeId,
      customBgColor: theme?.bgColor || customization.customBgColor,
      customTextColor: theme?.textColor || customization.customTextColor,
      customAltGrColor: theme?.accentColor || customization.customAltGrColor,
    });
  };

  return (
    <aside className="no-print bg-gray-50/50 dark:bg-gray-950 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 p-4 sm:p-5 w-full lg:w-96 flex flex-col gap-4 shrink-0 overflow-y-auto max-h-screen">
      
      {/* Primary Actions Bento Box */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-4 shadow-2xs space-y-2.5">
        <button
          onClick={onPrint}
          className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm transition-all duration-150 flex items-center justify-center gap-2 text-sm active:scale-98 cursor-pointer"
        >
          <Printer className="w-5 h-5" />
          Imprimir Folha A4
        </button>

        <button
          onClick={onOpenInstructions}
          className="w-full py-2.5 px-3 bg-blue-50/80 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 border border-blue-200/70 dark:border-blue-800/60 cursor-pointer"
        >
          <Scissors className="w-4 h-4 text-blue-500" />
          Guia de Papel & Dicas de Corte
        </button>
      </div>

      {/* Print Mode Selector Bento Card */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-4 shadow-2xs space-y-3">
        <label className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider flex items-center gap-2">
          <span className="p-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-lg">
            <LayoutGrid className="w-3.5 h-3.5" />
          </span>
          Modo de Exibição / Layout
        </label>
        
        <div className="grid grid-cols-2 gap-1.5 bg-gray-100/80 dark:bg-gray-800/80 p-1.5 rounded-xl">
          <button
            onClick={() => onChangePrintMode('full-layout')}
            className={`py-2 px-2 text-[11px] font-bold rounded-lg transition-all text-center leading-tight cursor-pointer ${
              printMode === 'full-layout'
                ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-xs ring-1 ring-black/5 dark:ring-white/10'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Teclado Completo
          </button>

          <button
            onClick={() => onChangePrintMode('grid-sheet')}
            className={`py-2 px-2 text-[11px] font-bold rounded-lg transition-all text-center leading-tight cursor-pointer ${
              printMode === 'grid-sheet'
                ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-xs ring-1 ring-black/5 dark:ring-white/10'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Grade Otimizada
          </button>

          <button
            onClick={() => onChangePrintMode('selected-only')}
            className={`py-2 px-2 text-[11px] font-bold rounded-lg transition-all text-center leading-tight cursor-pointer ${
              printMode === 'selected-only'
                ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-xs ring-1 ring-black/5 dark:ring-white/10'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Apenas Selecionadas
          </button>

          <button
            onClick={() => onChangePrintMode('test-sheet')}
            className={`py-2 px-2 text-[11px] font-bold rounded-lg transition-all text-center leading-tight cursor-pointer flex items-center justify-center gap-1 ${
              printMode === 'test-sheet'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40'
            }`}
          >
            <Sparkles className="w-3 h-3 shrink-0" />
            Folha de Teste
          </button>
        </div>
      </div>

      {/* Orientation Selector Bento Card */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-4 shadow-2xs space-y-3">
        <label className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider flex items-center gap-2">
          <span className="p-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-lg">
            <Sliders className="w-3.5 h-3.5" />
          </span>
          Orientação da Folha A4
        </label>

        <div className="grid grid-cols-2 gap-1.5 bg-gray-100/80 dark:bg-gray-800/80 p-1.5 rounded-xl">
          <button
            onClick={() =>
              onChangeCustomization({
                ...customization,
                orientation: 'portrait',
              })
            }
            className={`py-2 px-2 text-[11px] font-bold rounded-lg transition-all text-center cursor-pointer ${
              customization.orientation === 'portrait' || !customization.orientation
                ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-xs ring-1 ring-black/5 dark:ring-white/10'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Retrato (210x297mm)
          </button>

          <button
            onClick={() =>
              onChangeCustomization({
                ...customization,
                orientation: 'landscape',
              })
            }
            className={`py-2 px-2 text-[11px] font-bold rounded-lg transition-all text-center cursor-pointer ${
              customization.orientation === 'landscape'
                ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-xs ring-1 ring-black/5 dark:ring-white/10'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Paisagem (297x210mm)
          </button>
        </div>
      </div>

      {/* Size Presets Bento Card */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-4 shadow-2xs space-y-3">
        <label className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider flex items-center gap-2">
          <span className="p-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-lg">
            <Maximize2 className="w-3.5 h-3.5" />
          </span>
          Tamanho das Teclas (mm)
        </label>

        <select
          value={activePresetId}
          onChange={e => handlePresetSelect(e.target.value)}
          className="w-full px-3 py-2 text-xs font-medium bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/80 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          {SIZE_PRESETS.map(preset => (
            <option key={preset.id} value={preset.id}>
              {preset.name}
            </option>
          ))}
        </select>

        {/* Custom dimensions inputs */}
        <div className="p-3 bg-gray-50/80 dark:bg-gray-800/50 rounded-xl space-y-2.5 border border-gray-200/60 dark:border-gray-800">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-400 font-medium">Largura (1u):</span>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min={10}
                max={30}
                step={0.5}
                value={customization.baseWidthMm}
                onChange={e =>
                  onChangeCustomization({
                    ...customization,
                    baseWidthMm: parseFloat(e.target.value) || 15,
                  })
                }
                className="w-16 px-1.5 py-0.5 text-center bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-xs font-bold font-mono"
              />
              <span className="text-[10px] font-bold text-gray-500">mm</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-400 font-medium">Altura (1u):</span>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min={10}
                max={30}
                step={0.5}
                value={customization.baseHeightMm}
                onChange={e =>
                  onChangeCustomization({
                    ...customization,
                    baseHeightMm: parseFloat(e.target.value) || 15,
                  })
                }
                className="w-16 px-1.5 py-0.5 text-center bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-xs font-bold font-mono"
              />
              <span className="text-[10px] font-bold text-gray-500">mm</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-400 font-medium">Espaçamento de Corte:</span>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min={0}
                max={5}
                step={0.2}
                value={customization.gapMm}
                onChange={e =>
                  onChangeCustomization({
                    ...customization,
                    gapMm: parseFloat(e.target.value) || 1,
                  })
                }
                className="w-16 px-1.5 py-0.5 text-center bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-xs font-bold font-mono"
              />
              <span className="text-[10px] font-bold text-gray-500">mm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Color Themes Bento Card */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-4 shadow-2xs space-y-3">
        <label className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider flex items-center gap-2">
          <span className="p-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-lg">
            <Palette className="w-3.5 h-3.5" />
          </span>
          Estilo Visual & Cores
        </label>

        <div className="grid grid-cols-1 gap-2">
          {COLOR_THEMES.map(theme => {
            const isSelected = customization.themeId === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => handleThemeSelect(theme.id)}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/50 dark:bg-blue-950/30'
                    : 'border-gray-200/80 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    style={{ backgroundColor: theme.bgColor, borderColor: theme.borderColor }}
                    className="w-6 h-6 rounded-md border flex items-center justify-center text-[10px] font-bold shadow-2xs"
                  >
                    <span style={{ color: theme.textColor }}>A</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                    {theme.name}
                  </span>
                </div>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Crop Marks Bento Card */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-4 shadow-2xs space-y-3">
        <label className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider flex items-center gap-2">
          <span className="p-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-lg">
            <Grid className="w-3.5 h-3.5" />
          </span>
          Linhas de Corte & Bordas
        </label>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-1">
              Estilo da Borda:
            </label>
            <select
              value={customization.cropMarkStyle}
              onChange={e =>
                onChangeCustomization({
                  ...customization,
                  cropMarkStyle: e.target.value as any,
                })
              }
              className="w-full px-2.5 py-1.5 text-xs bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 cursor-pointer"
            >
              <option value="solid">Sólida (Recomendado)</option>
              <option value="dashed">Pontilhada</option>
              <option value="corners">Cruzes de Canto</option>
              <option value="none">Sem Borda</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-1">
              Arredondamento:
            </label>
            <select
              value={customization.borderRadiusMm}
              onChange={e =>
                onChangeCustomization({
                  ...customization,
                  borderRadiusMm: parseFloat(e.target.value) || 0,
                })
              }
              className="w-full px-2.5 py-1.5 text-xs bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 cursor-pointer"
            >
              <option value="0">0 mm (Corte Reto)</option>
              <option value="1">1 mm (Suave)</option>
              <option value="2">2 mm (Padrão)</option>
              <option value="3">3 mm (Arredondado)</option>
            </select>
          </div>
        </div>

        <div className="pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={customization.showRuler}
              onChange={e =>
                onChangeCustomization({
                  ...customization,
                  showRuler: e.target.checked,
                })
              }
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            Exibir Régua de Teste (10 cm) no topo
          </label>
        </div>
      </div>

      {/* Typography Bento Card */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-4 shadow-2xs space-y-3">
        <label className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider flex items-center gap-2">
          <span className="p-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-lg">
            <Type className="w-3.5 h-3.5" />
          </span>
          Fonte dos Caracteres
        </label>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-1">
              Tamanho do Texto:
            </label>
            <select
              value={customization.fontSize}
              onChange={e =>
                onChangeCustomization({
                  ...customization,
                  fontSize: e.target.value as any,
                })
              }
              className="w-full px-2.5 py-1.5 text-xs bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 cursor-pointer"
            >
              <option value="small">Pequena</option>
              <option value="medium">Média (Padrão)</option>
              <option value="large">Grande</option>
              <option value="xlarge">Extra Grande</option>
            </select>
          </div>

          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={customization.fontBold}
                onChange={e =>
                  onChangeCustomization({
                    ...customization,
                    fontBold: e.target.checked,
                  })
                }
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              Texto Negrito
            </label>
          </div>
        </div>
      </div>

      {/* Key Customizer Button Bento Box */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-3 shadow-2xs">
        <button
          onClick={onOpenKeyCustomizer}
          className="w-full py-2.5 px-3 bg-gray-100 hover:bg-gray-200/80 dark:bg-gray-800 dark:hover:bg-gray-700/80 text-gray-800 dark:text-gray-200 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Edit className="w-4 h-4 text-blue-500" />
          Editar Teclas Individuais ({customization.selectedKeyIds.length})
        </button>
      </div>

    </aside>
  );
};
