<template>

    <h1 v-if="!contactData">Контактов пока нет</h1>
    <div class="allUserListMain" v-if="contactData">
        <div class="allUserList">
            <div class="allUserListInfo" v-for="user in contactData" :key="user" @click="goToUser(user.userID)">
                <h4>{{ user.name }}</h4>
                <h4>{{ user.status }}</h4>         
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
            let contactUsersID = []
            let AllUserList = []
            const contactData = ref()
    
            const getContactsID = async ()=>{
                try{
                const {data} = await axios.get(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}/contactList.json`)
                contactUsersID = Object.values(data).map(item => {
                    const obj ={
                        user: item.user,
                        added: item.added
                    }
                    return obj
                })

                await getAllUser()
                } catch(e){
                    console.log(e)
                }
            }

            const getAllUser= async ()=>{
                try{
                const {data} = await axios.get(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/.json`)
                AllUserList = Object.values(data)
                let i = 0
                contactData.value = AllUserList.filter(userInAllList => userInAllList.userID === contactUsersID[i++].user)

                // contactData.value = AllUserList.filter(userInAllList => contactUsersID[i++].user.includes(userInAllList.userID))

                // таким образом через метод .includes() мы проверяем содержит ли наш массив с id пользователей что мы добавили в контакты - 
                // такие же id проходясь по каждому обьекту в общем массиве пользователей и в тех обьектах в общем массиве пользователей 
                // где совпадают эти id (из массива пользователей что мы добавили в контакты) - метод filter() выдаст true и они будут отфильтрованы 

                } catch(e){
                    console.log(e)
                }
            }

            getContactsID()

            const goToUser= (id) =>{
                router.push('/user/' + id)
            }
    
            return{goToUser,contactData}
        }
    }
    
    
    </script>
    
    <style>
    
    .allUserListInfo{
        border: solid;
        border-radius: 49px;
        width: 21rem;
        height: 5rem;
        margin: 1rem 0rem;
        background: mediumaquamarine;
    }
    
    .allUserList :hover{
        background-color: aqua;
    }
    
    .allUserListInfo h4{
        width: 13rem;
        height: 0rem;
        margin-bottom: 1.5rem;
    }
    
    </style>