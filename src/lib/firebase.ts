import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';

export async function currentUser() {
  const auth = getAuth();
  if (auth.currentUser) return auth.currentUser;
  return new Promise<User | null>((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) return resolve(user);
      else return resolve(null);
    });
  });
}

export async function signOut() {
  const auth = getAuth();
  await auth.signOut();
}
