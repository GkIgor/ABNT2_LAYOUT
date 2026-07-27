import React from 'react';

export const A4Ruler: React.FC = () => {
  return (
    <div className="w-full mb-3 pb-2 border-b border-gray-300 dark:border-gray-700 flex flex-col items-center select-none text-xs text-gray-600 dark:text-gray-400">
      <div className="flex items-center justify-between w-full max-w-[200mm] px-1 mb-1">
        <span className="font-semibold text-[11px] text-gray-700 dark:text-gray-300">
          Régua de Teste de Escala A4 (100 mm / 10 cm)
        </span>
        <span className="text-[10px] text-gray-500">
          Meça com uma régua física após imprimir para garantir 100% de precisão.
        </span>
      </div>
      
      {/* 100mm physical width ruler */}
      <div 
        style={{ width: '100mm' }} 
        className="h-6 border-l-2 border-r-2 border-gray-900 dark:border-gray-100 relative bg-gray-50 dark:bg-gray-800/50 flex flex-col justify-end overflow-hidden rounded-xs"
      >
        {/* Millimeter ticks */}
        <div className="absolute inset-0 flex justify-between items-end">
          {Array.from({ length: 11 }).map((_, cmIndex) => (
            <div key={cmIndex} className="relative flex flex-col items-center">
              {/* CM Tick */}
              <div className="w-[1.5px] h-3.5 bg-gray-900 dark:bg-gray-100" />
              <span className="text-[8px] font-bold mt-0.5 leading-none text-gray-800 dark:text-gray-200">
                {cmIndex}
              </span>
              
              {/* Half CM & MM sub-ticks if not last */}
              {cmIndex < 10 && (
                <div className="absolute left-[10mm] top-0 -translate-x-[10mm] w-[10mm] h-full flex justify-between items-end pointer-events-none">
                  {Array.from({ length: 9 }).map((_, mmIndex) => {
                    const isMid = mmIndex === 4;
                    return (
                      <div
                        key={mmIndex}
                        style={{ height: isMid ? '8px' : '4px' }}
                        className={`w-[1px] ${isMid ? 'bg-gray-700 dark:bg-gray-300' : 'bg-gray-400 dark:bg-gray-600'}`}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
