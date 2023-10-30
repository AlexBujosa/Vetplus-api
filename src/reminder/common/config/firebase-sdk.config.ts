import { initializeApp, applicationDefault } from 'firebase-admin/app';

export const firebaseInitializeApp = initializeApp({
  credential: applicationDefault(),
  projectId: 'vetplus-app',
});
