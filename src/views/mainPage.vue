<template>

<div>
    <div class="main">
        <div>
        <div class="navbarMain">
            <div class="navbarLogoMain">
                <h1>IF_Chat</h1>
            </div>
            <div class="navbarButtonMain" v-if="!$store.state.settingON && $store.state.userID">
                <!-- <button class="searchButtonMain"></button> -->
                <button class="exitButton" @click="goExit"></button>
                <button class="settingsButtonMain" @click="goSettings"></button>
            </div>
            <div class="navbarButtonMain" v-if="$store.state.settingON">
                <button class="goBackButton" @click="goBack"></button>
            </div>
        </div>
    <div v-if="!$store.state.settingON && $store.state.userID">
            <ul class="buttonMenuMain">
                <li><router-link :to="{name: 'chatList'}">Чаты</router-link></li>
                <li><router-link :to="{name: 'contactBook'}">Мои контакты</router-link></li>
                <li><router-link :to="{name: 'allUserList'}">Все пользователи</router-link></li>
            </ul>
        </div>
        </div>
    </div>
</div>

</template>

<script>
import { ref } from 'vue';
import {useRouter} from 'vue-router'
import { useStore } from 'vuex';

export default{
    setup(){
        const router = useRouter()
        const store = useStore()

const goSettings = ()=>{
    router.push('/settings')
    store.state.settingON = true
}
const goExit = ()=>{
    store.state.userID = null
    store.state.userEmail = ''
    store.state.userInfo = ''
    store.state.userName = ''
    router.push('/')
}

const goBack = ()=>{
    router.push('/chatList')
    store.state.settingON = false
}
    return{ goSettings, goBack, goExit }
    }
}

</script>

<style>

.main{
    text-align: center;
    max-width: 25rem;
}

.navbarMain{
    display: flex;
    background-color: mediumaquamarine;
    padding-bottom: 2rem;
}

.navbarButtonMain{
    margin: 1rem;
    display: flex;
    margin-left: auto;
}

.exitButton{
    background-image: url(../assets/Exit.png);
    padding: 1.5rem;
    background-size: cover;
    background-color: mediumaquamarine;
    border-radius: 40px;
    margin-right: 1.5rem;
    max-height: 1rem;
    max-width: 1rem;
    margin-top: 1.5rem;
}

.searchButtonMain{
    background-image: url(../assets/search.png);
    padding: 1.5rem;
    background-size: cover;
    background-color: mediumaquamarine;
    border-radius: 40px;
    margin-right: 0.5rem;
}

.settingsButtonMain{
    background-image: url(../assets/settings.png);
    padding: 1.5rem;
    background-size: cover;
    background-color: mediumaquamarine;
    border-radius: 40px;
    max-height: 1rem;
    max-width: 1rem;
    margin-top: 1.5rem;
}

.goBackButton{
    background-image: url(../assets/goBack.png);
    padding: 1.5rem;
    background-size: cover;
    background-color: mediumaquamarine;
    border-radius: 40px;
    border-color: mediumaquamarine;
    max-height: 1rem;
    max-width: 1rem;
    margin-top: 1.5rem;
}


.navbarLogoMain{
    margin-left: 1rem;
    color: ghostwhite;
    margin-top: 1.5rem;
}

.buttonMenuMain{
    display: inline-flex;
    margin-right: 2rem;
}

.buttonMenuMain li{
    margin: 0rem 1rem;
    list-style-type: none;
}

</style>