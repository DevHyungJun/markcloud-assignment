const StatisticsSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="w-full h-[400px] bg-gray-200 rounded-lg"
        ></div>
      ))}
    </div>
  );
};

export default StatisticsSkeleton;
