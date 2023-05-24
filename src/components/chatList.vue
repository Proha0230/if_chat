<template>
    
<div class="chatListMain">
    <div v-if="!usersChatList">
        <h2>Диалогов пока-что нет</h2>
    </div>
    <div v-if="usersChatList" >
        <div v-for="user in usersChatList" :key="user"  class="allChatUser" @click="goChatUser(user.userID)">
            <h4>{{ user.name }}</h4>
            <button v-if="func(user.userID)" class="newMessageButton"></button>
        </div>
    </div>
</div>

</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref, watch} from 'vue';

export default{

    setup(){

    const store = useStore()
    const router = useRouter()
    const usersChatList = ref(store.state.usersChatList)
    const userMessageNew = ref()

    userMessageNew.value = Object.values(store.state.newMessageUser)

    const func = (idUser) => {
        try{
            if(userMessageNew.value.find(i => i == idUser)){
               return true
            }
        }catch(e){
            console.log(e)
        }
    }


    watch(() => 
    store.state.usersChatList,
    async () => {
    await router.push('/contactBook')
    await router.push('/chatList')
    })



    const goChatUser = (id)=> {
        router.push('/chatUser/' + id)
    }

        return{usersChatList, goChatUser, func}
    }
}

</script>

<style>


        
    .newMessageButton{
        cursor: pointer;
        background-image: url('../assets/new-message.png');
        padding: 1.5rem;
        background-size: contain;
        max-height: 1rem;
        max-width: 1rem;
        margin-top: -2.5rem;
        margin-left: 14rem;
        display: flex;
        background-color: beige;
    }


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