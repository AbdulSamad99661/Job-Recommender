import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';
import { DEFAULT_SEARCH_LOCATION } from '../data/searchCountries';

export const SAVED_JOB_STATUSES = [
  'Saved',
  'Applied',
  'Interview',
  'Offer',
  'Rejected',
];

function requireDb() {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured. Add VITE_FIREBASE_* keys to your environment.');
  }
  return db;
}

function userRef(uid) {
  return doc(requireDb(), 'users', uid);
}

function savedJobsRef(uid) {
  return collection(requireDb(), 'users', uid, 'savedJobs');
}

function historyRef(uid) {
  return collection(requireDb(), 'users', uid, 'history');
}

export function buildJobDocId(job) {
  const key = `${job.title || ''}|${job.company || ''}|${job.location || job.city || ''}|${job.applyLink || job.apply_link || ''}`;
  return btoa(unescape(encodeURIComponent(key))).replace(/[+/=]/g, '').slice(0, 48);
}

export async function getUserProfile(uid) {
  const snap = await getDoc(userRef(uid));
  return snap.exists() ? snap.data() : null;
}

export async function upsertUserProfile(uid, data) {
  const ref = userRef(uid);
  const existing = await getDoc(ref);
  const payload = {
    ...data,
    updatedAt: serverTimestamp(),
  };
  if (!existing.exists()) {
    await setDoc(ref, {
      defaultCountry: DEFAULT_SEARCH_LOCATION,
      targetRole: 'Software Engineer',
      createdAt: serverTimestamp(),
      ...payload,
    });
  } else {
    await updateDoc(ref, payload);
  }
}

export async function createUserProfile(uid, { email, displayName }) {
  await setDoc(userRef(uid), {
    email: email || '',
    displayName: displayName || '',
    defaultCountry: DEFAULT_SEARCH_LOCATION,
    targetRole: 'Software Engineer',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function saveJob(uid, job, status = 'Saved', notes = '') {
  const jobId = buildJobDocId(job);
  const ref = doc(requireDb(), 'users', uid, 'savedJobs', jobId);
  await setDoc(ref, {
    jobId,
    title: job.title || '',
    company: job.company || '',
    location: job.location || job.city || '',
    city: job.city || '',
    country: job.country || '',
    matchScore: job.matchScore ?? job.match_score ?? null,
    applyLink: job.applyLink || job.apply_link || '',
    source_platform: job.source_platform || job.source || '',
    matchedSkills: job.matchedSkills || job.matched_skills || [],
    status,
    notes,
    savedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return jobId;
}

export async function updateSavedJob(uid, jobDocId, updates) {
  const ref = doc(requireDb(), 'users', uid, 'savedJobs', jobDocId);
  await updateDoc(ref, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

export async function removeSavedJob(uid, jobDocId) {
  await deleteDoc(doc(requireDb(), 'users', uid, 'savedJobs', jobDocId));
}

export async function getSavedJobs(uid) {
  const q = query(savedJobsRef(uid), orderBy('savedAt', 'desc'), limit(100));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addHistoryEntry(uid, entry) {
  await addDoc(historyRef(uid), {
    type: entry.type,
    title: entry.title,
    description: entry.description || '',
    location: entry.location || '',
    jobCount: entry.jobCount ?? null,
    skill: entry.skill || '',
    metadata: entry.metadata || {},
    createdAt: serverTimestamp(),
  });
}

export async function getHistory(uid, max = 50) {
  const q = query(historyRef(uid), orderBy('createdAt', 'desc'), limit(max));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
