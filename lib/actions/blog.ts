'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createBlogPost(formData: FormData) {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const published = formData.get('published') === 'on';

    await prisma.blogPost.create({
        data: {
            title,
            slug,
            excerpt,
            content,
            published
        }
    });

    revalidatePath('/blog');
    revalidatePath('/admin/blog');
    redirect('/admin/blog');
}

export async function updateBlogPost(id: string, formData: FormData) {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const published = formData.get('published') === 'on';

    await prisma.blogPost.update({
        where: { id },
        data: {
            title,
            slug,
            excerpt,
            content,
            published
        }
    });

    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    revalidatePath('/admin/blog');
    redirect('/admin/blog');
}

export async function deleteBlogPost(id: string) {
    await prisma.blogPost.delete({
        where: { id }
    });
    revalidatePath('/blog');
    revalidatePath('/admin/blog');
}
