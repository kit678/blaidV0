import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { ResearchContactFormData } from './research-email-templates';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app: FirebaseApp;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // If already initialized, use the existing app
}

const db = getFirestore(app);

// Contact form types
export interface ContactFormData {
  services: string[];
  timeline: string;
  budget: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  created_at?: Timestamp;
  created_at_readable?: string;
  is_read?: boolean;
}

// Function to add a contact form submission to Firestore
export async function addContactMessage(message: ContactFormData) {
  try {
    // Create a timestamp for the current time
    const timestamp = serverTimestamp();
    
    // Create a human-readable date string
    const now = new Date();
    const readableDate = now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
    
    const docRef = await addDoc(collection(db, 'contact_messages'), {
      ...message,
      created_at: timestamp,             // Firestore timestamp for sorting
      created_at_readable: readableDate, // Human-readable format
      is_read: false
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding document to Firestore:', error);
    throw error;
  }
}

/**
 * Adds a research contact form submission to Firestore
 * @param data The contact form data to store
 * @returns A promise that resolves when the data is stored
 */
export async function addResearchContactMessage(data: ResearchContactFormData): Promise<void> {
  const contactsCollection = collection(db, "research_contact_messages");
  
  await addDoc(contactsCollection, {
    ...data,
    timestamp: serverTimestamp(),
  });
  
  console.log("Research contact form data stored in Firestore");
}

export { db }; 