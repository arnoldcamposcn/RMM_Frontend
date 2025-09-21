import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import type { BlogLikesState } from '../types';

interface BlogLikesButtonProps {
  likesState: BlogLikesState;
  onToggleLike: () => void;
}

export const BlogLikesButton: React.FC<BlogLikesButtonProps> = ({
  likesState,
  onToggleLike
}) => {
  const { isBlogLiked, likesCount, isLikingBlog } = likesState;

  return (
    <button
      onClick={onToggleLike}
      disabled={isLikingBlog}
      className={`flex items-center space-x-2 hover:scale-110 transition ${
        isBlogLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
      } ${isLikingBlog ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isBlogLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
      <span>{isBlogLiked ? "Te gusta" : "Me gusta"}</span>
      {likesCount > 0 && (
        <span className="ml-1 font-medium text-sm">({likesCount})</span>
      )}
    </button>
  );
};
