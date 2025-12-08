import { useState } from "react";
import { useFavorites } from "@/hooks";
import { Modal } from "@/components/common";
import { FavoritesView } from "@/components/domain";

export function Header() {
  const { count } = useFavorites();
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <>
      <header className="bg-sky-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <img
                src="/public/logo/markCloudLogo.webp"
                alt="MarkCloud"
                className="w-[112px] h-[30px]"
              />
            </h1>
            <button
              onClick={() => setShowFavorites(true)}
              className="relative px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              즐겨찾기
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <Modal
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        title="즐겨찾기"
        size="lg"
      >
        <FavoritesView />
      </Modal>
    </>
  );
}
