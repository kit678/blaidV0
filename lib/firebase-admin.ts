import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { ResearchContactFormData } from './research-email-templates';
import { ContactFormData } from './firebase';

interface ServiceAccount {
    projectId?: string;
    clientEmail?: string;
    privateKey?: string;
}

const serviceAccount: ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

export const initAdmin = () => {
    if (getApps().length <= 0) {
        if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
            console.warn('Firebase Admin credentials not found. Firestore operations will fail.');
            return null;
        }

        initializeApp({
            credential: cert(serviceAccount),
        });
    }
    return getFirestore();
};

// Product request specific interface
export interface ProductDemoFormData extends ContactFormData {
    product: string;
}

export async function addContactMessageAdmin(formData: ContactFormData): Promise<void> {
    const db = initAdmin();
    if (!db) {
        throw new Error('Firebase Admin not initialized.');
    }

    console.log(`[DEBUG] Attempting to write to Project: ${process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`);

    // Determine collection based on intent
    let collectionName = 'contact_messages'; // Default collection (renamed from 'contacts')
    if (formData.intent === 'demo') {
        collectionName = 'product_demo_requests';
    }

    const contactsCollection = db.collection(collectionName);

    // Sanitize before saving
    const { cf_turnstile_response, website_url, ...cleanData } = formData as any;

    // Check if Turnstile was present (simple validation status)
    const turnstileStatus = (formData as any).cf_turnstile_response ? 1 : 0;

    const docRef = await contactsCollection.add({
        ...cleanData,
        turnstile_success: turnstileStatus,
        timestamp: new Date(),
    });
    console.log(`[DEBUG] Contact message successfully added. Collection: '${collectionName}', Doc ID: ${docRef.id}`);
}

export async function addResearchContactMessageAdmin(data: ResearchContactFormData): Promise<void> {
    const db = initAdmin();
    if (!db) {
        throw new Error('Firebase Admin not initialized.');
    }

    console.log(`[DEBUG] Attempting to write to Project: ${process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`);

    const contactsCollection = db.collection('research_contact_messages');
    // Sanitize before saving
    const { cf_turnstile_response, website_url, ...cleanData } = data as any;

    // Check if Turnstile was present
    const turnstileStatus = (data as any).cf_turnstile_response ? 1 : 0;

    const docRef = await contactsCollection.add({
        ...cleanData,
        turnstile_success: turnstileStatus,
        timestamp: new Date(),
    });

    console.log(`[DEBUG] Research contact data stored. Collection: 'research_contact_messages', Doc ID: ${docRef.id}`);
}

export async function logFailedSubmission(
    reason: string,
    data: any,
    metadata?: { ip?: string; userAgent?: string; error?: string }
): Promise<void> {
    try {
        const db = initAdmin();
        if (!db) return; // Silent fail if auth issues, don't break flow

        const failedCollection = db.collection('failed_submissions');
        // Sanitize data before storing it as a field
        const { cf_turnstile_response, website_url, ...cleanData } = data as any;

        await failedCollection.add({
            reason,
            timestamp: new Date(),
            resubmissionData: cleanData,
            metadata: metadata || {},
        });
        console.log(`[DEBUG] Failed submission logged: ${reason}`);
    } catch (e) {
        console.error('Failed to log failed submission:', e);
    }
}
