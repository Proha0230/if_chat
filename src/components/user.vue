<template>
<div >
    <div class="userMain" >
        <div class="userImg">
            <img :src="img" alt="Изображения нет"/>
        </div>

        <div class="userNameMain">
            <div class="userName">
                <p>Имя:</p>
            </div>
            <h3>{{ name === '' ? 'Имя не задано' : name}}</h3>
        </div>

        <div class="userStatusMain">
            <div class="userStatus">
                <p>Статус:</p>
            </div>
            <h3>{{ status === '' ? 'Нет статуса' : status }}</h3>
        </div>

        <div class="userInfoMain">
            <div class="userInfo">
                <p>Информация:</p>
            </div>
            <h3>{{ info === '' ? 'Нет информации о вас' : info }}</h3>
        </div>

        <div>
            <button class="addInContact" @click="addContact"></button>
            <button class="writeMessage"></button>
        </div>
    </div>
</div>

</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'

export default{
    setup(){

    const route = useRoute()
    const store = useStore()
    const userId = ref(route.params.userId)
    const img = ref()
    const name = ref()
    const status = ref()
    const info = ref()

    const LoadOnePlayer = async ()=> {
    try{
    const {data} = await axios.get(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${userId.value}.json`)
    img.value = data.img
    name.value = data.name
    status.value = data.status
    info.value = data.info
    } catch(e){
        console.log(e)
    }
    }

    const addContact = async ()=> {
            try{
            const body = JSON.stringify({user: userId.value, added: true})
            await axios.post(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}/contactList.json`, body )
            } catch(e){
                console.log(e)
            }
        }

    LoadOnePlayer()

        return{img, name, status, info, addContact}
    }
}

</script>

<style>

.writeMessage{
    background-image: url(../assets/writeMessage.png);
    padding: 1.5rem;
    background-size: cover;
    background-color: mediumaquamarine;
    border-radius: 40px;
    margin-right: 1.5rem;
    max-height: 1rem;
    max-width: 1rem;
}

.addInContact{
    background-image: url(../assets/addContact.png);
    padding: 1.5rem;
    background-size: cover;
    background-color: mediumaquamarine;
    border-radius: 40px;
    margin-right: 1.5rem;
    max-height: 1rem;
    max-width: 1rem;
}

.userImg img{
    width: 10rem;
    height: 13rem;
    margin-top: 1rem;
    margin-left: 0rem;
    border-radius: 20px;
    border: solid;
    border-width: 0.3rem;
    border-color: mediumaquamarine;
    font-weight: bold;
}

.userImg{
    display: flex;
}

.userMain{
    max-width: 25rem;
}

.userNameMain{
    width: 11rem;
    margin-top: -14rem;
    margin-left: 10rem;
}

.userStatusMain{
    width: 12rem;
    margin-top: 4rem;
    margin-left: 9.3rem;
}

.userInfoMain{
    width: 20rem;
    margin-top: 3rem;
}


</style>