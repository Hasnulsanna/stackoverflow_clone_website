const usersReducers=(states=[],action)=>{
    switch (action.type) {
        case 'FETCH_USERS':
            return action.payload
        case "UPDATE_CURRENT_USER":
            return states.map((state) =>
                state._id === action.payload._id ? action.payload : state
            );  
        case "UPDATE_USER_QUESTION":
            console.log(action.payload);

    try {
      // Update localStorage
      const currentUserData = JSON.stringify(action.payload);
      localStorage.setItem('currentUser', currentUserData);

      const profileData = JSON.parse(localStorage.getItem('Profile'));
      const updatedProfileData = {
        ...action.payload,
      };
      const updatedData = JSON.stringify( updatedProfileData );
      console.log(updatedData);
      localStorage.setItem('Profile', updatedData);
      
      // return updatedData;
    } catch (error) {
      // Handle the JSON parsing or stringifying error
      console.error('Error updating localStorage:', error);
      // You can add your own error handling logic here
    }
        default:
            return states;
    }
}

export default usersReducers