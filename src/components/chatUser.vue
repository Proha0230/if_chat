<template>

<div class="mainChatUser">
    <div class="chatUserMain">

        <div v-for="user in userChatData" :key="user" class="chatUserMessageList"
        :style="{
            marginLeft: user.userName === $store.state.userName ? '4rem' : '-4rem',
            background: user.userName === $store.state.userName ? 'mediumaquamarine' : 'beige'
            }">
        
        <h4 class="h4userName" :style="{marginLeft: user.userName === $store.state.userName ? '10rem' : '1.2rem'}" >{{ user.userName }}</h4>
        <h4 class="h4userMessage" :style="{marginLeft: user.userName === $store.state.userName ? '-15.8rem' : '-7rem'}">{{ user.message }}</h4>
        <button v-if="user.userName === $store.state.userName" @click="funcDelete" class="deleteMessege"></button>
        <button v-if="user.userName === $store.state.userName" @click="funcEdit" class="editMessege"></button>
        <p style="display: none;">{{user.idMessage}}</p>
        <div class="divEditFormMessage" v-if="editFormOpen && messageIdClick === user.idMessage">
            <form @submit.prevent="editMessage(user.idMessage, user.message)">
                <textarea type="text"  maxlength="81" spellcheck="true" v-model="editFormMessageData"></textarea>
                <button :disabled="$store.state.messageSending">Изменить сообщение</button>
            </form>
        </div>
        </div>
    </div>
    <form class="formSendMessage" @submit.prevent="writeMessage">
        <textarea type="text" maxlength="81" spellcheck="true" v-model="writeTextMessage"></textarea>
        <button :disabled="$store.state.messageSending">Отправить</button>
    </form>
</div>

</template>

<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { onBeforeUnmount } from 'vue';
import { ref } from 'vue';
import axios from 'axios';

export default{

    setup(){

        const store = useStore()
        const route = useRoute()
        const router = useRouter()
        const userChatData = ref()
        const writeTextMessage = ref()
        const readMessageTrue = ref()
        const MyIdMessageInUserData = ref()
        const editFormOpen = ref(false)
        const editFormMessageData = ref()
        const messageIdClick = ref()
        const messegeIdClickDelete = ref()

        const funcEdit = (event) => {
        try{
            messageIdClick.value = event.target.parentElement.childNodes[4].innerText
            editFormOpen.value = !editFormOpen.value
        }catch(e){
            console.log(e)
        }
        }

        const funcDelete = async (event) => {
        try{
            messegeIdClickDelete.value = event.target.parentElement.childNodes[4].innerText
            await deleteMessage(event.target.parentElement.childNodes[1].innerText)
            await getUserChatData()
        }catch(e){
            console.log(e)
        }
        }


        const getUserChatData = async ()=>{
        try{
            const {data} = await axios.get(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}/chat/${route.params.userId}.json`)
        if(data !== null){
            userChatData.value = Object.values(data)

            readMessageTrue.value = userChatData.value.filter(userChat => userChat.newMessage === true)
            readMessageTrue.value = readMessageTrue.value.map( user => user.idMessage)
  
            if(readMessageTrue.value.length){
            setTimeout(()=>{
            const elem = document.querySelector('.chatUserMain')
            elem.scrollTo(0, 100000000)
            }, 500)
            }
            

            setTimeout( async ()=>{
            for(let i = 0; i < readMessageTrue.value.length; i++){
            const bodyWriteMessage = JSON.stringify({
                newMessage: false
            })
            if(readMessageTrue.value.length){
            await axios.patch(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}/chat/${route.params.userId}/${readMessageTrue.value[i]}.json`, bodyWriteMessage )
            store.state.newMessageTrue = false
            }
            }
            }, 500)

            store.state.newMessageUser = {}
        } else {
            await router.push('/chatList')
        }
            
        }catch(e){
            console.log(e)
        }
        }


        const writeMessage = async ()=> {
        try{
            if(writeTextMessage.value.length > 1){
            const bodyUserSends = JSON.stringify({
                message: writeTextMessage.value.toLowerCase(),
                userName: store.state.userName,
                userID: store.state.userID,
                newMessage: true
            })
            store.state.messageSending = true
            
            const {data} = await axios.post(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${route.params.userId}/chat/${store.state.userID}.json`, bodyUserSends )

            const bodyUserPatchId = JSON.stringify({ idMessage: data.name })
            await axios.patch(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${route.params.userId}/chat/${store.state.userID}/${data.name}.json`, bodyUserPatchId )

            await copyInMyBodySendMessage()
            writeTextMessage.value = ''
            await getUserChatData()
            setTimeout(()=>{
            const elem = document.querySelector('.chatUserMain')
            elem.scrollTo(0, 100000000)
            store.state.messageSending = false
            }, 200)
        }
        } catch(e){
            console.log(e)
        }
        }

        const copyInMyBodySendMessage = async ()=>{
        try{
            const myBody = JSON.stringify({
            message: writeTextMessage.value.toLowerCase(),
            userName: store.state.userName, 
            userID: route.params.userId
            })
            const {data} = await axios.post(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}/chat/${route.params.userId}.json`, myBody )

            const myBodyPatchIdWriteMessage = JSON.stringify({ idMessage: data.name })
            await axios.patch(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}/chat/${route.params.userId}/${data.name}.json`, myBodyPatchIdWriteMessage )
            
        } catch(e) {
            console.log(e)
        }
        }

        const deleteMessage = async (message) => {
        try{
            await axios.delete(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}/chat/${route.params.userId}/${messegeIdClickDelete.value}.json`)
            // удаление из своей БД
            const {data} = await axios.get(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${route.params.userId}/chat/${store.state.userID}.json`)
            MyIdMessageInUserData.value = Object.values(data).filter(item => item.message === message && item.userName === store.state.userName).map(item => item.idMessage)

            await axios.delete(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${route.params.userId}/chat/${store.state.userID}/${MyIdMessageInUserData.value[0]}.json`)
            // удаляем из БД пользователя кому написали. Ищем по одинаковому содержимому сообщения которое мы отправили в БД его сообщений в нашей переписке и так же чтоб имя пользователя отправителя
            // было нашим, т.к. если будут еще одинаковые сообщения отправленные - то будет ошибка
        } catch(e){
            console.log(e)
        }
        }

        const editMessage = async (id, message) =>{
        try{
            if(editFormMessageData.value.length > 0){
            const {data} = await axios.get(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${route.params.userId}/chat/${store.state.userID}.json`)
            MyIdMessageInUserData.value = Object.values(data).filter(item => item.message === message && item.userName === store.state.userName).map(item => item.idMessage)
            
            store.state.messageSending = true

            const bodyUser = JSON.stringify({
                message: editFormMessageData.value.toLowerCase()
            })
            await axios.patch(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${route.params.userId}/chat/${store.state.userID}/${MyIdMessageInUserData.value[0]}.json`, bodyUser)


            const myBody = JSON.stringify({
                message: editFormMessageData.value.toLowerCase()
            })
            await axios.patch(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}/chat/${route.params.userId}/${id}.json`, myBody)

            editFormMessageData.value = ''
            editFormOpen.value = false
            store.state.messageSending = false
            getUserChatData()
        }
        } catch(e){
            console.log(e)
        }
        }


        const updateChatData =
        setInterval(()=>{ 
                if(!editFormOpen.value){
                    getUserChatData()
                    console.log("обновил данные")
                }
        }, 5000)

        updateChatData

        setTimeout(()=>{
        if(userChatData.value){
        const elem = document.querySelector('.chatUserMain')
        elem.scrollTo(0, 100000000)
        }
        }, 300)

        onBeforeUnmount(()=>{
            clearInterval(updateChatData)
        })

        getUserChatData()

        return{userChatData, writeTextMessage, writeMessage, deleteMessage, editFormOpen, editFormMessageData, editMessage, funcEdit, messageIdClick, funcDelete}
    }
}



</script>

<style>

    .divEditFormMessage{
    margin-top: 0.05rem;
    height: 5rem;
    width: 18rem;
    margin-left: -16.6rem;
    border: solid;
    border-radius: 2rem;
    background-color: cornflowerblue;
    margin-bottom: 1rem;
    padding: 0.5rem 0rem;
    }

    .divEditFormMessage textarea{
    height: 3rem;
    width: 14rem;
    resize: none;
    }
    
    .divEditFormMessage button{
    border-radius: 10px;
    padding: 0.2rem;
    }

    .editMessege{
    cursor: pointer;
    background-image: url(../assets/pencil.png);
    padding: 0.8rem;
    background-size: cover;
    border-color: cornsilk;
    border-radius: 40px;
    margin-right: -0.3rem;
    max-height: 1rem;
    max-width: 1rem;
    margin-top: 5.5rem;
    position: relative;
    }

    .deleteMessege{
    cursor: pointer;
    background-image: url(../assets/delete.png);
    padding: 0.8rem;
    background-size: cover;
    background-color: red;
    border-radius: 40px;
    margin-right: -1.8rem;
    max-height: 1rem;
    max-width: 1rem;
    margin-top: -1rem;
    position: relative;
    }

    .newMessageInChatUser h3{
    width: -webkit-fill-available;
    max-width: 26rem;
    position: absolute;
    border: solid;
    margin-left: 0rem;
    margin-top: 0rem;
    margin-right: 0.5rem;
    padding: 1rem 0rem;
    border-radius: 1rem;
    background-color: skyblue;
    font-family: monospace;
    }

    .mainChatUser{
    max-width: 26rem;
    height: 33rem;
    }

    .chatUserMain{
    height: -webkit-fill-available;
    overflow-x: hidden;
    overflow-y: scroll;
    background-image: url('../assets/backgroundChat.jpg');
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
    padding-top: 0.5rem;
    display: flex;
    }

    .formSendMessage textarea{
    height: 3rem;
    width: 14rem;
    resize: none;
    background-color: beige;
    border-radius: 10px;
    margin-left: 1rem;
    margin-top: 0.5rem;
    }

    .formSendMessage button{
    width: 6rem;
    cursor: pointer;
    height: 3rem;
    border-radius: 2rem;
    background-color: beige;
    margin-left: 1rem;
    margin-top: 0.7rem;
    }

    .chatUserMessageList{
    border: solid;
    border-radius: 49px;
    width: 17.5rem;
    height: 6.5rem;
    margin: 2rem 0rem;
    margin-left: -4rem;
    background: mediumaquamarine;
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