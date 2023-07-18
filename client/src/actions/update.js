import * as api from '../api'


export const updateQuestion = (id,questionCount) => async (dispatch) => {
  try {
    const { data } = await api.updateQuestion(id,questionCount);
    dispatch({ type: "UPDATE_USER_QUESTION", payload: data });
  } catch (error) {
    console.log(error);
  }
};