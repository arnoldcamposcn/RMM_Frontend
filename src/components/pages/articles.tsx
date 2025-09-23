// pages/ArticlesPage.tsx
import FeaturedArticlesContainer from "../../store/features/articles/FeaturedArticlesContainer";
import Title from "../atoms/Title";

export default function ArticlesPage() {

  return (
    <>
      <div className="pb-8">
        <Title className="text-2xl font-bold text-gray-800 pb-4">Artículos</Title>
        <div className="w-12 h-0.5 bg-gradient-to-r from-[#4AB39A] to-[#3FA08A] rounded-full mx-0"></div>
      </div>
      <FeaturedArticlesContainer />
    </>
  );
}
