<template>

    <h1 v-if="!contactUserData">Контактов пока нет</h1>
    <div class="contactDelete" v-if="$store.state.contactDelete">
            <h2>Вы удалили контакт</h2>
        </div>
    <div class="allUserListMain" v-if="contactUserData">
        <div class="allUserList">
            <div class="allUserListInfo" :style="{height: user.writeMessage ? '9rem' : '5rem'}"  v-for="user in contactUserData" :key="user">
                <form class="sendMessage" v-if="user.writeMessage" @submit.prevent="writeMessage(user.userID), user.writeMessage = false">
                    <input type="text" v-model="writeTextMessage" maxlength="84" spellcheck="true"/>
                    <button>Отправить</button>
                </form>
                <div class="contactUserInfo" @click="goToUser(user.userID)">
                <h4>{{ user.name }}</h4>
                <h4>{{ user.status }}</h4>
                </div>
                <button class="writeMessage" @click="user.writeMessage = !user.writeMessage"></button>
                <button class="deleteContactUser" @click="deleteContact(user.userID, user.idRecordContactInBD)"></button>    
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
            const contactUserData = ref()
            const writeTextMessage = ref('')

            const getContactsData = async ()=>{
            try{
                const {data} = await axios.get(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}/contactList.json`)           
                contactUserData.value = Object.values(data)
            } catch(e){
                console.log(e)
            }
            }

            const deleteContact = async (id, idInDB)=>{
            try{
                await axios.delete(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}/contactList/${idInDB}.json`)
                contactUserData.value = contactUserData.value.filter(contact => contact.userID !== id)
                store.state.contactDelete = true

                setTimeout(()=>{
                store.state.contactDelete = null
                }, 2000)
            }catch(e){
                console.log(e)
            }
            }

            const writeMessage = async (id)=> {
            try{
                const bodyUserSends = JSON.stringify({
                    message: writeTextMessage.value,
                    userName: store.state.userName,
                    userID: store.state.userID
                })
                await axios.post(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${id}/chat/${store.state.userID}.json`, bodyUserSends )
                
                const myBody = JSON.stringify({
                    message: writeTextMessage.value,
                    userName: store.state.userName, 
                    userID: id
                })
                await axios.post(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}/chat/${id}.json`, myBody )

                writeTextMessage.value = ''
            } catch(e){
                console.log(e)
            }
            }


            getContactsData()

            // const getContactsID = async ()=>{
            //     try{
            //     const {data} = await axios.get(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}/contactList.json`)
            //     contactUsersID = Object.values(data).map(item => {
            //         return item.userID
            //     })
            //     await getAllUser()
            //     } catch(e){
            //         console.log(e)
            //     }
            // }
            // это если передаем только один параметр от всех параметров пользователя - id

            // const getAllUser= async ()=>{
            //     try{
            //     const {data} = await axios.get(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/.json`)
            //     AllUserList = Object.values(data)
                
            //     contactData.value = AllUserList.filter(userInAllList => contactUsersID.includes(userInAllList.userID))

                // таким образом через метод .includes() мы проверяем содержит ли наш массив с id пользователей что мы добавили в контакты - 
                // такие же id проходясь по каждому обьекту в общем массиве пользователей и в тех обьектах в общем массиве пользователей 
                // где совпадают эти id (из массива пользователей что мы добавили в контакты) - метод filter() выдаст true и они будут отфильтрованы 

            //     } catch(e){
            //         console.log(e)
            //     }
            // }


            const goToUser= (id) =>{
                router.push('/userContact/' + id)
            }
    
            return{goToUser,contactUserData, deleteContact, writeTextMessage, writeMessage}
        }
    }
    
    
    </script>
    
    <style>

    .sendMessage input{
    width: 13rem;
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
    max-width: 24rem;
    border: solid;
    border-radius: 30px;
    margin-top: 0.25rem;
    margin-bottom: -0.7rem;
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

    
    .allUserListInfo{
        border: solid;
        border-radius: 49px;
        width: 21rem;
        height: 5rem;
        margin: 1rem 0rem;
        background: mediumaquamarine;
    }
    
    
    .allUserListInfo h4{
        width: 13rem;
        height: 0rem;
        margin-bottom: 1.5rem;
    }
    
    .contactUserInfo{
        width: 13rem;
        height: 3rem;
    }

    </style>