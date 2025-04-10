# Business Advisor AI

An AI-powered chatbot that provides guidance to small business owners, helping them frame queries around problem identification, solution alternatives, evaluation frameworks, and implementation suggestions.

## Features

- **Problem Identification**: Helps identify and articulate business challenges
- **Solution Alternatives**: Suggests multiple viable options based on best practices
- **Evaluation Frameworks**: Provides frameworks to assess options
- **Implementation Guidance**: Offers practical steps for executing chosen solutions
- **Lead Capture**: Collects user information for follow-up advice and improvement

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- OpenAI API Key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/business-advisor-ai.git
cd business-advisor-ai
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Add your OpenAI API key to `.env.local`:
```
OPENAI_API_KEY=your_openai_api_key_here
```

5. Start the development server:
```bash
bun run dev
# or
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Visit the homepage to interact with the Business Advisor AI chatbot.
2. Ask business-related questions to get personalized advice.
3. The chatbot can help with various business challenges:
   - Customer retention strategies
   - Pricing models
   - Marketing on a limited budget
   - Supplier evaluation
   - Business growth planning
   - And much more!

## Deployment

This project can be deployed on any platform that supports Next.js applications, such as Vercel, Netlify, or a custom server.

```bash
# Build the project
bun run build
# or
npm run build

# Start the production server
bun start
# or
npm start
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- OpenAI for the GPT API
- Next.js team for the framework
- Shadcn UI for the component library
