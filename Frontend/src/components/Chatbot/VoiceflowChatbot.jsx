// frontend/src/components/Chatbot/VoiceflowChatbot.jsx
import { useEffect, useRef } from "react";

const VoiceflowChatbot = () => {
  const scriptLoadedRef = useRef(false);

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
    script.type = "text/javascript";

    script.onload = () => {
      loadChatbot();
    };

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
`;

      document.body.appendChild(script);

      // Clean up the script when component unmounts
      return () => {
        try {
          document.body.removeChild(script);
        } catch (e) {
          // Script may already be removed
        }
      };
    } else {
      scriptLoadedRef.current = true;
      // If already loaded, initialize the chat
      if (window.voiceflow?.chat) {
       const isDark = document.documentElement.classList.contains("dark"); 

  window.voiceflow.chat.load({
    verify: { projectID: "695f3fcb847e07b5c98aefe7" },
    url: "https://general-runtime.voiceflow.com",
    versionID: "production",
    voice: {
      url: "https://runtime-api.voiceflow.com",
    },

    styling: {
      theme: isDark ? 'dark' : 'light'
    }
  });
}
    }
  }, []);

  return null; // Voiceflow handles its own UI
};


export default VoiceflowChatbot;
