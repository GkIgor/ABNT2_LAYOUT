import React from 'react';
import { Keyboard, Printer, FileText, RotateCcw, Sparkles } from 'lucide-react';

interface HeaderProps {
  onPrint: () => void;
  onOpenInstructions: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onPrint,
  onOpenInstructions,
  onReset,
}) => {
  return (
    <header className="no-print bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-40 shadow-2xs">
      
      {/* App Identity */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-xl shadow-xs flex items-center justify-center">
          <Keyboard className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 leading-none flex items-center gap-2">
            Teclado ABNT 2 Imprimível
            <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md border border-gray-200 dark:border-gray-700">
              Folha A4
            </span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 hidden sm:block">
            Substituição de teclas para Notebooks e Desktops • Otimizado para papel A4
          </p>
        </div>
      </div>

      {/* Top Action Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onReset}
          className="px-2.5 py-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          title="Restaurar configurações padrão"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Restaurar</span>
        </button>

        <button
          onClick={onOpenInstructions}
          className="px-3 py-2 bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer border border-gray-200/60 dark:border-gray-700/60"
        >
          <FileText className="w-4 h-4 text-blue-500" />
          <span className="hidden sm:inline">Guia de Impressão</span>
        </button>

        <button
          onClick={onPrint}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir A4</span>
        </button>
      </div>

    </header>
  );
};
