import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    return result.docs.map((user) => user.data().length > 0)
}

export async function getSuggestedProfiles(userId, following) {
    const result = await firebase.firestore().collection('users').limit(10).get();

    return result.docs
        .map((user) => ({ ...user.data(), docId: user.id }))
        .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}

// get user from the firestore where userId === userId (passed from the auth)
export async function getUserFromFirestoreByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return user;
}

export async function updateLoggedInUserFollowing(
    loggedInUserDocId, // currently logged in user document id (karl's profile)
    profileId, // the user that karl requests to follow
    isFollowingProfile // true/false (am i currently following this person?)
  ) {
    

    return firebase
      .firestore()
      .collection('users')
      .doc(loggedInUserDocId)
      .update({
        following: isFollowingProfile ?
          FieldValue.arrayRemove(profileId) :
          FieldValue.arrayUnion(profileId)
      });
  }


export async function updateFollowedUserFollowers(
    profileDocId, // currently logged in user document id (karl's profile)
    loggedInUserDocId, // the user that karl requests to follow
    isFollowingProfile // true/false (am i currently following this person?)
  ) {

    return firebase
      .firestore()
      .collection('users')
      .doc(profileDocId)
      .update({
        followers: isFollowingProfile ?
          FieldValue.arrayRemove(loggedInUserDocId) :
          FieldValue.arrayUnion(loggedInUserDocId)
      });
  }

export async function getPhotos(userId, following) {
  // photo = post
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get();

  const posts = result.docs
    .map((photo) => ({ ...photo.data(), docId: photo.id }))

  const postsWithDetails = await Promise.all(
    posts.map(async photo => {
      let userLikedPhoto = false;
      if(photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }

      const user = await getUserFromFirestoreByUserId(photo.userId);
      const { username } = user[0];
      
      return { username, ...photo, userLikedPhoto }
    })
  )

  return postsWithDetails;
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return user;
}

// export async function getUserIdByUsername(username) {
//   const userId
// }

export async function getUserPhotosByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', userId)
    .get();

  const photos = result.docs.map(item => ({
    ...item.data(),
    docId: item.id
  }));

  const postsWithDetails = await Promise.all(
      photos.map(async photo => {
        let userLikedPhoto = false;
        if(photo.likes.includes(userId)) {
          userLikedPhoto = true;
        }
  
        const user = await getUserFromFirestoreByUserId(photo.userId);
        const { username } = user[0];
        
        return { username, ...photo, userLikedPhoto }
      })
    )

  return postsWithDetails;
}

export async function isUserFollowingProfile(username, profileUserId) {
  const [result] = await getUserByUsername(username);
  // console.log(result.following.includes(profileUserId));
  return result.following.includes(profileUserId);
}

export async function toggleFollow(isFollowingProfile, activeUserDocId, profileDocId, profileUserId, followingUserId) {
  await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);
  await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}

export async function filteredSearch(query) {
  //para cada eltra, filtrar por aquele que comeca e retorna, dai mostrar a lista
  // nao fazer includes pra n ficar mts
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '>=', query.toLowerCase())
    .get();

  const users = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return users;
}

export default async function updateProfileImage(docId, profilePicture) {
  if(docId) {
    await firebase
      .firestore()
      .collection('users')
      .doc(`${docId}`)
      .update({
          imageSrc: profilePicture
      })
  }
}