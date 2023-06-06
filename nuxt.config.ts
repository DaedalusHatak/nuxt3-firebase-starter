// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
runtimeConfig:{
    public:{
        firebaseAdmin:{
            projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_ADMIN_KEY
                ? process.env.FIREBASE_PRIVATE_ADMIN_KEY.replace(/\\n/gm, "\n")
                : undefined,
            clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        },
        firebase:{
            apiKey: process.env.FIREBASE_API_KEY
        }
    }
}
})
