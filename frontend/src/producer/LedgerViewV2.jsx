import React, { useState } from 'react';
import { Copy, ExternalLink } from 'lucide-react';
import { ledgerData } from './dummyData';
import { formatDate } from '../../utils/helpers';
import { useToast } from '../../context/ToastContext';

const LedgerView = () => {
  const { success } = useToast();
  const [ledger] = useState(ledgerData);
  const [expanded, setExpanded] = useState(null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    success('Copied to clipboard!');
  };

  const shortHash = (hash) => hash.substring(0, 10) + '...' + hash.substring(hash.length - 8);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Blockchain Ledger</h1>

        <div className="space-y-4">
          {ledger.map(entry => (
            <div key={entry.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div
                onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
                className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 cursor-pointer hover:from-indigo-100 hover:to-blue-100 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{entry.actionLabel}</p>
                    <p className="text-sm text-gray-600">Block #{entry.block}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600">{formatDate(entry.timestamp)}</p>
                    <p className="font-mono text-sm text-blue-600">{shortHash(entry.hash)}</p>
                  </div>
                </div>
              </div>

              {expanded === entry.id && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Actor</p>
                      <p className="text-gray-900">{entry.actor}</p>
                      <p className="font-mono text-xs text-gray-600 break-all mt-2">{entry.actorAddress}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Transaction Hash</p>
                      <div className="flex items-center gap-2">
                        <p className="font-mono text-sm text-gray-900 break-all">{entry.hash}</p>
                        <button
                          onClick={() => copyToClipboard(entry.hash)}
                          className="p-1 hover:bg-gray-200 rounded transition"
                        >
                          <Copy className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {entry.data && (
                    <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                      <p className="text-xs text-gray-600 uppercase font-semibold mb-2">Data</p>
                      <pre className="text-xs text-gray-900 overflow-x-auto">
                        {JSON.stringify(entry.data, null, 2)}
                      </pre>
                    </div>
                  )}

                  <a
                    href={`https://etherscan.io/tx/${entry.hash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    View on Etherscan <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LedgerView;
