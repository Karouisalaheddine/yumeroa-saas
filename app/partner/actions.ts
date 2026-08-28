'use server';

import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import crypto from 'crypto';
import { revalidatePath } from 'next/cache';

export async function generateAffiliateLink(articleId: string, articleSlug: string, partnerId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Not authenticated' };
    }

    // Check if link already exists
    let trackingLink = await prisma.trackingLink.findUnique({
      where: {
        partnerId_articleId: {
          partnerId,
          articleId,
        }
      }
    });

    if (!trackingLink) {
      // Generate a short code (6 chars)
      const shortCode = crypto.randomBytes(3).toString('hex');
      
      trackingLink = await prisma.trackingLink.create({
        data: {
          partnerId,
          articleId,
          shortCode
        }
      });
    }

    revalidatePath('/partner/links');
    
    // Return relative path so client can prepend baseUrl
    return { 
      success: true, 
      shortCode: trackingLink.shortCode,
      urlPath: `/go/${trackingLink.shortCode}`
    };
  } catch (error: any) {
    console.error('Failed to generate affiliate link:', error);
    return { error: error.message || 'Error generating link' };
  }
}
