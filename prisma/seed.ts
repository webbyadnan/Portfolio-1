const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding projects...');
    
    // Clear existing
    await prisma.project.deleteMany();

    const projects = [
        {
          title: "AI Builder",
          desc: "AI-powered landing page builder SaaS. Generates stunning, production-ready pages in seconds.",
          tags: ["Next.js", "NestJS", "Groq AI"],
          url: "https://aibuilder.adnanxdev.site/",
          image: "/project-aibuilder.png",
          num: "01",
          githubUrl: "https://github.com/webbyadnan/aibuilder"
        },
        {
          title: "Resume AI",
          desc: "Intelligent resume builder that crafts compelling, ATS-optimized resumes tailored to job descriptions.",
          tags: ["Next.js", "Gemini AI", "Firebase"],
          url: "https://resumeai.adnanxdev.site/",
          image: "/project-resumeai.png",
          num: "02",
          githubUrl: "https://github.com/webbyadnan/resumeai"
        },
        {
          title: "xGPT",
          desc: "Multi-model AI chat app supporting GPT-4, Claude, Gemini, and open-source models.",
          tags: ["Next.js", "Groq", "DeepSeek"],
          url: "https://xgpt.adnanxdev.site/",
          image: "/project-xgpt.png",
          num: "03",
          githubUrl: "https://github.com/webbyadnan/xgpt"
        },
        {
          title: "XFER",
          desc: "High-speed P2P file-sharing web app for local networks. Features real-time peer discovery and secure transfers.",
          tags: ["React", "Vite", "PeerJS", "MQTT"],
          url: "https://xfer.adnanxdev.site/",
          image: "/project-xfer.png",
          num: "04",
          githubUrl: "https://github.com/webbyadnan/xfer"
        },
        {
          title: "MockAPI Builder",
          desc: "Collaborative platform for creating and mocking APIs with real-time team collaboration features.",
          tags: ["Next.js", "TypeScript", "Prisma", "Tailwind"],
          url: "https://mockapi.adnanxdev.site/",
          image: "/project-mockapi.png",
          num: "05",
          githubUrl: "https://github.com/webbyadnan/mockapi"
        },
      ];

      for (const p of projects) {
        await prisma.project.create({
            data: p
        });
      }

      console.log('Seeding complete!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  });
