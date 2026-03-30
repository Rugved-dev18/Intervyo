// frontend/src/components/Chatbot/VoiceflowChatbot.jsx
import { useEffect } from "react";

const VoiceflowChatbot = () => {
  useEffect(() => {
    const loadChatbot = () => {
      const isDark = document.documentElement.classList.contains("dark");

      if (window.voiceflow?.chat) {
        window.voiceflow.chat.load({
          verify: { projectID: "695f3fcb847e07b5c98aefe7" },
          url: "https://general-runtime.voiceflow.com",
          versionID: "production",
          voice: {
            url: "https://runtime-api.voiceflow.com",
          },
          styling: {
            theme: isDark ? "dark" : "light",
          },
        });
      }
    };

    if (!window.voiceflow) {
      const script = document.createElement("script");
      script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
      script.onload = loadChatbot;
      document.body.appendChild(script);
    } else {
      loadChatbot();
    }

    const observer = new MutationObserver(() => {
      loadChatbot();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return null;
};

export default VoiceflowChatbot;
   
