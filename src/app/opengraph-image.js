import { ImageResponse } from 'next/og';

export const alt = 'bestattungs.at - Bestattungsunternehmen in Oesterreich finden';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0e17 0%, #151d30 55%, #1a2236 100%)',
          color: '#f1f5f9',
          padding: 72,
        }}
      >
        <div style={{ color: '#d4a853', fontSize: 28, fontWeight: 700, marginBottom: 28 }}>
          bestattungs.at
        </div>
        <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, maxWidth: 940 }}>
          Bestattungsunternehmen in Oesterreich finden
        </div>
        <div style={{ color: '#94a3b8', fontSize: 30, marginTop: 32, maxWidth: 820 }}>
          Verzeichnis, Ratgeber und regionale Bestatter-Suche
        </div>
      </div>
    ),
    size
  );
}
