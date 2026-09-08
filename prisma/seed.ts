import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding projects...');
    
    // Clear existing
    await prisma.project.deleteMany();

      const projects = [
        {
          title: "AI Builder",
          desc: "AI-powered landing page builder SaaS. Generates production-ready pages in seconds.",
          tags: ["Next.js", "NestJS", "Groq AI"],
          url: "https://aibuilder.adnanxdev.site/",
          image: "/project-aibuilder.png",
          num: "01",
          githubUrl: "https://github.com/webbyadnan/aibuilder",
          category: "AI SaaS",
        },
        {
          title: "Resume AI",
          desc: "Intelligent resume builder that crafts ATS-optimized resumes tailored to job descriptions.",
          tags: ["Next.js", "Gemini AI", "Firebase"],
          url: "https://resumeai.adnanxdev.site/",
          image: "/project-resumeai.png",
          num: "02",
          githubUrl: "https://github.com/webbyadnan/resumeai",
          category: "AI Tool",
        },
        {
          title: "xGPT",
          desc: "Multi-model AI chat app supporting GPT-4, Claude, Gemini, and open-source models.",
          tags: ["Next.js", "Groq", "DeepSeek"],
          url: "https://xgpt.adnanxdev.site/",
          image: "/project-xgpt.png",
          num: "03",
          githubUrl: "https://github.com/webbyadnan/xgpt",
          category: "AI Tool",
        },
        {
          title: "XFER",
          desc: "High-speed P2P file-sharing web app for local networks with real-time peer discovery and secure transfers.",
          tags: ["React", "Vite", "PeerJS", "MQTT"],
          url: "https://xfer.adnanxdev.site/",
          image: "/project-xfer.png",
          num: "04",
          githubUrl: "https://github.com/webbyadnan/xfer",
          category: "Web App",
        },
        {
          title: "GFix Digital Internal Portal",
          desc: "Full-stack internal team management system built for GFix Digital. Handles intern onboarding, task tracking, team management, and department operations across technical, creative, training, and management teams.",
          tags: ["Next.js", "Node.js", "PostgreSQL"],
          url: "https://portal.gfixdigital.com/",
          image: "",
          num: "05",
          githubUrl: "",
          category: "Agency Project",
        },
        {
          title: "Swat Tourism Platform",
          desc: "A marketplace platform connecting tourists with local service providers in the Swat Valley. Full system design for guides, hotels, transport, and experiences.",
          tags: ["Next.js", "Node.js", "PostgreSQL", "Supabase"],
          url: "",
          image: "",
          num: "06",
          githubUrl: "",
          category: "In Development",
        },
        {
          title: "Darzi Pro",
          desc: "Multi-tenant SaaS platform for tailor shop management built with Flutter. Supports multiple shop owners, orders, measurements, and billing.",
          tags: ["Flutter", "Dart", "Firebase", "Supabase"],
          url: "",
          image: "",
          num: "07",
          githubUrl: "",
          category: "In Development",
        },
        {
          title: "Restaurant OS",
          desc: "Restaurant management SaaS for a GFix Digital agency client. Covers order management, kitchen flow, and billing.",
          tags: ["React", "Node.js", "PostgreSQL"],
          url: "",
          image: "",
          num: "08",
          githubUrl: "",
          category: "In Development",
        },
        {
          title: "MockAPI Builder",
          desc: "Collaborative platform for creating and mocking APIs with real-time team collaboration features.",
          tags: ["Next.js", "TypeScript", "Prisma", "Tailwind"],
          url: "https://mockapi.adnanxdev.site/",
          image: "/project-mockapi.png",
          num: "09",
          githubUrl: "https://github.com/webbyadnan/mockapi",
          category: "Developer Tool",
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
