function getAvatar(avatarNumber) {
  let avatar;
  switch(avatarNumber) {
    case 1: 
      avatar = require('../assets/Avatars/Avatar1.png');
      break;
    case 2: 
      avatar = require('../assets/Avatars/Avatar2.png');
      break;
    case 3: 
      avatar = require('../assets/Avatars/Avatar3.png');
      break;
    case 4: 
      avatar = require('../assets/Avatars/Avatar4.png');
      break;
    case 5: 
      avatar = require('../assets/Avatars/Avatar5.png');
      break;
    case 6: 
      avatar = require('../assets/Avatars/Avatar6.png');
      break;
    case 7: 
      avatar = require('../assets/Avatars/Avatar7.png');
      break;
    case 8: 
      avatar = require('../assets/Avatars/Avatar8.png');
      break;
    case 9: 
      avatar = require('../assets/Avatars/Avatar9.png');
      break;
    case 10: 
      avatar = require('../assets/Avatars/Avatar10.png');
      break;
    case 11: 
      avatar = require('../assets/Avatars/Avatar11.png');
      break;
    case 12: 
      avatar = require('../assets/Avatars/Avatar12.png');
      break;
    default:
      avatar = null;
  }
  return avatar;
  }
  
export default getAvatar