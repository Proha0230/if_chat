<template>

<div>
    <div class="main">
        <div>
        <div class="navbarMain">
            <div class="navbarLogoMain">
                <h1>IF_Chat</h1>
            </div>
            <div class="navbarButtonMain" v-if="!$store.state.settingON && $store.state.userID">
                <button class="exitButton" @click="goExit"></button>
                <button class="settingsButtonMain" @click="goSettings"></button>
            </div>
            <div class="navbarButtonMain" v-if="$store.state.settingON">
                <button class="goBackButton" @click="goBack"></button>
            </div>
        </div>
    <div v-if="!$store.state.settingON && $store.state.userID && !$store.state.idRecordContactInDB && !$store.state.contactDelete" class="mainNavigation">
            <div class="buttonMenuMain">
                <button><router-link :to="{name: 'chatList'}">Мои диалоги</router-link></button>
                <button><router-link :to="{name: 'contactBook'}">Список контактов</router-link></button>
                <button><router-link :to="{name: 'allUserList'}">Все пользователи</router-link></button>
            </div>
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
    store.state.settingON = false
    store.state.userID = null
    store.state.idRecordContactInDB = null
    store.state.contactDelete = null
    store.state.userEmail = ''
    store.state.userInfo = ''
    store.state.userName = ''
    store.state.userStatus = ''
    store.state.userImg = ''
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

.mainNavigation{
    background-color: mediumaquamarine;
}

.main{
    text-align: center;
    width: -webkit-fill-available;
    max-width: 26rem;
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
    cursor: pointer;
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

.settingsButtonMain{
    cursor: pointer;
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
    cursor: pointer;
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

.buttonMenuMain button{
    cursor: pointer;
    margin: 0rem 0.2rem;
    padding: 0.2rem;
    background-color: beige;
    border-radius: 1rem;
}

.buttonMenuMain{
    padding: 1rem 0rem;
}

.buttonMenuMain li{
    height: 2.5rem;
    border: solid;
    padding: 0.3rem;
    border-radius: 13px;
    background-color: beige;
    border-width: 3px;
    margin: 0rem 0.5rem;;
    list-style-type: none;
}

.buttonMenuMain a{
    text-decoration: none;
    color: black;
}

</style>