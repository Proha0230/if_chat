<template>
    
<div class="chatListMain">
    <div v-if="!userAllData">
        <h2>Диалогов пока-что нет</h2>
    </div>
    <div v-if="userAllData" >
        <div v-for="user in userAllData" :key="user" @click="goChatUser(user.userID)" class="allChatUser" >
            <h4>{{ user.name }}</h4>
        </div>
    </div>
</div>

</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref } from 'vue';
import { onBeforeUnmount } from 'vue';
import axios from 'axios';

export default{

    setup(){

    const store = useStore()
    const router = useRouter()
    const userChatId = ref()
    const userAllData = ref()

    const getChatUserList = async ()=>{
    try{
        const {data} = await axios.get(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}/chat.json`)
        userChatId.value = Object.keys(data)
        await getUserChat()
    } catch (e){}
    }

    const getUserChat = async ()=>{
    try{
        const {data} = await axios.get(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/.json`)
        userAllData.value =  Object.values(data)
        userAllData.value = userAllData.value.filter(userInAllData => userChatId.value.includes(userInAllData.userID))
    } catch(e){}
    }

    getChatUserList()

    const updateChatData =
        setInterval(()=>{
            getChatUserList()
        }, 5000)
        
    updateChatData

    onBeforeUnmount(()=>{
        clearInterval(updateChatData)
    })

    const goChatUser = (id)=> {
        router.push('/chatUser/' + id)
    }

        return{userAllData, goChatUser}
    }
}

</script>

<style>
    .allChatUser{
        cursor: pointer;
        border: solid;
        border-radius: 49px;
        width: 21rem;
        height: 5rem;
        margin: 1rem 0rem;
        background: beige;
    }

    .allChatUser h4{
        width: 13rem;
        height: 0rem;
        margin-top: 2rem;
    }

    .chatListMain{
    width: -webkit-fill-available;
    max-width: 26rem;
    height: 43rem;
    background-image: url(../assets/backgroundAllUser.jpg);
    padding-top: 0.5rem;
    background-repeat: round;
    }
</style>