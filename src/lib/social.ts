/** Official Gahitwen company social profiles (used in footer, contact, JSON-LD). */
export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/gahitwen/',
  instagram: 'https://www.instagram.com/gahitwen/',
  x: 'https://x.com/gahitwen',
} as const;

export const SOCIAL_SAME_AS: string[] = Object.values(SOCIAL_LINKS);
