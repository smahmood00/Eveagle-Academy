const courseData = {
  courseId: "S07",
  price: 2000,
  ageGroup: "10-14",
  courseName: "Create Your Own AI Voice Assistant with Azure OpenAI and MIT App Inventor",
  toolUsed: "Azure OpenAI, MIT App Inventor",
  totalClasses: 5,
  totalHours: 7.5,
  title: "Build Your Own AI Voice Assistant Using Azure OpenAI and MIT App Inventor",
  overviewDescription: "Learn to build an AI voice assistant app by integrating Azure OpenAI's ChatGPT with MIT App Inventor's speech recognition and text-to-speech features. This course covers programming fundamentals, voice input, AI processing, and voice output for a hands-free chatbot experience using the latest AI technologies.",
  cardImage: "/coursecard-imgs/mit app inventor.png",
  overviewMedia: {
    type: "video",
    url: "/course-videos/ai-voice-assistant.mp4"
  },
  lessons: [
    {
      lessonNumber: 1,
      title: "Introduction to AI Voice Assistants, Programming Fundamentals, and Azure OpenAI",
      description: "Explore AI voice assistant concepts, basic programming principles, Azure OpenAI capabilities, and set up your Azure OpenAI API account.",
      hours: 1.5,
      outcomes: [
        "Understand AI voice assistant basics and real-world applications",
        "Get familiar with Azure OpenAI and ChatGPT models",
        "Set up Azure OpenAI API access for your app"
      ]
    },
    {
      lessonNumber: 2,
      title: "Designing Voice Interfaces with MIT App Inventor",
      description: "Create voice input and output interfaces using MIT App Inventor’s SpeechRecognizer and TextToSpeech components, focusing on user-friendly design.",
      hours: 1.5,
      outcomes: [
        "Design simple and intuitive voice-enabled UI",
        "Learn core programming concepts relevant to app development",
        "Use SpeechRecognizer to capture voice input",
        "Implement TextToSpeech for AI-generated voice responses"
      ]
    },
    {
      lessonNumber: 3,
      title: "Integrating Azure OpenAI API with Voice Input",
      description: "Connect voice input from MIT App Inventor to Azure OpenAI ChatGPT API and handle AI-generated responses effectively.",
      hours: 1.5,
      outcomes: [
        "Send voice-to-text input to Azure OpenAI API",
        "Receive and display AI responses in the app",
      ]
    },
    {
      lessonNumber: 4,
      title: "Enhancing Voice Assistant Interaction and Latest AI Trends",
      description: "Improve user experience by managing conversation flow, optimizing voice output, and learning about current AI trends like natural language understanding and voice synthesis.",
      hours: 1.5,
      outcomes: [
        "Maintain simple conversation context for natural dialogue",
        "Understand emerging AI technologies in voice assistants",
        "Validate and sanitize user inputs for better interaction"
      ]
    },
    {
      lessonNumber: 5,
      title: "Testing, Debugging, and Deploying Your AI Voice Assistant",
      description: "Test your app on devices, debug common issues",
      hours: 1.5,
      outcomes: [
        "Test app functionality on emulator and real devices",
        "Debug speech recognition and API integration issues",
        "Deploy and share your AI voice assistant app"
      ]
    }
  ],
  keyLearningOutcomes: [
    "Understand programming fundamentals essential for AI app development",
    "Build AI voice assistants with speech input and output using latest AI technologies",
    "Design user-friendly voice interfaces in MIT App Inventor",
    "Stay updated with current trends in AI voice assistant technology",
    "Develop problem-solving and computational thinking skills",
    "Test, debug, and deploy functional AI voice assistant apps"
  ],
  isPublished: true,
  slug: "creating-ai-voice-assistant-azure-openai-mit-app-inventor",
  createdAt: new Date(),
  updatedAt: new Date()
};

export default courseData;