<template>


    <div class="allUserListMain">
        <div class="contactDelete" v-if="$store.state.contactDelete">
            <h2>Вы удалили контакт</h2>
        </div>
        <h2 v-if="!contactAllUsersData">Контактов пока нет</h2>
        <div class="allUserList" v-if="contactAllUsersData">
            <div class="contactBookList" :style="{height: user.writeMessage ? '9rem' : '5rem'}"  v-for="user in contactAllUsersData" :key="user">
                <form class="sendMessage" v-if="user.writeMessage" @submit.prevent="writeMessage(user.userID), user.writeMessage = false">
                    <textarea type="text" v-model="writeTextMessage" maxlength="81" spellcheck="true"></textarea>
                    <button :disabled="$store.state.messageSending">Отправить</button>
                </form>
                <div class="contactUserInfo" @click="goToUser(user.userID)">
                <h4>{{ user.name }}</h4>
                <h4>{{ user.status }}</h4>
                </div>
                <button class="writeMessage" @click="user.writeMessage = !user.writeMessage"></button>
                <button class="deleteContactUser" @click="deleteContact(user.userID, user.idContactInBD)"></button>    
            </div>
        </div>
    </div>
    
    </template>
    
    <script>
    import axios from 'axios'
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    
    
export default{
    setup(){

        const router = useRouter()
        const store = useStore()
        const contactUserId = ref()
        const contactUserData = ref()
        const contactAllUsersData = ref([])
        const writeTextMessage = ref('')

        const getContactsData = async ()=>{
        try{
            const {data} = await axios.get(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}/contactList.json`)
            if(data !== null){        
                contactUserId.value = Object.values(data)
                await getContact()
            } else {
                contactAllUsersData.value = ''
            }
        } catch(e){}
        }

    const getContact = async ()=>{
        try{
            for(let i = 0; i < contactUserId.value.length; i++){
                const {data} = await axios.get(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/.json`)
                contactUserData.value = Object.values(data).filter(userInAllData => contactUserId.value[i].userID.includes(userInAllData.userID)).map(item =>{
                    const obj = {
                        status: item.status,
                        name: item.name,
                        userID: item.userID,
                    }
                    return obj
                })[0]

                contactUserData.value = Object.assign({}, contactUserId.value[i], contactUserData.value)
                contactAllUsersData.value[i] = contactUserData.value
            }
        } catch(e){
            console.log(e)
        }
    }

        const deleteContact = async (id, idInDB)=>{
        try{
            await axios.delete(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}/contactList/${idInDB}.json`)
            contactAllUsersData.value = contactAllUsersData.value.filter(contact => contact.userID !== id)
            store.state.contactDelete = true 

            setTimeout(()=>{
            if(!contactAllUsersData.value.length){
                contactAllUsersData.value = ''
            }
            store.state.contactDelete = false
            }, 2000)
        }catch(e){
            console.log(e)
        }
        }

        const writeMessage = async (id)=> {
        try{
            if(writeTextMessage.value.length > 1){
                const bodyUserSends = JSON.stringify({
                    message: writeTextMessage.value.toLowerCase(),
                    userName: store.state.userName,
                    userID: store.state.userID,
                    newMessage: true
                })
                const {data} = await axios.post(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${id}/chat/${store.state.userID}.json`, bodyUserSends )
                
                store.state.messageSending = true

                const bodyUserPatchId = JSON.stringify({ idMessage: data.name })
                await axios.patch(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${id}/chat/${store.state.userID}/${data.name}.json`, bodyUserPatchId )

                await copyInMyBodySendMessage(id)
                writeTextMessage.value = ''
                store.state.messageSending = false
                goChatUser(id)
            }
        } catch(e){
            console.log(e)
        }
        }

        const copyInMyBodySendMessage = async (id)=>{
        const myBody = JSON.stringify({
            message: writeTextMessage.value.toLowerCase(),
            userName: store.state.userName, 
            userID: id
        })
        const {data} = await axios.post(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}/chat/${id}.json`, myBody )

        const myBodyPatchIdWriteMessage = JSON.stringify({ idMessage: data.name })
        await axios.patch(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}/chat/${id}/${data.name}.json`, myBodyPatchIdWriteMessage )
        }

        const goChatUser = (id)=> {
        router.push('/chatUser/' + id)
        }


        getContactsData()


        const goToUser= (id) =>{
            router.push('/userContact/' + id)
        }

        return{goToUser,contactAllUsersData, deleteContact, writeTextMessage, writeMessage}
    }
}
    
    
    </script>
    
    <style>

    .sendMessage textarea{
    height: 3rem;
    width: 14rem;
    resize: none;
    border-radius: 1rem;
    background-color: beige;
    }

    .sendMessage button{
    border-radius: 2rem;
    background-color: beige;
    margin-left: 0.5rem;
    }

    .sendMessage{
    display: flex;
    width: 18rem;
    height: 3rem;
    margin-top: 1rem;
    background-color: mediumaquamarine;
    }

    .contactDelete{
    width: -webkit-fill-available;
    max-width: 25.5rem;
    border: solid;
    border-radius: 30px;
    margin-top: 0.25rem;
    background-color: red;
    }  

    .writeMessage{
    cursor: pointer;
    background-image: url(../assets/writeMessage.png);
    position: absolute;
    padding: 1.5rem;
    background-size: cover;
    background-color: beige;
    border-radius: 40px;
    max-height: 1rem;
    max-width: 1rem;
    display: block;
    margin-top: -3.5rem;
    margin-left: 0.7rem;
    }

    .deleteContactUser{
    cursor: pointer;
    background-image: url(../assets/delete.png);
    position: absolute;
    padding: 1.5rem;
    background-size: cover;
    background-color: red;
    border-radius: 40px;
    max-height: 1rem;
    max-width: 1rem;
    display: block;
    margin-top: -3.5rem;
    margin-left: 17rem;
    }

    
    .contactBookList{
        cursor: pointer;
        border: solid;
        border-radius: 49px;
        width: 21rem;
        height: 5rem;
        margin: 1rem 0rem;
        background: mediumaquamarine;
    }
    
    
    .contactUserInfo h4{
        width: 13rem;
        height: 0rem;
        margin-bottom: 1.5rem;
    }
    
    .contactUserInfo{
        width: 13rem;
        height: 3rem;
    }

    </style>