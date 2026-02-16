import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function JsonViewer({ data }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!data) return null;

  return (
    <div className="w-full glass-card border border-primary/30 p-6 animate-scaleIn">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Generated Catalog JSON
        </h3>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-sm font-medium btn-ripple"
        >
          {copied ? (
            <>
              <Check size={16} /> Copied
            </>
          ) : (
            <>
              <Copy size={16} /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="bg-card border border-border p-4 rounded-xl overflow-x-auto text-sm font-mono max-h-96 overflow-y-auto text-foreground">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
