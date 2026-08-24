export function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2 2h40M2 2v40"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.9"
      />
      <path
        d="M8 8h26M8 8v26"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.6"
      />
      <path
        d="M2 56c22 0 34-12 34-34"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.5"
      />
      <path
        d="M36 22c0-6 6-10 12-8-4 2-6 5-6 9 5-2 9 0 10 5-4-3-8-2-11 2-1-5-3-7-5-8Z"
        fill="currentColor"
        opacity="0.65"
      />
      <circle cx="46" cy="46" r="2" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export function Mandala({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 16 });
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle
        cx="100"
        cy="100"
        r="94"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.5"
      />
      <circle
        cx="100"
        cy="100"
        r="72"
        stroke="currentColor"
        strokeWidth="0.4"
        opacity="0.4"
      />
      <circle
        cx="100"
        cy="100"
        r="34"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.7"
      />
      <circle
        cx="100"
        cy="100"
        r="10"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.8"
      />
      {petals.map((_, i) => (
        <g key={i} transform={`rotate(${(360 / petals.length) * i} 100 100)`}>
          <path
            d="M100 30c8 12 8 24 0 36-8-12-8-24 0-36Z"
            fill="currentColor"
            opacity="0.28"
          />
          <path
            d="M100 12v10"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.6"
          />
          <circle cx="100" cy="72" r="1.4" fill="currentColor" opacity="0.7" />
        </g>
      ))}
    </svg>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="gold-rule w-16 sm:w-28" />
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-gold"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6L12 2Z"
          fill="currentColor"
          opacity="0.85"
        />
      </svg>
      <span className="gold-rule w-16 sm:w-28" />
    </div>
  );
}
