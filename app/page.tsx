export const dynamic = 'force-dynamic';
import { HeroSection, TechStackSection, FeaturedProjectsSection, CTASection } from '@/components/home/sections';
import { prisma } from '@/lib/prisma';
import { getRepoStats } from '@/lib/github';

export default async function Home() {
  const dbProjects = await prisma.project.findMany({
    orderBy: { num: 'asc' },
    take: 4,
  });

  const projects = await Promise.all(dbProjects.map(async (project) => {
    const stats = project.githubUrl ? await getRepoStats(project.githubUrl) : null;
    return {
      ...project,
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

