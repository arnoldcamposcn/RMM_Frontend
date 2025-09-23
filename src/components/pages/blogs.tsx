// pages/EditionsPage.tsx
import FeaturedBlogContainer from "../../store/features/blog/FeaturedBlogContainer";
import Title from "../atoms/Title";

export default function BlogsPage() {
        return (
            <>
            <div className="pb-8">
            <Title className="text-2xl font-bold text-gray-800 pb-4">Blogs</Title>
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#4AB39A] to-[#3FA08A] rounded-full mx-0"></div>
            </div>
                <FeaturedBlogContainer />
            </>
        );
}
