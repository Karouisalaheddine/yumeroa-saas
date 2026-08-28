'use server';

import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export interface ArticleInput {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  seoMeta?: any;
}

// Generate URL slug from title
export async function generateSlug(title: string): Promise<string> {
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return baseSlug || 'article-' + Date.now();
}

export async function createArticle(formData: FormData) {
  const title = formData.get('title') as string;
  let slug = (formData.get('slug') as string) || (await generateSlug(title));
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const coverImage = formData.get('coverImage') as string;
  const status = ((formData.get('status') as string) || 'PUBLISHED').toUpperCase() as
    | 'DRAFT'
    | 'PUBLISHED'
    | 'ARCHIVED';

  if (!title || !title.trim()) {
    throw new Error('Title is required');
  }

  try {
    // Attempt Prisma insertion first
    await prisma.article.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        status: status as any,
      },
    });
  } catch (prismaErr) {
    console.warn('Prisma create failed, falling back to Supabase client:', prismaErr);
    // Fallback to Supabase JS client
    const { error } = await supabase.from('articles').insert([
      {
        title,
        slug,
        excerpt,
        content,
        cover_image: coverImage,
        status: status.toLowerCase(),
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Supabase fallback error:', error);
      throw new Error(`Failed to create article: ${error.message}`);
    }
  }

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function updateArticle(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const coverImage = formData.get('coverImage') as string;
  const status = ((formData.get('status') as string) || 'PUBLISHED').toUpperCase() as
    | 'DRAFT'
    | 'PUBLISHED'
    | 'ARCHIVED';

  try {
    await prisma.article.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        status: status as any,
      },
    });
  } catch (prismaErr) {
    console.warn('Prisma update failed, falling back to Supabase client:', prismaErr);
    const { error } = await supabase
      .from('articles')
      .update({
        title,
        slug,
        excerpt,
        content,
        cover_image: coverImage,
        status: status.toLowerCase(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to update article: ${error.message}`);
    }
  }

  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath(`/articles/${slug}`);
  redirect('/admin');
}

export async function deleteArticle(id: string) {
  try {
    await prisma.article.delete({
      where: { id },
    });
  } catch (prismaErr) {
    console.warn('Prisma delete failed, falling back to Supabase client:', prismaErr);
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) {
      console.error('Supabase delete error:', error);
      throw new Error(`Failed to delete article: ${error.message}`);
    }
  }

  revalidatePath('/');
  revalidatePath('/admin');
}
