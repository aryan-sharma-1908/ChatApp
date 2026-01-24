import React from "react";
import { MessageCircle, Users } from "lucide-react";

const ConversationSkeleton = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center px-6">
      <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-10 max-w-md">
        
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center">
            <MessageCircle size={32} className="text-purple-600" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-2">
          No conversation selected
        </h2>

        <p className="text-gray-500 mb-6">
          Pick a friend from the left to start chatting or continue a
          conversation.
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <Users size={16} />
          <span>Your chats will appear here</span>
        </div>
      </div>
    </div>
  );
};

export default ConversationSkeleton;
