import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase/config';
import {
  createUserProfile,
  getUserProfile,
  upsertUserProfile,
  getSavedJobs,
  getHistory,
  saveJob as saveJobToDb,
  updateSavedJob,
  removeSavedJob,
  addHistoryEntry,
  buildJobDocId,
} from '../services/userService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const refreshUserData = useCallback(async (uid) => {
    if (!isFirebaseConfigured || !uid) return;
    const [prof, jobs, hist] = await Promise.all([
      getUserProfile(uid),
      getSavedJobs(uid),
      getHistory(uid),
    ]);
    setProfile(prof);
    setSavedJobs(jobs);
    setHistory(hist);
  }, []);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return undefined;
    }

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setAuthError(null);
      if (firebaseUser) {
        try {
          await refreshUserData(firebaseUser.uid);
        } catch (err) {
          console.error('Failed to load user data:', err);
        }
      } else {
        setProfile(null);
        setSavedJobs([]);
        setHistory([]);
      }
      setLoading(false);
    });

    return unsub;
  }, [refreshUserData]);

  const signUp = useCallback(async (email, password, displayName, profileExtras = {}) => {
    setAuthError(null);
    if (!auth) throw new Error('Firebase Auth is not configured.');
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName?.trim()) {
      await updateProfile(cred.user, { displayName: displayName.trim() });
    }
    await createUserProfile(cred.user.uid, {
      email: cred.user.email,
      displayName: displayName?.trim() || '',
      defaultCountry: profileExtras.defaultCountry,
      targetRole: profileExtras.targetRole,
    });
    setUser(cred.user);
    await refreshUserData(cred.user.uid);
    return cred.user;
  }, [refreshUserData]);

  const signIn = useCallback(async (email, password) => {
    setAuthError(null);
    if (!auth) throw new Error('Firebase Auth is not configured.');
    const cred = await signInWithEmailAndPassword(auth, email, password);
    await refreshUserData(cred.user.uid);
    return cred.user;
  }, [refreshUserData]);

  const logout = useCallback(async () => {
    if (!auth) return;
    await signOut(auth);
    setProfile(null);
    setSavedJobs([]);
    setHistory([]);
  }, []);

  const resetPassword = useCallback(async (email) => {
    setAuthError(null);
    if (!auth) throw new Error('Firebase Auth is not configured.');
    await sendPasswordResetEmail(auth, email);
  }, []);

  const updateProfileSettings = useCallback(async (updates) => {
    if (!user) throw new Error('You must be signed in.');
    await upsertUserProfile(user.uid, updates);
    if (updates.displayName?.trim()) {
      await updateProfile(user, { displayName: updates.displayName.trim() });
    }
    await refreshUserData(user.uid);
  }, [user, refreshUserData]);

  const saveJob = useCallback(async (job, status = 'Saved', notes = '') => {
    if (!user) throw new Error('Sign in to save jobs.');
    const jobDocId = await saveJobToDb(user.uid, job, status, notes);
    await refreshUserData(user.uid);
    return jobDocId;
  }, [user, refreshUserData]);

  const unsaveJob = useCallback(async (jobDocId) => {
    if (!user) return;
    await removeSavedJob(user.uid, jobDocId);
    await refreshUserData(user.uid);
  }, [user, refreshUserData]);

  const changeSavedJobStatus = useCallback(async (jobDocId, status, notes) => {
    if (!user) return;
    await updateSavedJob(user.uid, jobDocId, { status, ...(notes !== undefined ? { notes } : {}) });
    await refreshUserData(user.uid);
  }, [user, refreshUserData]);

  const logHistory = useCallback(async (entry) => {
    if (!user) return;
    await addHistoryEntry(user.uid, entry);
    await refreshUserData(user.uid);
  }, [user, refreshUserData]);

  const isJobSaved = useCallback((job) => {
    const id = buildJobDocId(job);
    return savedJobs.some((s) => s.id === id || s.jobId === id);
  }, [savedJobs]);

  const value = useMemo(() => ({
    user,
    profile,
    savedJobs,
    history,
    loading,
    authError,
    isAuthenticated: Boolean(user),
    isFirebaseConfigured,
    signUp,
    signIn,
    logout,
    resetPassword,
    updateProfileSettings,
    saveJob,
    unsaveJob,
    changeSavedJobStatus,
    logHistory,
    isJobSaved,
    refreshUserData,
    setAuthError,
  }), [
    user, profile, savedJobs, history, loading, authError,
    signUp, signIn, logout, resetPassword, updateProfileSettings,
    saveJob, unsaveJob, changeSavedJobStatus, logHistory, isJobSaved, refreshUserData,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
