import { setUserAuthState } from "../features/auth/authSlice";

export const checkSession = async (dispatch) => {
  const token = localStorage.getItem("token");

  if (!token) {
    localStorage.removeItem("token");
    dispatch(setUserAuthState({ userId: null, userToken: null }));
    return;
  }

  try {
    const response = await fetch(
      "https://admin.reactcms.ct8.pl/check-session",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      localStorage.removeItem("token");
      dispatch(setUserAuthState({ userId: null, userToken: null }));
      return;
    }

    const data = await response.json();

    // Jeśli backend zwraca np. userId w danych sesji:
    dispatch(
      setUserAuthState({
        userId: data.userId ?? "unknown",
        userToken: token,
      })
    );

    localStorage.setItem("token", token);
  } catch (error) {
    console.error("Session check failed:", error);
    localStorage.removeItem("token");
    dispatch(setUserAuthState({ userId: null, userToken: null }));
  }
};
