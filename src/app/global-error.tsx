'use client';

export const runtime = 'edge';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
          <h2>Something went wrong!</h2>
          <button 
            onClick={() => reset()}
            style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer', borderRadius: '5px', border: 'none', backgroundColor: '#0070f3', color: 'white' }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
