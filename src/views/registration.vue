<template>

    <div class="main">
        <div class="regSuccess" v-if="emailUserDer">
            <h3>Вы успешно зарегистрировали аккаунт {{ emailUserDer }}</h3>
        </div>
        <div class="formRegMain">
            <h1>Регистрация</h1>
            <form class="formReg" @submit.prevent="bodySubmit"> 
            <label id="login">Логин</label>
            <input id="login" type="email" autocomplete="off" required v-model="login">
            <label id="password">Пароль</label>
            <input id="password" type="password" autocomplete="off" required v-model="password">
            <button>Зарегистрировать аккаунт</button>
            <button type="submit" @click="goAuth">Назад</button>
            </form>
        </div>
    </div>


</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'

export default{
    setup(){
        const router = useRouter()
        const login = ref()
        const password = ref()
        const emailUserDer = ref('')
        
        const goAuth = ()=>{
            router.push('/')
        }

    const  bodySubmit = async () =>{
        try{
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`
        const {data} = await axios.post(url, {email: login.value, password: password.value, returnSecureToken: true})
        emailUserDer.value = data.email
        setTimeout(()=>{
            emailUserDer.value = ''
            router.push('/')
        }, 2000)
        } catch(e){
            console.log(e)
        }

    }


        return{goAuth, bodySubmit, login, password, emailUserDer}
    }
}

</script>

<style>

.regSuccess{
    border: solid;
    padding: 1rem;
    width: -webkit-fill-available;
    max-width: 26rem;
    border-radius: 1rem;
    margin-top: 0.5rem;
    margin-bottom: -8rem;
    background-color: mediumaquamarine;
    font-size: 1.2rem;
}

.formReg button{
    border-radius: 20px;
    padding: 0.5rem;
    background-color: mediumaquamarine;
    margin: 0.5rem 0rem;
}

.formReg{
    display: inline-grid;
}

.formReg input{
    width: 12rem;
    border-radius: 6px;
    margin-bottom: 1rem;
}

.formRegMain{
    margin-top: 10rem;
}

</style>