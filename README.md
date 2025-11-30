# 🌳 SolveTree

![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Gemini](https://img.shields.io/badge/Google%20Gemini-2.5-8E75B2?style=for-the-badge&logo=google&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Decisions, Simplified.**

SolveTree is an intelligent decision-making platform powered by Google's Gemini 2.5 AI. It helps you stop overthinking by visualizing outcomes, solving binary dilemmas through interactive questioning, and generating actionable strategic plans.

---

## ✨ Key Features

### 🔴 Binary Solver Engine
Stuck in analysis paralysis? The **Binary Solver** acts as a rapid-fire consultant.
- **Interactive Q&A:** Asks specific "Yes/No" questions to drill down to the core of your problem.
- **Logic-Based:** Uses AI to navigate complex scenarios and guide you to a clear decision.
- **Gen Z Friendly:** Designed with a modern, engaging interface.

### 🌿 Visual Mapping
See the big picture with dynamic **Decision Trees**.
- **D3.js Visualization:** Automatically generates hierarchical trees representing your problem space.
- **Branch Analysis:** Explore different paths, risks, and outcomes visually.
- **Deep Dive:** Goes multiple levels deep to uncover hidden factors.

### 🚀 Strategic Planner
Turn dreams into reality with the **Launch Plan** generator.
- **Phase-by-Phase Roadmaps:** Breaks down high-level goals into chronological phases.
- **Actionable Tasks:** Generates specific tasks with descriptions and priority levels.
- **Execution Ready:** Perfect for business launches, travel planning, or personal projects.

### 🤖 AI Consultant
Need a second opinion? Chat with our **AI Consultant**.
- **Empathetic & Logical:** Provides balanced perspectives on vague or complex situations.
- **Context Aware:** Remembers the conversation flow to offer tailored advice.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Visualization:** D3.js
- **AI Model:** Google Gemini 2.5 Flash (via `@google/genai` SDK)

---

## 🚀 Getting Started

Follow these steps to get SolveTree running locally.

### Prerequisites

- Node.js (v18 or higher)
- A Google Gemini API Key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ReachOutToHardik/solvetree.git
   cd solvetree
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   Navigate to `http://localhost:3000` to start solving!

---

## 📖 Usage

1. **Home Dashboard:** Choose your tool—Solver, Planner, or Chat.
2. **Solve:** Enter a dilemma (e.g., "Should I quit my job?"). The AI will generate a decision tree or start a binary Q&A session.
3. **Plan:** Enter a goal (e.g., "Launch a coffee shop"). The AI will generate a detailed project plan.
4. **Chat:** Use the chat interface for open-ended advice.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
