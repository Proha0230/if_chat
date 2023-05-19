<template>

    <div class="main">
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
        
        const goAuth = ()=>{
            router.push('/')
        }

    const  bodySubmit = async () =>{
        try{
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`
        const {data} = await axios.post(url, {email: login.value, password: password.value, returnSecureToken: true})
        router.push('/')
        } catch(e){
            console.log(e)
        }

    }


        return{goAuth, bodySubmit, login, password}
    }
}

</script>

<style>
.formReg button{
    border-radius: 20px;
    padding: 0.5rem;
    background-color: mediumaquamarine;
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