'use client';

export function AnimatedGradient() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20 blob-animate"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.4) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute top-1/3 -right-40 w-80 h-80 rounded-full opacity-15 blob-animate-delay-1"
        style={{
          background: 'radial-gradient(circle, rgba(251,146,60,0.3) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="absolute -bottom-40 left-1/3 w-72 h-72 rounded-full opacity-10 blob-animate-delay-2"
        style={{
          background: 'radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
}
