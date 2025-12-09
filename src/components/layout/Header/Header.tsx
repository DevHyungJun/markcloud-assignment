import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useFavorites } from "@/hooks";
import { Button, Icon } from "@/components/common";
import { cn } from "@/utils";

export function Header() {
  const { count } = useFavorites();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isFavoritesPage = location.pathname === "/favorites";
  const isStatisticsPage = location.pathname === "/statistics";

  // 모바일 메뉴가 열려있을 때 body 스크롤 방지
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // 페이지 이동 시 모바일 메뉴 닫기
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-linear-to-r from-white/50 via-sky-400/60 to-white/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-900 flex items-center"
          >
            <img
              src="/public/logo/markCloudLogo.webp"
              alt="MarkCloud"
              className="w-[112px] h-[30px]"
            />
          </Link>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex items-center gap-1">
            {!isStatisticsPage && (
              <Button
                as={Link}
                to="/statistics"
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md",
                  "hover:bg-gray-50",
                  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                )}
              >
                <Icon.Statistics className="w-4 h-4" />
                통계/분석
              </Button>
            )}
            {!isFavoritesPage && (
              <Button
                as={Link}
                to="/favorites"
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md",
                  "hover:bg-gray-50",
                  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                )}
                aria-label="즐겨찾기 목록 이동"
              >
                <Icon.Favorite
                  aria-label="즐겨찾기 목록 이동"
                  className={cn(
                    "w-4 h-4 text-yellow-500",
                    count > 0 && "fill-yellow-500"
                  )}
                />
                즐겨찾기
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Button>
            )}
          </div>

          {/* 모바일 햄버거 메뉴 버튼 */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="메뉴 열기"
          >
            {isMobileMenuOpen ? (
              <Icon.Close className="w-6 h-6" />
            ) : (
              <Icon.Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 오버레이 */}
      {isMobileMenuOpen && (
        <>
          {/* 배경 오버레이 */}
          <div
            className={cn(
              "fixed inset-0 bg-black/50 z-40 md:hidden",
              "animate-[fadeIn_0.2s_ease-out]"
            )}
            onClick={toggleMobileMenu}
            aria-hidden="true"
          />

          {/* 모바일 메뉴 */}
          <div
            className={cn(
              "fixed inset-y-0 right-0 w-64 bg-white shadow-xl z-50 md:hidden",
              "transform transition-transform duration-300 ease-out",
              "translate-x-0",
              "animate-[slideInFromRight_0.3s_ease-out]"
            )}
          >
            <div className="flex flex-col h-dvh">
              {/* 메뉴 헤더 */}
              <div className="flex items-center justify-end p-2 sm:p-4">
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  aria-label="메뉴 닫기"
                >
                  <Icon.Close className="w-6 h-6" />
                </button>
              </div>

              {/* 메뉴 항목 */}
              <nav className="flex-1 overflow-y-auto p-2 sm:p-4">
                <div className="flex flex-col gap-2">
                  {!isStatisticsPage && (
                    <Link
                      to="/statistics"
                      onClick={toggleMobileMenu}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700",
                        "hover:bg-gray-100",
                        "transition-colors"
                      )}
                    >
                      <Icon.Statistics className="w-5 h-5" />
                      <span className="font-medium">통계/분석</span>
                    </Link>
                  )}
                  {!isFavoritesPage && (
                    <Link
                      to="/favorites"
                      onClick={toggleMobileMenu}
                      className={cn(
                        "relative flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700",
                        "hover:bg-gray-100",
                        "transition-colors"
                      )}
                    >
                      <Icon.Favorite
                        className={cn(
                          "w-5 h-5 text-yellow-500",
                          count > 0 && "fill-yellow-500"
                        )}
                      />
                      <span className="font-medium">즐겨찾기</span>
                      {count > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                          {count}
                        </span>
                      )}
                    </Link>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
