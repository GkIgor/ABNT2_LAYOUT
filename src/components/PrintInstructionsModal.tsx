import React from 'react';
import { X, Printer, Scissors, Layers, CheckCircle2, AlertCircle, FileText } from 'lucide-react';

interface PrintInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrintNow: () => void;
}

export const PrintInstructionsModal: React.FC<PrintInstructionsModalProps> = ({
  isOpen,
  onClose,
  onPrintNow,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Guia Completo para Impressão e Substituição de Teclas
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Siga os passos abaixo para obter o melhor resultado durável em seu notebook ou teclado.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-sm text-gray-700 dark:text-gray-300">
          
          {/* Step 1: Paper Choice */}
          <div className="flex gap-4 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50">
            <div className="p-2.5 bg-blue-600 text-white rounded-lg h-fit">
              <Layers className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">
                1. Qual papel utilizar?
              </h3>
              <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-300">
                Recomendamos utilizar <strong>Papel Adesivo Vinil Fosco (108g ou 130g)</strong> ou <strong>Papel Fotográfico Adesivo A4</strong>. O adesivo vinílico não rasga com facilidade e adere perfeitamente às teclas de plástico do notebook ou desktop.
              </p>
            </div>
          </div>

          {/* Step 2: Durability Trick */}
          <div className="flex gap-4 p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
            <div className="p-2.5 bg-amber-600 text-white rounded-lg h-fit">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">
                2. Dica de Ouro: Proteção contra o Suor dos Dedos
              </h3>
              <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-300">
                Após imprimir na folha A4 e <strong>ANTES DE CORTAR</strong>, cole uma camada de <strong>fita adesiva transparente larga (Durex largo) ou vinil transparente fosco</strong> por cima de toda a folha impressa. Isso cria uma barreira impermeável que impede que o atrito dos dedos apague a tinta!
              </p>
            </div>
          </div>

          {/* Step 3: Print Dialog Settings */}
          <div className="flex gap-4 p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50">
            <div className="p-2.5 bg-emerald-600 text-white rounded-lg h-fit">
              <Printer className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">
                3. Configuração Importante da Impressora
              </h3>
              <ul className="text-xs space-y-1 list-disc list-inside text-gray-600 dark:text-gray-300">
                <li><strong>Tamanho do Papel:</strong> Selecione A4 (210 x 297 mm).</li>
                <li><strong>Escala:</strong> Escolha <strong>100%</strong> ou <strong>Tamanho Real</strong> (NÃO marque &quot;Ajustar à página&quot; para não alterar o tamanho milimétrico das teclas!).</li>
                <li><strong>Qualidade de Impressão:</strong> Alta / Fotográfica.</li>
                <li><strong>Conferência:</strong> Meça a régua de 10 cm impressa no topo com uma régua física para validar o tamanho.</li>
              </ul>
            </div>
          </div>

          {/* Step 4: Cutting & Sticking */}
          <div className="flex gap-4 p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50">
            <div className="p-2.5 bg-purple-600 text-white rounded-lg h-fit">
              <Scissors className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">
                4. Recorte e Aplicação
              </h3>
              <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-300">
                Utilize uma régua metálica e um estilete amolado (ou tesoura fina) seguindo as linhas/guias de corte. Limpe a tecla danificada com um pano com umedecido em álcool isopropílico para remover óleo e sujeira antes de colar a nova etiqueta.
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            Entendi, fechar
          </button>
          
          <button
            onClick={() => {
              onClose();
              onPrintNow();
            }}
            className="px-6 py-2.5 text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Imprimir Agora em A4
          </button>
        </div>

      </div>
    </div>
  );
};
