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
      
      {/* 100mm physical width ruler container */}
      <div 
        style={{ width: '100mm', height: '24px' }} 
        className="relative bg-gray-50 dark:bg-gray-800/50 border border-gray-400 dark:border-gray-600 rounded-xs overflow-hidden"
      >
        {/* Render 0 to 100mm ticks */}
        {Array.from({ length: 101 }).map((_, mm) => {
          const isCm = mm % 10 === 0;
          const isHalfCm = mm % 5 === 0 && !isCm;

          if (isCm) {
            const cmVal = mm / 10;
            return (
              <React.Fragment key={mm}>
                {/* CM Line */}
                <div
                  style={{ left: `${mm}mm` }}
                  className="absolute top-0 w-[1.5px] h-3.5 bg-gray-900 dark:bg-gray-100 -translate-x-1/2"
                />
                {/* CM Label */}
                <span
                  style={{ left: `${mm}mm` }}
                  className="absolute bottom-0.5 text-[8px] font-bold leading-none text-gray-900 dark:text-gray-100 -translate-x-1/2"
                >
                  {cmVal}
                </span>
              </React.Fragment>
            );
          }

          if (isHalfCm) {
            return (
              <div
                key={mm}
                style={{ left: `${mm}mm` }}
                className="absolute top-0 w-[1px] h-2.5 bg-gray-700 dark:bg-gray-300 -translate-x-1/2"
              />
            );
          }

          return (
            <div
              key={mm}
              style={{ left: `${mm}mm` }}
              className="absolute top-0 w-[1px] h-1.5 bg-gray-400 dark:bg-gray-600 -translate-x-1/2"
            />
          );
        })}
      </div>
    </div>
  );
};

