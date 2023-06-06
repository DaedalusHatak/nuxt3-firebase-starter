<script setup lang="ts">

const email= ref<string>("");
const password= ref<string>("");
async function logIn(){
    try{
        const csrfToken = useCookie("__token")
        const creds = await signInUser(email.value,password.value)
        if(creds.code) throw new Error(creds.code)      // if signInUser returns error
        const idToken = await creds.user.getIdToken();
        const checkToken = await useFetch('/api/signIn',{
            method: 'POST',
            body:{idToken,csrfToken}
        })
        if(checkToken){
            navigateTo('/browse')
        }
    }
    catch(error){
        alert(error)
    }
}

</script>

<template>
<h1>Login</h1>
<form @submit.prevent="logIn()">
<div><label for="">Email</label><input type="text" v-model="email"></div>
<div><label for="">Password</label><input type="text" v-model="password"></div>
<button>Submit</button>
</form>
<button class="back-button" @click="navigateTo('/')">Go back</button>
</template>

<style scoped lang="scss">
*{
    font-size: 1.25rem;
}
h1{
    font-size: 2rem;
    text-align: center;
}
form{
    margin: auto;
    display:flex;
    flex-direction: column;
    max-width: 300px;
    gap:0.5rem;

}
input{
    height: 2rem;
    padding: 0;
    width:-webkit-fill-available
}
button{
    padding: 1rem;
}
.back-button{
    
    display: flex;
    margin:auto;
    justify-content: center;
    margin-top:0.75rem;
    max-width: 300px;
    width:100%;
}
</style>