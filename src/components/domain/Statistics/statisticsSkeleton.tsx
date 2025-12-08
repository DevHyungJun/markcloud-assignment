const StatisticsSkeleton = () => {
  return (
    <div className="space-y-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="relative w-full h-[400px] bg-gray-200 rounded-lg overflow-hidden"
        >
          {/* Shimmer 애니메이션 */}
          <div
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent animate-[shimmer_2s_infinite]"
            style={{
              animationDelay: `${index * 0.2}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default StatisticsSkeleton;
