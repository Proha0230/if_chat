<template>
    <div >
        <div class="userMain" >
            <div class="userImg">
                <img :src="imgUser ?? 'https://i.ibb.co/dMqXwmP/no-image.jpg' " alt="Изображения нет"/>
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
    import { ref as refStorage, getStorage, getDownloadURL } from 'firebase/storage'
    import { useRoute, useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import axios from 'axios'
    
    export default{
        setup(){
    
        const route = useRoute()
        const store = useStore()
        const router = useRouter()
        const userId = ref(route.params.userId)

        const storage = getStorage()
        const storageRef = refStorage(storage, `/avatar/${userId.value}`)

        const imgUser = ref()
        const name = ref()
        const status = ref()
        const info = ref()
    
        const goBack = ()=>{
        router.push('/contactBook')
        }
    
        const LoadOnePlayer = async ()=> {
        try{
        const {data} = await axios.get(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${userId.value}.json`)
        name.value = data.name
        status.value = data.status
        info.value = data.info
        } catch(e){
            console.log(e)
        }
        }

        const getImage = async () => {
        try{
            imgUser.value = await getDownloadURL(storageRef)
        } catch(e){
            imgUser.value = 'https://i.ibb.co/dMqXwmP/no-image.jpg'
        }
        // .then((url)=>{
        //     imgDataServer.value = url
        // })
        // .catch(()=>{
        //     imgDataServer.value = 'https://i.ibb.co/dMqXwmP/no-image.jpg' 
        // })
        };

        getImage()

        LoadOnePlayer()
    
            return{imgUser, name, status, info, goBack}
        }
    }
    
    </script>