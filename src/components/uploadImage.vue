<template>

<div class="imgSettings">
    <img :src="imgDataServer  ?? 'https://i.ibb.co/dMqXwmP/no-image.jpg' " alt="Изображения нет"/>
    <button class="editImgButtonSettings" @click="ButtonImgEdit = !ButtonImgEdit"></button>
</div>

<div class="formImgUpdate" v-if="ButtonImgEdit">
    <input type="file" @change="imgAdd"/>
    <button @click="imgPostToServe">Изменить</button>
</div>

</template>

<script>
import { ref as refStorage, uploadBytes, getStorage, getDownloadURL } from 'firebase/storage'
import { useStore } from 'vuex'
import { ref } from 'vue'

export default{
    setup(){

        const store = useStore()
        const storage = getStorage()
        const storageRef = refStorage(storage, `/avatar/${store.state.userID}`)
        const imgEdit = ref(null)
        const metadata = ref(null)
        const ButtonImgEdit = ref(false)
        const imgDataServer = ref(null)


        const imgPostToServe = async ()=>{
        try{
        await uploadBytes(storageRef, imgEdit.value, metadata.value)
        imgEdit.value = null
        metadata.value = null
        ButtonImgEdit.value = false
        await getImage()
        } catch(e){
        ButtonImgEdit.value = false
        }
        }

        const getImage = async () => {
        try{
        imgDataServer.value = await getDownloadURL(storageRef)
        } catch(e){
        imgDataServer.value = 'https://i.ibb.co/dMqXwmP/no-image.jpg'
        }
        // .then((url)=>{
        //     imgDataServer.value = url
        // })
        // .catch(()=>{
        //     imgDataServer.value = 'https://i.ibb.co/dMqXwmP/no-image.jpg' 
        // })
        };

        const imgAdd = async (event)=> {
            imgEdit.value = event.target.files[0]
            metadata.value = {
            name: `${imgEdit.value.name}`,
            size: `${imgEdit.value.size}`,
            contentType: `${imgEdit.value.type}`,        
            }
        }

        getImage()

        return{imgAdd, imgPostToServe, ButtonImgEdit, imgDataServer, getImage}
    }
}

</script>

<style>

</style>