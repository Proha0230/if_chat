<template>
    
<div>
    <div v-if="!userAllData">
        <h2>Диалогов пока-что нет</h2>
    </div>
    <div v-if="userAllData" class="allChatUser">
        <div v-for="user in userAllData" :key="user" @click="goChatUser(user.userID)">
            <h4>{{ user.name }}</h4>
        </div>
    </div>
</div>

</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref } from 'vue';
import axios from 'axios';

export default{

    setup(){

    const store = useStore()
    const router = useRouter()
    const userChatId = ref()
    const userAllData = ref()

    // const getUserChatId = async ()=>{
    //     const {data} = await axios.get(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}/chat.json`)
        
    //     userChatId.value = Object.keys(data)
    //     console.log(userChatId.value)
    //     getUserChatData()
    // }

    const getIdChatUser = async ()=>{
    try{
        const {data} = await axios.get(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}/chat.json`)
        userChatId.value = Object.keys(data)
        console.log(userChatId.value)
        await getAllUser()
    } catch (e){
        console.log(e)
    }
    }

    const getAllUser = async ()=>{
    try{
        const {data} = await axios.get(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/.json`)
        userAllData.value =  Object.values(data)
        userAllData.value = userAllData.value.filter(userInAllData => userChatId.value.includes(userInAllData.userID))
        console.log(userAllData.value)
    } catch(e){
        console.log(e)
    }
    }

    getIdChatUser()

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
</style>