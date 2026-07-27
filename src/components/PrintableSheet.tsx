import React from 'react';
import { KeyCapCustomization, PrintMode, ColorTheme, KeyData } from '../types/keyboard';
import {
  ABNT2_FUNCTION_ROW,
  ABNT2_ROW_1,
  ABNT2_ROW_2,
  ABNT2_ROW_3,
  ABNT2_ROW_4,
  ABNT2_ROW_5,
  ABNT2_NAV_CLUSTER,
  ABNT2_NUMPAD,
  COLOR_THEMES,
  getAllAbnt2Keys,
} from '../data/abnt2Data';
import { KeyCap } from './KeyCap';
import { A4Ruler } from './A4Ruler';

interface PrintableSheetProps {
  customization: KeyCapCustomization;
  printMode: PrintMode;
  onKeyClick?: (keyData: KeyData) => void;
}

export const PrintableSheet: React.FC<PrintableSheetProps> = ({
  customization,
  printMode,
  onKeyClick,
}) => {
  const theme = COLOR_THEMES.find(t => t.id === customization.themeId) || COLOR_THEMES[0];
  const allKeys = getAllAbnt2Keys();

  // Helper to render a row of keys
  const renderRow = (keys: KeyData[]) => (
    <div
      style={{ gap: `${customization.gapMm}mm` }}
      className="flex flex-wrap items-center"
    >
      {keys.map(key => {
        const isSelected = customization.selectedKeyIds.includes(key.id);
        return (
          <KeyCap
            key={key.id}
            keyData={key}
            customization={customization}
            theme={theme}
            isSelected={isSelected}
            onClick={() => onKeyClick && onKeyClick(key)}
          />
        );
      })}
    </div>
  );

  // Helper for Selected / Grid Mode list with duplicates
  const getSelectedKeysWithDuplicates = (): KeyData[] => {
    const list: KeyData[] = [];
    allKeys.forEach(k => {
      if (customization.selectedKeyIds.includes(k.id)) {
        const count = customization.duplicateCounts[k.id] || 1;
        for (let i = 0; i < count; i++) {
          list.push(k);
        }
      }
    });
    return list;
  };

  const selectedKeys = getSelectedKeysWithDuplicates();

  return (
    <div className="print-sheet-wrapper flex flex-col items-center justify-center p-4 sm:p-8 overflow-x-auto w-full">
      {/* 
        A4 Physical Dimensions in CSS: 210mm x 297mm
        Screen view: styled as paper sheet with shadow
      */}
      <div
        id="a4-printable-area"
        style={{
          width: '210mm',
          minHeight: '297mm',
          padding: '10mm',
          boxSizing: 'border-box',
        }}
        className="print-sheet bg-white text-gray-900 shadow-2xl dark:shadow-black/50 border border-gray-200 dark:border-gray-800 rounded-sm flex flex-col justify-between transition-all duration-200"
      >
        {/* Top Header info & Calibration Ruler */}
        <div>
          {customization.showRuler && <A4Ruler />}

          <div className="flex items-center justify-between border-b pb-2 mb-4 border-gray-200">
            <div>
              <h1 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                Teclado ABNT 2 — Folha de Impressão para Substituição de Teclas
              </h1>
              <p className="text-[9px] text-gray-500">
                Escala Real A4 (210x297mm) • Tamanho Base: {customization.baseWidthMm}x{customization.baseHeightMm}mm
              </p>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-mono text-gray-400">
                Modo: {printMode === 'full-layout' ? 'Layout Completo' : printMode === 'grid-sheet' ? 'Grade Otimizada' : 'Teclas Selecionadas'}
              </span>
            </div>
          </div>

          {/* Mode 1: Full Keyboard Layout (Layout Completo Montado) */}
          {printMode === 'full-layout' && (
            <div className="space-y-4">
              
              {/* Main QWERTY Block */}
              <div
                style={{ gap: `${customization.gapMm}mm` }}
                className="flex flex-col p-2 border border-gray-200 rounded-md bg-gray-50/50"
              >
                <div className="text-[8px] font-bold uppercase text-gray-400 mb-0.5">
                  Bloco Principal QWERTY ABNT 2
                </div>
                {renderRow(ABNT2_FUNCTION_ROW.keys)}
                <div style={{ height: `${customization.gapMm}mm` }} />
                {renderRow(ABNT2_ROW_1.keys)}
                {renderRow(ABNT2_ROW_2.keys)}
                {renderRow(ABNT2_ROW_3.keys)}
                {renderRow(ABNT2_ROW_4.keys)}
                {renderRow(ABNT2_ROW_5.keys)}
              </div>

              {/* Secondary Blocks: Nav Cluster & Numpad */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                
                {/* Navigation Cluster */}
                <div
                  style={{ gap: `${customization.gapMm}mm` }}
                  className="p-2 border border-gray-200 rounded-md bg-gray-50/50 flex flex-col gap-1"
                >
                  <div className="text-[8px] font-bold uppercase text-gray-400 mb-0.5">
                    Bloco de Navegação & Setas
                  </div>
                  {renderRow(ABNT2_NAV_CLUSTER)}
                </div>

                {/* Numeric Keypad */}
                <div
                  style={{ gap: `${customization.gapMm}mm` }}
                  className="p-2 border border-gray-200 rounded-md bg-gray-50/50 flex flex-col gap-1"
                >
                  <div className="text-[8px] font-bold uppercase text-gray-400 mb-0.5">
                    Teclado Numérico (Numpad)
                  </div>
                  {renderRow(ABNT2_NUMPAD)}
                </div>

              </div>

            </div>
          )}

          {/* Mode 2: Grid Sheet (Grade Compacta para Corte Fácil) */}
          {printMode === 'grid-sheet' && (
            <div className="space-y-3">
              <div className="text-[10px] font-bold uppercase text-gray-500 mb-1">
                Grade Otimizada para Corte Sequencial ({allKeys.length} Teclas)
              </div>
              <div
                style={{ gap: `${customization.gapMm}mm` }}
                className="flex flex-wrap items-center justify-start"
              >
                {allKeys.map(key => {
                  const isSelected = customization.selectedKeyIds.includes(key.id);
                  return (
                    <KeyCap
                      key={key.id}
                      keyData={key}
                      customization={customization}
                      theme={theme}
                      isSelected={isSelected}
                      onClick={() => onKeyClick && onKeyClick(key)}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Mode 3: Selected Keys Only */}
          {printMode === 'selected-only' && (
            <div className="space-y-3">
              <div className="text-[10px] font-bold uppercase text-gray-500 mb-1">
                Teclas Selecionadas para Substituição ({selectedKeys.length} itens)
              </div>

              {selectedKeys.length === 0 ? (
                <div className="p-8 border-2 border-dashed border-gray-300 rounded-xl text-center text-xs text-gray-500">
                  Nenhuma tecla selecionada. Abra o painel de seleção para escolher quais teclas imprimir.
                </div>
              ) : (
                <div
                  style={{ gap: `${customization.gapMm}mm` }}
                  className="flex flex-wrap items-center justify-start"
                >
                  {selectedKeys.map((key, index) => (
                    <KeyCap
                      key={`${key.id}-${index}`}
                      keyData={key}
                      customization={customization}
                      theme={theme}
                      isSelected={true}
                      onClick={() => onKeyClick && onKeyClick(key)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Print Sheet Footer Note */}
        <div className="pt-4 border-t border-gray-200 mt-6 flex justify-between items-center text-[8px] text-gray-400">
          <span>Gerado por Teclado ABNT2 Imprimível A4</span>
          <span>Dica: Cole fita transparente por cima antes de cortar para maior durabilidade.</span>
        </div>

      </div>
    </div>
  );
};
