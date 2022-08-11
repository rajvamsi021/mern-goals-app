export const getAllUsers = () => async (dispatch) => {
    dispatch({ type: "GET_USERS_REQUEST" });
    try {
        const res = await fetch("/getdata", {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
          });
        const data = await res.json();
      dispatch({ type: "GET_USERS_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "GET_USERS_FAIL", payload: err });
    }
};