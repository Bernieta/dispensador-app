import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { environment } from 'src/environments/environment';

const app = initializeApp(environment.firebaseConfig);
export const database = getDatabase(app);