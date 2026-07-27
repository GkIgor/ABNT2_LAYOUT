import React from 'react';
import { KeyCapCustomization, PrintMode, KeyData } from '../types/keyboard';
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

  // Helper to render a strict horizontal row of keys without wrapping
  const renderRow = (keys: KeyData[]) => (
    <div
      style={{ gap: `${customization.gapMm}mm` }}
      className="flex flex-nowrap items-center shrink-0"
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

  // Nav Cluster Structured Layout (Ins/Home/PgUp, Del/End/PgDn, Arrows)
  const renderNavCluster = () => {
    const findKey = (id: string) => ABNT2_NAV_CLUSTER.find(k => k.id === id);
    const topRow1 = ['ins', 'home', 'pgup'].map(findKey).filter(Boolean) as KeyData[];
    const topRow2 = ['del', 'end', 'pgdn'].map(findKey).filter(Boolean) as KeyData[];
    
    const arrowUp = findKey('arrowup');
    const arrowLeft = findKey('arrowleft');
    const arrowDown = findKey('arrowdown');
    const arrowRight = findKey('arrowright');

    const gap = customization.gapMm;
    const keyWidth = customization.baseWidthMm;

    return (
      <div className="flex flex-col gap-2">
        <div style={{ gap: `${gap}mm` }} className="flex flex-col">
          {renderRow(topRow1)}
          {renderRow(topRow2)}
        </div>

        {/* Arrow Keys */}
        <div style={{ marginTop: `${gap * 2}mm` }} className="flex flex-col gap-[1mm]">
          {/* Top Arrow Row: spacer, Up, spacer */}
          <div style={{ gap: `${gap}mm` }} className="flex items-center">
            <div style={{ width: `${keyWidth}mm` }} />
            {arrowUp && (
              <KeyCap
                key={arrowUp.id}
                keyData={arrowUp}
                customization={customization}
                theme={theme}
                isSelected={customization.selectedKeyIds.includes(arrowUp.id)}
                onClick={() => onKeyClick && onKeyClick(arrowUp)}
              />
            )}
          </div>
          {/* Bottom Arrow Row: Left, Down, Right */}
          <div style={{ gap: `${gap}mm` }} className="flex items-center">
            {[arrowLeft, arrowDown, arrowRight].map(k => k && (
              <KeyCap
                key={k.id}
                keyData={k}
                customization={customization}
                theme={theme}
                isSelected={customization.selectedKeyIds.includes(k.id)}
                onClick={() => onKeyClick && onKeyClick(k)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Numpad Structured 4-column Grid Layout
  const renderNumpad = () => {
    const findKey = (id: string) => ABNT2_NUMPAD.find(k => k.id === id);
    const row1 = ['np_numlock', 'np_div', 'np_mult', 'np_sub'].map(findKey).filter(Boolean) as KeyData[];
    const row2 = ['np_num7', 'np_num8', 'np_num9', 'np_numadd'].map(findKey).filter(Boolean) as KeyData[];
    const row3 = ['np_num4', 'np_num5', 'np_num6'].map(findKey).filter(Boolean) as KeyData[];
    const row4 = ['np_num1', 'np_num2', 'np_num3', 'np_numenter'].map(findKey).filter(Boolean) as KeyData[];
    const row5 = ['np_num0', 'np_dot'].map(findKey).filter(Boolean) as KeyData[];

    return (
      <div style={{ gap: `${customization.gapMm}mm` }} className="flex flex-col">
        {renderRow(row1)}
        {renderRow(row2)}
        {renderRow(row3)}
        {renderRow(row4)}
        {renderRow(row5)}
      </div>
    );
  };

  // Calculate row width in mm for scaling full-layout if needed
  // 15u is max width of main row. Width = 15 * baseWidth + 14 * gap
  const maxMainRowWidthMm = 15 * customization.baseWidthMm + 14 * customization.gapMm;
  const availablePrintableWidthMm = 190; // A4 210mm - 20mm margins
  const scaleFactor = maxMainRowWidthMm > availablePrintableWidthMm
    ? availablePrintableWidthMm / maxMainRowWidthMm
    : 1;

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
              
              {/* Scale Wrapper if row width exceeds page bounds */}
              <div
                style={{
                  transform: scaleFactor < 1 ? `scale(${scaleFactor})` : undefined,
                  transformOrigin: 'top left',
                  width: scaleFactor < 1 ? `${(100 / scaleFactor).toFixed(1)}%` : '100%',
                }}
                className="space-y-4 transition-transform duration-150"
              >
                {/* Main QWERTY Block */}
                <div
                  style={{ gap: `${customization.gapMm}mm` }}
                  className="flex flex-col p-3 border border-gray-300 rounded-lg bg-gray-50/50 overflow-x-auto"
                >
                  <div className="text-[9px] font-bold uppercase text-gray-500 mb-1">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  
                  {/* Navigation Cluster */}
                  <div
                    style={{ gap: `${customization.gapMm}mm` }}
                    className="p-3 border border-gray-300 rounded-lg bg-gray-50/50 flex flex-col"
                  >
                    <div className="text-[9px] font-bold uppercase text-gray-500 mb-2">
                      Bloco de Navegação & Setas
                    </div>
                    {renderNavCluster()}
                  </div>

                  {/* Numeric Keypad */}
                  <div
                    style={{ gap: `${customization.gapMm}mm` }}
                    className="p-3 border border-gray-300 rounded-lg bg-gray-50/50 flex flex-col"
                  >
                    <div className="text-[9px] font-bold uppercase text-gray-500 mb-2">
                      Teclado Numérico (Numpad)
                    </div>
                    {renderNumpad()}
                  </div>

                </div>
              </div>

              {scaleFactor < 1 && (
                <div className="no-print p-2 bg-amber-50 border border-amber-200 rounded-lg text-[10px] text-amber-800 flex items-center justify-between">
                  <span>
                    💡 <strong>Nota de Escala:</strong> No modo "Layout Completo", o layout foi ajustado para caber na largura da folha A4.
                  </span>
                  <span className="font-semibold text-amber-900">
                    Para imprimir 100% em Tamanho Real (1:1), selecione "Grade Otimizada".
                  </span>
                </div>
              )}

            </div>
          )}

          {/* Mode 2: Grid Sheet (Grade Compacta para Corte Fácil em Tamanho Real 1:1) */}
          {printMode === 'grid-sheet' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase text-gray-600 mb-1 border-b border-gray-200 pb-1">
                <span>Grade Otimizada para Corte Sequencial 1:1 ({allKeys.length} Teclas)</span>
                <span className="text-emerald-600 font-mono text-[9px]">Escala Física Real 100% (1:1)</span>
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

          {/* Mode 3: Selected Keys Only (Tamanho Real 1:1) */}
          {printMode === 'selected-only' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase text-gray-600 mb-1 border-b border-gray-200 pb-1">
                <span>Teclas Selecionadas para Substituição ({selectedKeys.length} itens)</span>
                <span className="text-emerald-600 font-mono text-[9px]">Escala Física Real 100% (1:1)</span>
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
        <div className="pt-3 border-t border-gray-200 mt-6 flex justify-between items-center text-[8px] text-gray-400">
          <span>Gerado por Teclado ABNT2 Imprimível A4 • Imprimir sem margens (Escala 100%)</span>
          <span>Dica: Aplique fita adesiva transparente antes de cortar para proteger a impressão contra fricção.</span>
        </div>

      </div>
    </div>
  );
};

