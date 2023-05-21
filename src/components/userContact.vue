<template>
    <div >
        <div class="userMain" >
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
        router.push('/contactBook')
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

        LoadOnePlayer()
    
            return{img, name, status, info, goBack}
        }
    }
    
    </script>