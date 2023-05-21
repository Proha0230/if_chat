<template>

<div class="mainChatUser">
    <div class="chatUserMain">
        <div v-for="user in userChatData" :key="user" class="chatUserMessageList" :style="{marginLeft: user.userName === $store.state.userName ? '4rem' : '-4rem'}">
        <h4 class="h4userName" :style="{marginLeft: user.userName === $store.state.userName ? '10rem' : '1.2rem'}" >{{ user.userName }}</h4>
        <h4 class="h4userMessage" :style="{marginLeft: user.userName === $store.state.userName ? '-15.8rem' : '-7rem'}">{{ user.message }}</h4>
        </div>
    </div>
    <form class="formSendMessage" @submit.prevent="writeMessage">
        <input type="text" maxlength="84" spellcheck="true" v-model="writeTextMessage"/>
        <button>Отправить</button>
    </form>
</div>

</template>

<script>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';

export default{

    setup(){

        const store = useStore()
        const route = useRoute()
        const userChatData = ref()
        const writeTextMessage = ref()

        const getUserChatData = async ()=>{
        try{
            const {data} = await axios.get(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}/chat/${route.params.userId}.json`)
            userChatData.value = Object.values(data)
            setTimeout(()=>{
            const elem = document.querySelector('.chatUserMain')
            elem.scrollTo(0, 100000000)
            }, 500)
        }catch(e){
            console.log(e)
        }
        }

        getUserChatData()

        const writeMessage = async ()=> {
        try{
            const bodyUserSends = JSON.stringify({
                message: writeTextMessage.value,
                userName: store.state.userName,
                userID: store.state.userID
            })
            await axios.post(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${route.params.userId}/chat/${store.state.userID}.json`, bodyUserSends )
                
            const myBody = JSON.stringify({
                message: writeTextMessage.value,
                userName: store.state.userName, 
                userID: route.params.userId
            })
            await axios.post(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}/chat/${route.params.userId}.json`, myBody )

            writeTextMessage.value = ''
            await getUserChatData()

            setTimeout(()=>{
            const elem = document.querySelector('.chatUserMain')
            elem.scrollTo(0, 100000000)
            }, 500)
        } catch(e){
            console.log(e)
        }
        }

        return{userChatData, writeTextMessage, writeMessage}
    }
}



</script>

<style>

    .mainChatUser{
    max-width: 26rem;
    height: 33rem;
    }

    .chatUserMain{
    height: -webkit-fill-available;
    overflow-x: hidden;
    overflow-y: scroll;
    }

    .chatUserMain::-webkit-scrollbar{
    width: 0.5rem;
    }

    .chatUserMain::-webkit-scrollbar-thumb{
        background-color: mediumaquamarine;
        border-radius: 1rem;
    }

    .formSendMessage{
    position: fixed;
    width: -webkit-fill-available;
    max-width: 26rem;
    height: 5rem;
    background-color: mediumaquamarine;
    margin-top: 0.5rem;
    }

    .formSendMessage input{
    margin-top: 0.8rem;
    width: 14rem;
    height: 3rem;
    background-color: beige;
    border-radius: 10px;
    }

    .formSendMessage button{
    cursor: pointer;
    padding: 1rem;
    margin-left: 0.5rem;
    border-radius: 2rem;
    background-color: beige;
    }

    .chatUserMessageList{
    border: solid;
    border-radius: 49px;
    width: 17.5rem;
    height: 5.5rem;
    margin: 1rem 0rem;
    margin-left: -4rem;
    background: beige;
    display: flex;
    }


    .h4userName{
    text-align-last: center;
    float: left;
    height: 1rem;
    width: 7rem;
    margin-top: 0.5rem;
    text-align: initial;
    margin-bottom: 0rem;
    }

    .h4userMessage{
    margin-top: 2rem;
    width: 15rem;
    height: 3rem;
    text-align: initial;
    }

    @media (min-height: 650px) and (max-height: 680px){
        .mainChatUser{
        height: 22rem;
    }
    }

    @media (min-height: 681px) and (max-height: 715px){
        .mainChatUser{
        height: 24rem;
    }
    }

    @media (min-height: 716px) and (max-height: 750px){
        .mainChatUser{
        height: 26rem;
    }
    }

    @media (min-height: 751px) and (max-height: 780px){
        .mainChatUser{
        height: 28rem;
    }
    }

    @media (min-height: 781px) and (max-height: 820px){
        .mainChatUser{
        height: 30rem;
    }
    }

    @media (min-height: 870px) and (max-height: 913px){
        .mainChatUser{
        height: 36rem;
    }
    }

    @media (min-height: 914px) and (max-height: 950px){
        .mainChatUser{
        height: 39rem;
    }
    }

</style>