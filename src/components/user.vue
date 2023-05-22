<template>
<div >
    <div class="userMain" >
        <div class="contactAdded" v-if="$store.state.idRecordContactInDB">
            <h2>Вы добавили {{ name }} в контакты</h2>
        </div>
        <div class="userImg">
            <img :src="img ?? 'https://i.ibb.co/dMqXwmP/no-image.jpg' " alt="Изображения нет"/>
        </div>

        <div class="userNameMain">
            <div class="userName">
                <p>Имя:</p>
            </div>
            <h3>{{ name ?? 'Имя не задано'}}</h3>
        </div>

        <div class="userStatusMain">
            <div class="userStatus">
                <p>Статус:</p>
            </div>
            <h3>{{ status ?? 'Нет статуса'}}</h3>
        </div>

        <div class="userInfoMain">
            <div class="userInfo">
                <p>Информация:</p>
            </div>
            <h3>{{ info ?? 'Нет информации'}}</h3>
        </div>

        <div>
            <button class="addInContact" @click="addContact"></button>
            <button class="goBackButton" @click="goBack"></button>
        </div>
    </div>
</div>

</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'

export default{
    setup(){

    const route = useRoute()
    const store = useStore()
    const router = useRouter()
    const userId = ref(route.params.userId)
    const img = ref()
    const name = ref()
    const status = ref()
    const info = ref()

    const goBack = ()=>{
    router.push('/allUserList')
    }

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
            const body = JSON.stringify({
                writeMessage: false,
                userID: userId.value, 
                img: img.value,
                name: name.value,
                status: status.value,
                info: info.value
                })
            const {data} = await axios.post(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}/contactList.json`, body )
            store.state.idRecordContactInDB = data.name

            const idInDB = JSON.stringify({idRecordContactInBD: store.state.idRecordContactInDB})
            await axios.patch(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}/contactList/${store.state.idRecordContactInDB}.json`, idInDB )

            setTimeout(()=>{
                store.state.idRecordContactInDB = null
            }, 2000)
        } catch (e) {
            console.log(e)
        }
        }


    LoadOnePlayer()

        return{img, name, status, info, addContact, goBack}
    }
}

</script>

<style>

.contactAdded{
    border: solid;
    border-radius: 30px;
    margin-top: 0.25rem;
    margin-bottom: -0.7rem;
    background-color: mediumaquamarine;
}

.addInContact{
    cursor: pointer;
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
    margin-left: 0.5rem;
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
    width: -webkit-fill-available;
    max-width: 26rem;
    height: 43rem;
    background-image: url(../assets/backgroundAllUser.jpg);
    padding-top: 0.5rem;
    background-repeat: round;
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