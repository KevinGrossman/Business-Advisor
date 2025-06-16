# Business Advisor AI - Advanced Gemini-Powered Assistant

!https://business-advisor-grc.vercel.app/

## 🌟 Overview

Business Advisor AI is a cutting-edge application that leverages Google's Gemini AI models to provide intelligent business consulting. This powerful tool offers:

- **Multi-model support** (Flash, Pro, Vision, and Image Generation models)
- **Multimodal capabilities** (text, image analysis, and generation)
- **Customizable response styles** (brief, detailed, advanced)
- **File upload support** (images, PDFs, documents)
- **Modern, responsive UI** with dark/light mode

## 🚀 Features

### Core Capabilities
- **Business Problem Solving**: Strategy, marketing, operations, and more
- **Document Analysis**: Extract insights from uploaded files
- **Image Generation**: Create visual assets for your business
- **Multi-model Selection**: Choose the perfect AI for each task

### Technical Highlights
- Next.js 14 App Router
- TypeScript
- ShadCN UI components
- Gemini API integration
- Edge runtime for fast responses
- Responsive design

## 🛠 Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- Google Gemini API key

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rauoof814/Business-Advisor.git
   cd Business-Advisor
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_api_key_here
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in your browser**
   ```
   http://localhost:3000
   ```

## 🧠 Available Models

| Model Name | Type | Capabilities | Best For |
|------------|------|--------------|----------|
| Gemini 1.5 Flash | Text | Fast responses | Quick queries |
| Gemini 2.0 Flash | Text | Video analysis | Multimedia content |
| Gemini 1.5 Pro | Text | Advanced reasoning | Complex problems |
| Gemini 2.5 Pro | Multimodal | Image generation | Creative tasks |
| Gemini Pro Vision | Vision | Image analysis | Document processing |
| Imagen 3.0 | Image | Image generation | Visual assets |

## 📁 Project Structure

```
business-advisor/
├── app/
│   ├── api/chat/route.ts       # Gemini API endpoint
│   └── page.tsx                # Main page
├── components/
│   ├── chat-ui/                # Chat interface components
│   └── lead-capture/           # Lead form components
├── public/                     # Static assets
├── lib/                        # Utility functions
└── styles/                     # Global styles
```

## 💡 Usage Guide

### Basic Usage
1. Select a model from the dropdown
2. Type your business question
3. Attach files if needed (for vision models)
4. Get expert advice instantly

### Advanced Features
- **Image Generation**: Use "Imagen 3.0" model with image prompts
- **Document Analysis**: Upload PDFs to "Gemini Pro Vision"
- **Response Styles**: Choose between brief, detailed, or advanced responses

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Create a new project in Vercel
3. Add your `GEMINI_API_KEY` as an environment variable
4. Deploy!

### Other Platforms
Ensure you:
- Set up proper environment variables
- Configure Edge functions if supported
- Set proper CORS headers

## 📜 License

MIT License - See [LICENSE](./LICENSE) for details.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For support or questions:
- Email: [your-email@example.com](mailto:your-email@example.com)
- GitHub: [@Rauoof814](https://github.com/Rauoof814)

---

**Happy Business Advising!** 🚀