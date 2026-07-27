import React, { useState } from 'react';
import { KeyData, KeyCapCustomization, ColorTheme } from '../types/keyboard';
import { getAllAbnt2Keys } from '../data/abnt2Data';
import { KeyCap } from './KeyCap';
import { Search, X, Check, RotateCcw, Plus, Minus, Edit3, Palette, Sparkles } from 'lucide-react';

interface KeyCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customization: KeyCapCustomization;
  theme: ColorTheme;
  onChangeCustomization: (updated: KeyCapCustomization) => void;
}

export const KeyCustomizerModal: React.FC<KeyCustomizerModalProps> = ({
  isOpen,
  onClose,
  customization,
  theme,
  onChangeCustomization,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingKeyId, setEditingKeyId] = useState<string | null>(null);
  
  if (!isOpen) return null;

  const allKeys = getAllAbnt2Keys();

  const filteredKeys = allKeys.filter(k => {
    const override = customization.customKeyNotes[k.id] || {};
    const primary = (override.primaryLabel || k.primaryLabel).toLowerCase();
    const shift = (override.shiftLabel || k.shiftLabel || '').toLowerCase();
    const altGr = (override.altGrLabel || k.altGrLabel || '').toLowerCase();
    const term = searchTerm.toLowerCase();
    return k.id.includes(term) || primary.includes(term) || shift.includes(term) || altGr.includes(term);
  });

  const activeEditingKey = allKeys.find(k => k.id === editingKeyId);
  const activeOverride = editingKeyId ? customization.customKeyNotes[editingKeyId] || {} : {};

  const handleToggleKeySelect = (keyId: string) => {
    const isSelected = customization.selectedKeyIds.includes(keyId);
    let newSelected: string[];
    if (isSelected) {
      newSelected = customization.selectedKeyIds.filter(id => id !== keyId);
    } else {
      newSelected = [...customization.selectedKeyIds, keyId];
    }
    onChangeCustomization({ ...customization, selectedKeyIds: newSelected });
  };

  const handleSelectAll = () => {
    onChangeCustomization({
      ...customization,
      selectedKeyIds: allKeys.map(k => k.id),
    });
  };

  const handleDeselectAll = () => {
    onChangeCustomization({
      ...customization,
      selectedKeyIds: [],
    });
  };

  const handleDuplicateChange = (keyId: string, delta: number) => {
    const current = customization.duplicateCounts[keyId] || 1;
    const nextCount = Math.max(1, current + delta);
    onChangeCustomization({
      ...customization,
      duplicateCounts: {
        ...customization.duplicateCounts,
        [keyId]: nextCount,
      },
    });
  };

  const handleUpdateKeyOverride = (keyId: string, fields: Partial<KeyData>) => {
    onChangeCustomization({
      ...customization,
      customKeyNotes: {
        ...customization.customKeyNotes,
        [keyId]: {
          ...(customization.customKeyNotes[keyId] || {}),
          ...fields,
        },
      },
    });
  };

  const handleResetKeyOverride = (keyId: string) => {
    const newNotes = { ...customization.customKeyNotes };
    delete newNotes[keyId];
    onChangeCustomization({
      ...customization,
      customKeyNotes: newNotes,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Editor e Seleção de Teclas ABNT 2
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Escolha quais teclas deseja imprimir, edite os símbolos ou adicione cópias extras de substituição.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Quick Actions & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar tecla (ex: Ç, Enter, Shift, ?, Esc, F5)..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSelectAll}
                className="px-3 py-2 text-xs font-semibold bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" /> Select Todas
              </button>
              <button
                onClick={handleDeselectAll}
                className="px-3 py-2 text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5"
              >
                Desmarcar Todas
              </button>
            </div>
          </div>

          {/* Active Key Quick Editor Drawer if a key is being edited */}
          {activeEditingKey && (
            <div className="p-4 bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 rounded-xl space-y-4">
              <div className="flex items-center justify-between border-b border-blue-200 dark:border-blue-800/50 pb-2">
                <span className="text-xs font-bold text-blue-900 dark:text-blue-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  Editando Tecla: {activeEditingKey.primaryLabel}
                </span>
                <button
                  onClick={() => setEditingKeyId(null)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  Concluir Edição
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Caractere Principal
                  </label>
                  <input
                    type="text"
                    value={activeOverride.primaryLabel ?? activeEditingKey.primaryLabel}
                    onChange={e => handleUpdateKeyOverride(activeEditingKey.id, { primaryLabel: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Caractere Shift (Superior)
                  </label>
                  <input
                    type="text"
                    value={activeOverride.shiftLabel ?? activeEditingKey.shiftLabel ?? ''}
                    onChange={e => handleUpdateKeyOverride(activeEditingKey.id, { shiftLabel: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Caractere AltGr (Direita)
                  </label>
                  <input
                    type="text"
                    value={activeOverride.altGrLabel ?? activeEditingKey.altGrLabel ?? ''}
                    onChange={e => handleUpdateKeyOverride(activeEditingKey.id, { altGrLabel: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md font-mono"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300">
                    <Palette className="w-3.5 h-3.5" /> Cor Fundo:
                    <input
                      type="color"
                      value={activeOverride.customBgColor || theme.bgColor}
                      onChange={e => handleUpdateKeyOverride(activeEditingKey.id, { customBgColor: e.target.value })}
                      className="w-6 h-6 rounded border cursor-pointer"
                    />
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300">
                    Cor Texto:
                    <input
                      type="color"
                      value={activeOverride.customTextColor || theme.textColor}
                      onChange={e => handleUpdateKeyOverride(activeEditingKey.id, { customTextColor: e.target.value })}
                      className="w-6 h-6 rounded border cursor-pointer"
                    />
                  </label>
                </div>

                <button
                  onClick={() => handleResetKeyOverride(activeEditingKey.id)}
                  className="text-xs text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Restaurar Original
                </button>
              </div>
            </div>
          )}

          {/* Keys Grid List */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredKeys.map(key => {
              const isSelected = customization.selectedKeyIds.includes(key.id);
              const count = customization.duplicateCounts[key.id] || 1;
              const isEditing = editingKeyId === key.id;

              return (
                <div
                  key={key.id}
                  className={`p-2.5 rounded-xl border transition-all flex flex-col justify-between gap-2 ${
                    isSelected
                      ? 'bg-white dark:bg-gray-800 border-blue-500 shadow-xs'
                      : 'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleKeySelect(key.id)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[90px]">
                        {key.id}
                      </span>
                    </label>

                    <button
                      onClick={() => setEditingKeyId(isEditing ? null : key.id)}
                      className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
                        isEditing ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'
                      }`}
                      title="Editar caractere ou cor"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Keycap Preview */}
                  <div className="flex justify-center py-1">
                    <KeyCap
                      keyData={key}
                      customization={customization}
                      theme={theme}
                      isSelected={isSelected}
                      onClick={() => handleToggleKeySelect(key.id)}
                    />
                  </div>

                  {/* Quantity Counter */}
                  {isSelected && (
                    <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded-lg">
                      <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">Cópias:</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDuplicateChange(key.id, -1)}
                          className="w-5 h-5 flex items-center justify-center text-xs font-bold bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded border border-gray-300 dark:border-gray-700 hover:bg-gray-50"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-gray-800 dark:text-gray-200 min-w-[16px] text-center">
                          {count}x
                        </span>
                        <button
                          onClick={() => handleDuplicateChange(key.id, 1)}
                          className="w-5 h-5 flex items-center justify-center text-xs font-bold bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded border border-gray-300 dark:border-gray-700 hover:bg-gray-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {customization.selectedKeyIds.length} de {allKeys.length} teclas selecionadas para impressão.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition-colors"
          >
            Aplicar e Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
