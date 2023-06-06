export default defineNuxtRouteMiddleware(async (to, from) => {
    const sessionCookie = useCookie("__token");
    let firebase;            // returns true if token is valid
    await $fetch("/api/checkSession", {
      method: "POST",
      body: { sessionCookie: sessionCookie.value },
    }).then((response) => {
      firebase = response;
      return firebase;
    });
    if (firebase) {      //to guarderd routes
      if (to.path !== "/browse") {     
        return navigateTo("/browse");
      }
    } else if (!firebase && to.path === "/browse") {
      return navigateTo("/login");
    }
  });
  