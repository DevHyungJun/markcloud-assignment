import { Link, useLocation } from "react-router-dom";
import { useFavorites } from "@/hooks";
import { Button } from "@/components/common";

export function Header() {
  const { count } = useFavorites();
  const location = useLocation();
  const isFavoritesPage = location.pathname === "/favorites";

  return (
    <header className="bg-sky-200 shadow-sm sticky top-0 z-50">
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
          {!isFavoritesPage && (
            <Link to="/favorites">
              <Button className="relative px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                즐겨찾기
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
