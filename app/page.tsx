export const dynamic = 'force-dynamic';
import { HeroSection, TechStackSection, FeaturedProjectsSection, CTASection } from '@/components/home/sections';
import { prisma } from '@/lib/prisma';
import { getRepoStats } from '@/lib/github';
import { portfolioProjects } from '@/lib/portfolio';

export default async function Home() {
  let dbProjects: Awaited<ReturnType<typeof prisma.project.findMany>> = [];

  if (process.env.NODE_ENV !== 'development') {
    try {
      dbProjects = await prisma.project.findMany({
        orderBy: { num: 'asc' },
      });
    } catch {
      dbProjects = [];
    }
  }

  const dbByTitle = new Map(dbProjects.map((project) => [project.title, project]));
  const extraProjects = dbProjects.filter(
    (project) => !portfolioProjects.some((updatedProject) => updatedProject.title === project.title)
  );
  const featuredProjects = [...portfolioProjects, ...extraProjects].slice(0, 4);

  const projects = await Promise.all(featuredProjects.map(async (project) => {
    const dbProject = dbByTitle.get(project.title);
    const githubUrl = "githubUrl" in project ? project.githubUrl : dbProject?.githubUrl;
    const videoUrl = "videoUrl" in project ? project.videoUrl : dbProject?.videoUrl;
    const stats = githubUrl ? await getRepoStats(githubUrl) : null;
    return {
      ...project,
      githubUrl,
      videoUrl,
      githubStats: stats
    };
  }));

  return (
    <>
      <HeroSection />
      <TechStackSection />
      <FeaturedProjectsSection projects={projects} />
      <CTASection />
    </>
  );
}
