import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {images} from './images';

const firebaseConfig = {
  apiKey: "AIzaSyDPrRf9wVlXJDZiq16XI6XnlVxwyoPkJ5I",
  authDomain: "holo-androidapp.firebaseapp.com",
  projectId: "holo-androidapp",
  storageBucket: "holo-androidapp.appspot.com",
  messagingSenderId: "258764685383",
  appId: "1:258764685383:web:4f64fc0922f8411daaf162",
  measurementId: "G-8VD92ZQYGT"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const getProfileImg = (mail) => {
  return new Promise(function(resolve, reject){
    var profileImgName = mail.replace('.', '');
    var profileImgLocation = 'profile_img/profile_'+profileImgName+'.jpg'
    getDownloadURL(ref(storage, profileImgLocation))
    .then((url) => {
      resolve(url)
    })
    .catch((error) => {
      switch (error.code) {
        case 'storage/object-not-found': // File doesn't exist
          resolve(images.user)
          break;
        case 'storage/unauthorized': // User doesn't have permission to access the object
          break;
        case 'storage/canceled': // User canceled the upload
          break;
        case 'storage/unknown': // Unknown error occurred, inspect the server response
          break;
        default:
          break;
      }
    });
  })
}

export {getProfileImg}