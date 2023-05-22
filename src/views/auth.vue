<template>

    <div class="main" v-if="!$store.state.userID">
        <div class="errorAuth" v-if="errorAuth">
            <h3 v-if="errorAuth === 'INVALID_PASSWORD'">Вы ввели неверный пароль</h3>
            <h3 v-if="errorAuth === 'EMAIL_NOT_FOUND'">Данный аккаунт не существует</h3>
            <h3 v-if="errorAuth ===  'TOO_MANY_ATTEMPTS'">Вы совершили слишком много попыток входа, подождите</h3>
        </div>
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
    const errorAuth = ref()

    const goReg = ()=>{
        router.push('/registration')
    }

    const authentification = async ()=>{
        try{
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
            const {data} = await axios.post(url, {email:loginAuth.value, password:passwordAuth.value, returnSecureToken: true})
            store.state.userID = data.localId
            store.state.userEmail = data.email
            await saveUserId()
            await recordDataNewUser()
            await loadingDateUser()
            router.push('/chatList')
        } catch(e){
            errorAuth.value = (e.response.data.error.message).slice(0,17) 
            setTimeout(()=>{
            errorAuth.value = ''
            }, 2000)
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

    const recordDataNewUser = async () => {
        try{
            const {data} = await axios.get(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}.json`)
            if( !data.info || !data.name || !data.status || !data.img ){
            
            const bodyNewUser = JSON.stringify({
            info: data.info ?? 'Нет информации',
            name: data.name ?? 'Имя не задано',
            status: data.status ?? 'Нет статуса',
            img: data.img ?? 'https://i.ibb.co/dMqXwmP/no-image.jpg'

        })
            await axios.patch(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}.json`, bodyNewUser )
            console.log('Информация о новом пользователе обновлена')
        }
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


        return{goReg, authentification, loginAuth, passwordAuth, errorAuth}
    }
}

</script>

<style>

.errorAuth{
    border: solid;
    padding: 1rem;
    width: -webkit-fill-available;
    max-width: 26rem;
    border-radius: 1rem;
    margin-top: 0.5rem;
    margin-bottom: -6.5rem;
    background-color: red;
    font-size: 1.2rem;
}

.formAuth button{
    border-radius: 20px;
    padding: 0.5rem;
    background-color: mediumaquamarine;
    margin: 0.5rem 0rem;
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