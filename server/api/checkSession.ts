import { getAuth } from "firebase-admin/auth";

export default defineEventHandler(async (event) => {
  const { sessionCookie } = await readBody(event);
  let papa;
  let res = false;
  if (sessionCookie) {
    papa = await getAuth()
      .verifySessionCookie(sessionCookie, true)
      .then((response) => {
        return (res = true);
      })
      .catch((err) => {
        console.log(err);
        return (res = false);
      });
  }
  return res;
});
