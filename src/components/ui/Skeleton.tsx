interface SkeletonProps {
  className?: string;
  variant?: 'card' | 'text' | 'image' | 'circle';
}

function PulseBlock({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-alloy-200/20 ${className}`}
    />
  );
}

export default function Skeleton({ className = '', variant = 'text' }: SkeletonProps) {
  if (variant === 'card') {
    return (
      <div className={`overflow-hidden rounded-xl border border-alloy-200/10 bg-graphene-900 p-4 ${className}`}>
        <PulseBlock className="mb-3 h-40 w-full rounded-lg" />
        <PulseBlock className="mb-2 h-4 w-3/4 rounded" />
        <PulseBlock className="mb-2 h-3 w-1/2 rounded" />
        <PulseBlock className="h-3 w-5/6 rounded" />
      </div>
    );
  }

  if (variant === 'image') {
    return <PulseBlock className={`h-full w-full rounded-lg ${className}`} />;
  }

  if (variant === 'circle') {
    return <PulseBlock className={`rounded-full ${className}`} />;
  }

  // variant === 'text'
  return <PulseBlock className={`h-4 w-full rounded ${className}`} />;
}
