'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProject(formData: FormData) {
    const title = formData.get('title') as string;
    const desc = formData.get('desc') as string;
    const url = formData.get('url') as string;
    const githubUrl = formData.get('githubUrl') as string;
    const image = formData.get('image') as string;
    const num = formData.get('num') as string;
    const tagsStr = formData.get('tags') as string;
    const videoUrl = formData.get('videoUrl') as string;

    const tags = tagsStr.split(',').map(tag => tag.trim()).filter(Boolean);

    await prisma.project.create({
        data: {
            title,
            desc,
            url,
            githubUrl,
            image,
            num,
            tags,
            videoUrl
        }
    });

    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath('/admin/projects');
    redirect('/admin/projects');
}

export async function updateProject(id: string, formData: FormData) {
    const title = formData.get('title') as string;
    const desc = formData.get('desc') as string;
    const url = formData.get('url') as string;
    const githubUrl = formData.get('githubUrl') as string;
    const image = formData.get('image') as string;
    const num = formData.get('num') as string;
    const tagsStr = formData.get('tags') as string;
    const videoUrl = formData.get('videoUrl') as string;

    const tags = tagsStr.split(',').map(tag => tag.trim()).filter(Boolean);

    await prisma.project.update({
        where: { id },
        data: {
            title,
            desc,
            url,
            githubUrl,
            image,
            num,
            tags,
            videoUrl
        }
    });

    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath('/admin/projects');
    redirect('/admin/projects');
}

export async function deleteProject(id: string) {
    await prisma.project.delete({
        where: { id }
    });
    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath('/admin/projects');
}
