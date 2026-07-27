import React, { useState } from 'react';
import { KeyCapCustomization, PrintMode, KeyData } from './types/keyboard';
import { COLOR_THEMES, getAllAbnt2Keys } from './data/abnt2Data';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { PrintableSheet } from './components/PrintableSheet';
import { KeyCustomizerModal } from './components/KeyCustomizerModal';
import { PrintInstructionsModal } from './components/PrintInstructionsModal';
import { ZoomIn, ZoomOut, Maximize, Printer, Edit, HelpCircle } from 'lucide-react';

export default function App() {
  const allKeys = getAllAbnt2Keys();

  // Initial Customization State
  const initialCustomization: KeyCapCustomization = {
    baseWidthMm: 15, // Notebook standard 15mm
    baseHeightMm: 15,
    gapMm: 1.0,
    borderRadiusMm: 2,
    fontSize: 'medium',
    fontBold: true,
    themeId: 'black-matte',
    customBgColor: '#1b1c1e',
    customTextColor: '#ffffff',
    customAltGrColor: '#38bdf8',
    showCropMarks: true,
    cropMarkStyle: 'solid',
    showRuler: true,
    selectedKeyIds: allKeys.map(k => k.id), // select all by default
    customKeyNotes: {},
    duplicateCounts: {},
  };

  const [customization, setCustomization] = useState<KeyCapCustomization>(initialCustomization);
  const [printMode, setPrintMode] = useState<PrintMode>('full-layout');
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  const activeTheme = COLOR_THEMES.find(t => t.id === customization.themeId) || COLOR_THEMES[0];

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (window.confirm('Deseja restaurar todas as configurações de tamanho, cor e seleção de teclas para o padrão?')) {
      setCustomization(initialCustomization);
      setPrintMode('full-layout');
    }
  };

  const handleKeyClick = (keyData: KeyData) => {
    setIsCustomizerOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans">
      
      {/* Top Header Navigation */}
      <Header
        onPrint={handlePrint}
        onOpenInstructions={() => setIsInstructionsOpen(true)}
        onReset={handleReset}
      />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Interactive Control Panel */}
        <ControlPanel
          customization={customization}
          onChangeCustomization={setCustomization}
          printMode={printMode}
          onChangePrintMode={setPrintMode}
          onOpenKeyCustomizer={() => setIsCustomizerOpen(true)}
          onOpenInstructions={() => setIsInstructionsOpen(true)}
          onPrint={handlePrint}
        />

        {/* Right Preview Canvas Area */}
        <main className="flex-1 bg-gray-200/80 dark:bg-gray-900/80 flex flex-col items-center justify-start overflow-auto p-4 sm:p-6 relative">
          
          {/* Zoom & Quick Toolbar Floating Controls */}
          <div className="no-print sticky top-2 z-30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex items-center gap-4 mb-4">
            <span className="text-xs font-bold text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
              Visualização A4:
            </span>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setZoomLevel(prev => Math.max(50, prev - 10))}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 transition-colors"
                title="Diminuir Zoom"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              
              <span className="text-xs font-mono font-bold w-12 text-center text-gray-800 dark:text-gray-200">
                {zoomLevel}%
              </span>

              <button
                onClick={() => setZoomLevel(prev => Math.min(150, prev + 10))}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 transition-colors"
                title="Aumentar Zoom"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                onClick={() => setZoomLevel(100)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 transition-colors"
                title="Redefinir Zoom 100%"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>

            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700" />

            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <Edit className="w-3.5 h-3.5" /> Editar Teclas
            </button>

            <button
              onClick={() => setIsInstructionsOpen(true)}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" /> Dicas de Papel
            </button>
          </div>

          {/* Printable A4 Sheet Preview */}
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="transition-transform duration-150"
          >
            <PrintableSheet
              customization={customization}
              printMode={printMode}
              onKeyClick={handleKeyClick}
            />
          </div>

        </main>
      </div>

      {/* Key Customizer Modal */}
      <KeyCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        customization={customization}
        theme={activeTheme}
        onChangeCustomization={setCustomization}
      />

      {/* Print Instructions & Paper Guide Modal */}
      <PrintInstructionsModal
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
        onPrintNow={handlePrint}
      />

    </div>
  );
}
