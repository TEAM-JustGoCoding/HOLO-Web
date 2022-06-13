import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

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
const pathReference = ref(storage, 'profile_img/profile_skqhddl7@gmailcom.jpg'); 

var firebaseImage = "";

getDownloadURL(pathReference)
  .then((url) => {
      firebaseImage = url;
    // Insert url into an <img> tag to "download"
  })
  .catch((error) => {
    switch (error.code) {
      case 'storage/object-not-found': // File doesn't exist
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

var test = "";
const getProfileImg = (mail) => {
  var profileImgName = mail.replace('.', '');
  var profileImgLocation = 'profile_img/profile_'+profileImgName+'.jpg'
  var profileImg = "";
  getDownloadURL(ref(storage, profileImgLocation))
  .then((url) => {
      profileImg = url;
      test = url;
  })
  .catch((error) => {
    switch (error.code) {
      case 'storage/object-not-found': // File doesn't exist
        profileImg = 'none' //없는 경우 처리 필요
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
  return profileImg
}


export {firebaseImage, getProfileImg, test}