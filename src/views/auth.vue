<template>

    <div class="main" v-if="!$store.state.userID">
        <div class="formAuthMain">
            <h1>Войти в IF_Chat</h1>
            <form class="formAuth" @submit.prevent="authentification"> 
            <label id="login">Логин</label>
            <input id="login" type="text" required v-model="loginAuth">
            <label id="password">Пароль</label>
            <input id="password" type="password" required v-model="passwordAuth">
            <button type="submit">Войти</button>
            <button @click="goReg">Регистрация</button>
            </form>
        </div>
    </div>


</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';


export default{
setup(){
    const router = useRouter()
    const store = useStore()
    const loginAuth = ref()
    const passwordAuth = ref()

    const goReg = ()=>{
        router.push('/registration')
    }

    const authentification = async ()=>{
        try{
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
        const {data} = await axios.post(url, {email:loginAuth.value, password:passwordAuth.value, returnSecureToken: true})
        store.state.userID = data.localId
        store.state.userEmail = data.email
        await loadingDateUser()
        await saveUserId()
        router.push('/chatList')
        } catch(e){
            console.log(e)
        }
    }


    const saveUserId = async ()=> {
            try{
            const body = JSON.stringify({userID: store.state.userID})
            await axios.patch(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}.json`, body )
            } catch(e){
                console.log(e)
            }
        }

    const loadingDateUser = async ()=>{
        try{
        const {data} = await axios.get(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}.json`)
        store.state.userInfo = data.info
        store.state.userName = data.name
        store.state.userStatus = data.status
        store.state.userImg = data.img
        } catch(e){
            console.log(e)
        }
    }


        return{goReg, authentification, loginAuth, passwordAuth}
    }
}

</script>

<style>

.formAuth button{
    border-radius: 20px;
    padding: 0.5rem;
    background-color: mediumaquamarine;
}

.formAuth{
    display: inline-grid;
}

.formAuth input{
    width: 12rem;
    border-radius: 6px;
    margin-bottom: 1rem;
}

.formAuthMain{
    margin-top: 10rem;
}

</style>