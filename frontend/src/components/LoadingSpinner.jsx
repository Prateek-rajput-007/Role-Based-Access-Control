import { cn } from '@/lib/utils';

function LoadingSpinner({ className }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-2 text-gray-600">Loading...</span>
    </div>
  );
}

export default LoadingSpinner;