import { getAuth } from "firebase-admin/auth";

export default defineEventHandler(async (event) => {
  const { idToken } = await readBody(event);
  const auth = getAuth();
  const expiresIn = 60 * 60 * 24 * 14 * 1000;

  await auth
    .verifySessionCookie(idToken)
    .then((decodedClaims) => {
      deleteCookie(event, "__token");
    //   return auth.revokeRefreshTokens(decodedClaims.sub);  ### UNCOMMENT FOR REVOKING ALL SESSIONS AFTER LOGGING OUT
    })
    .catch((err) => {
      console.log(err);
      setResponseStatus(event, 401, "Something went wrong");
    });
  return send(event);
});
