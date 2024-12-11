import {getAuth} from 'firebase/auth'
import {firebaseApp} from './FirebaseApp'

export const firebaseAuth=getAuth(firebaseApp);