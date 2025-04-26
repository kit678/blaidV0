import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { ResearchContactFormData } from './research-email-templates';
import { config } from '@/lib/config';

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

// Define the structure of the contact form data
export interface ContactFormData {
  timeline: string;
  budget: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  intent: string | null;
  product: string | null;
  service: string | null;
}

// Function to add a contact message to Firestore
export async function addContactMessage(formData: ContactFormData): Promise<void> {
  try {
    const contactsCollection = collection(db, 'contacts');
    await addDoc(contactsCollection, {
      ...formData, // Spread all form data
      timestamp: serverTimestamp(), // Add a server timestamp
    });
    console.log('Contact message successfully added to Firestore');
  } catch (error) {
    console.error('Error adding contact message to Firestore:', error);
    throw new Error('Failed to store contact message');
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