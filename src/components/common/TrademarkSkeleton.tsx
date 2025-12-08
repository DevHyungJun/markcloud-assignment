export function TrademarkSkeleton() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {/* 상표명 스켈레톤 - text-lg font-semibold */}
            <div className="h-7 bg-gray-200 rounded w-32 relative overflow-hidden">
              <div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent"
                style={{
                  animation: "shimmer 2s infinite",
                }}
              ></div>
            </div>
            {/* 영문명 스켈레톤 - text-sm text-gray-500 */}
            <div className="h-5 bg-gray-200 rounded w-28 relative overflow-hidden">
              <div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent"
                style={{
                  animation: "shimmer 2s infinite 0.1s",
                }}
              ></div>
            </div>
            {/* 상태 배지 스켈레톤 - px-2 py-1 rounded-full text-xs */}
            <div className="h-6 bg-gray-200 rounded-full w-16 relative overflow-hidden">
              <div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent"
                style={{
                  animation: "shimmer 2s infinite 0.2s",
                }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {/* 출원번호 스켈레톤 */}
            <div className="relative overflow-hidden">
              <div className="h-5 bg-gray-200 rounded w-full">
                <div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent"
                  style={{
                    animation: "shimmer 2s infinite 0.3s",
                  }}
                ></div>
              </div>
            </div>
            {/* 출원일 스켈레톤 */}
            <div className="relative overflow-hidden">
              <div className="h-5 bg-gray-200 rounded w-full">
                <div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent"
                  style={{
                    animation: "shimmer 2s infinite 0.4s",
                  }}
                ></div>
              </div>
            </div>
            {/* 공고번호 스켈레톤 */}
            <div className="relative overflow-hidden">
              <div className="h-5 bg-gray-200 rounded w-full">
                <div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent"
                  style={{
                    animation: "shimmer 2s infinite 0.5s",
                  }}
                ></div>
              </div>
            </div>
            {/* 등록번호 스켈레톤 */}
            <div className="relative overflow-hidden">
              <div className="h-5 bg-gray-200 rounded w-full">
                <div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent"
                  style={{
                    animation: "shimmer 2s infinite 0.6s",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* 즐겨찾기 버튼 스켈레톤 */}
        <div className="ml-4 shrink-0 relative overflow-hidden">
          <div className="w-6 h-6 bg-gray-200 rounded">
            <div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent"
              style={{
                animation: "shimmer 2s infinite 0.7s",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TrademarkSkeletonList({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <TrademarkSkeleton key={index} />
      ))}
    </div>
  );
}
