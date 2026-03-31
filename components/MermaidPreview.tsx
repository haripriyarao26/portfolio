'use client';

import { useEffect, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidPreviewProps {
  title?: string;
  chart: string;
}

mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'strict',
  theme: 'base',
  themeVariables: {
    primaryColor: '#f5f5f3',
    primaryTextColor: '#111827',
    primaryBorderColor: '#1a1a1a',
    lineColor: '#1a1a1a',
    secondaryColor: '#fcfcf9',
    tertiaryColor: '#ffffff',
    fontFamily: 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace',
  },
});

export default function MermaidPreview({ title = 'Architecture preview', chart }: MermaidPreviewProps) {
  const [svg, setSvg] = useState<string>('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const renderChart = async () => {
      try {
        const id = `mermaid-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        const { svg: rendered } = await mermaid.render(id, chart);
        if (!cancelled) {
          setSvg(rendered);
          setHasError(false);
        }
      } catch {
        if (!cancelled) setHasError(true);
      }
    };
    renderChart();
    return () => {
      cancelled = true;
    };
  }, [chart]);

  return (
    <div className="glass-card border border-[#1a1a1a]/20 rounded-xl p-3 sm:p-4 mt-6 w-full min-w-0">
      <div className="mono-accent text-[10px] sm:text-xs uppercase tracking-[0.14em] text-[#525252] mb-2 sm:mb-3">
        {title}
      </div>
      {hasError ? (
        <p className="text-sm text-[#525252]">Unable to render Mermaid preview.</p>
      ) : (
        <div
          className="w-full min-h-[100px] overflow-x-auto overflow-y-hidden touch-pan-x mermaid-container -mx-1 px-1 sm:mx-0 sm:px-0"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
    </div>
  );
}
