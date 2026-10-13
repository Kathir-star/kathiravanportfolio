/**
 * Data-Driven Certificate System
 * Source of truth: src/data/certificates.json
 * To add/edit certificates, modify certificates.json directly.
 */

import rawCertificates from './certificates.json';

export type CertificateCategory =
  | 'ACHIEVEMENTS'
  | 'INTERNSHIPS'
  | 'HACKATHONS'
  | 'TECHNICAL'
  | 'COURSES'
  | 'WORKSHOPS'
  | 'AWARDS'
  | 'LEADERSHIP';

export interface CertificateItem {
  id: string;
  title: string;
  organization: string;
  category: CertificateCategory;
  completionDate?: string | null;
  year?: number | null;
  description: string;
  skills: string[];
  credentialId?: string | null;
  verificationUrl?: string | null;
  image?: string | null;
  file?: string | null;
  featured?: boolean;
  visible?: boolean;

  // Optional contextual metadata
  date?: string;
  isoDate?: string;
  duration?: string | null;
  role?: string | null;
  achievement?: string | null;
  relatedProject?: string | null;
  credentialStatus?: string;
  type?: string;
}

/**
 * Normalizes categories from variations like "Course", "COURSES", "certification", "TECHNICAL"
 */
export function normalizeCategory(cat: string): CertificateCategory {
  const upper = (cat || '').toUpperCase().trim();
  switch (upper) {
    case 'ACHIEVEMENT':
    case 'ACHIEVEMENTS':
    case 'AWARD':
    case 'AWARDS':
      return 'ACHIEVEMENTS';
    case 'INTERNSHIP':
    case 'INTERNSHIPS':
      return 'INTERNSHIPS';
    case 'HACKATHON':
    case 'HACKATHONS':
      return 'HACKATHONS';
    case 'CERTIFICATION':
    case 'CERTIFICATIONS':
    case 'TECHNICAL':
      return 'TECHNICAL';
    case 'WORKSHOP':
    case 'WORKSHOPS':
      return 'WORKSHOPS';
    case 'LEADERSHIP':
      return 'LEADERSHIP';
    case 'COURSE':
    case 'COURSES':
    default:
      return 'COURSES';
  }
}

/**
 * Normalizes a certificate record and ensures non-breaking fallbacks
 */
export function normalizeCertificate(raw: any): CertificateItem {
  const id = String(raw.id || '').trim();
  const title = String(raw.title || 'Untitled Certificate').trim();
  const organization = String(raw.organization || 'Issuing Organization').trim();
  const category = normalizeCategory(raw.category);
  const year = typeof raw.year === 'number' ? raw.year : (raw.completionDate ? parseInt(raw.completionDate.slice(0, 4), 10) : null);
  const completionDate = raw.completionDate || raw.isoDate || null;
  const date = raw.date || (completionDate ? completionDate : year ? String(year) : 'Verified');
  const isoDate = raw.isoDate || completionDate || '';
  const skills = Array.isArray(raw.skills) ? raw.skills.map(String) : [];
  const description = String(raw.description || '').trim();

  return {
    id,
    title,
    organization,
    category,
    completionDate,
    year,
    date,
    isoDate,
    description,
    skills,
    credentialId: raw.credentialId || null,
    verificationUrl: raw.verificationUrl || null,
    image: raw.image || null,
    file: raw.file || null,
    featured: Boolean(raw.featured),
    visible: raw.visible !== false,
    duration: raw.duration || null,
    role: raw.role || null,
    achievement: raw.achievement || null,
    relatedProject: raw.relatedProject || null,
    credentialStatus: raw.credentialStatus || (raw.verificationUrl ? 'Verified Credential' : 'Verified Document'),
    type: raw.type || `${category} Document`,
  };
}

/**
 * Validates array of certificate records
 */
export function validateCertificatesData(data: any[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const seenIds = new Set<string>();

  data.forEach((item, index) => {
    if (!item.id || typeof item.id !== 'string') {
      errors.push(`Record #${index}: Missing or invalid 'id'`);
    } else if (seenIds.has(item.id)) {
      errors.push(`Record #${index} ('${item.id}'): Duplicate 'id' detected`);
    } else {
      seenIds.add(item.id);
    }

    if (!item.title || typeof item.title !== 'string') {
      errors.push(`Record '${item.id || index}': Missing 'title'`);
    }

    if (!item.organization || typeof item.organization !== 'string') {
      errors.push(`Record '${item.id || index}': Missing 'organization'`);
    }

    if (item.verificationUrl && typeof item.verificationUrl === 'string') {
      if (!item.verificationUrl.startsWith('http://') && !item.verificationUrl.startsWith('https://')) {
        errors.push(`Record '${item.id || index}': verificationUrl must start with http:// or https://`);
      }
    }
  });

  return { valid: errors.length === 0, errors };
}

// All parsed and normalized certificate items
export const ALL_CERTIFICATES_DATA: CertificateItem[] = (rawCertificates as any[])
  .filter((item) => item && typeof item === 'object')
  .map(normalizeCertificate);

// Visible certificate items for public showcase (filters out visible: false)
export const CERTIFICATES_DATA: CertificateItem[] = ALL_CERTIFICATES_DATA.filter(
  (item) => item.visible !== false
);

// Helper lookups
export function getCertificateById(id: string): CertificateItem | undefined {
  return ALL_CERTIFICATES_DATA.find((c) => c.id === id);
}

export function getCertificatesByCategory(category: string): CertificateItem[] {
  if (category === 'ALL') return CERTIFICATES_DATA;
  const normalized = normalizeCategory(category);
  return CERTIFICATES_DATA.filter((c) => c.category === normalized);
}

export function getFeaturedCertificates(): CertificateItem[] {
  return CERTIFICATES_DATA.filter((c) => c.featured);
}
