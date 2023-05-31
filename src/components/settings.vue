<template>
<div >
    <div class="mainSettings" >

        <uploadImage>

        </uploadImage>


        <div class="editNameSettingsMain">
            <div class="editInfoSettings">
                <p>Ваше имя:</p>
                <button class="editNameButtonSettings" @click="ButtonNameEdit = !ButtonNameEdit"></button>
            </div>
            <h3>{{ name ?? 'Имя не задано'}}</h3>
        </div>

        <form class="formEditName" v-if="ButtonNameEdit" @submit.prevent="nameEditChange">
            <input type="text" placeholder="Введите новое имя" v-model="nameEdit" maxlength="13">
            <button>Изменить</button>
        </form>

        <div class="editStatusSettingsMain">
            <div class="editInfoSettings">
                <p>Ваш Статус:</p>
                <button class="editStatusButtonSettings" @click="ButtonStatusEdit = !ButtonStatusEdit"></button>
            </div>
            <h3>{{ status ?? 'Нет статуса' }}</h3>
        </div>

        <form class="formEditStatus" v-if="ButtonStatusEdit" @submit.prevent="statusEditChange">
            <input type="text" placeholder="Введите ваш статус" v-model="statusEdit" maxlength="50" spellcheck="true">
            <button>Изменить</button>
        </form>

        <div class="editInfoSettingsMain Info">
            <div class="editInfoSettings">
                <p>Информация о вас:</p>
                <button class="editInfoButtonSettings" @click="ButtonInfoEdit = !ButtonInfoEdit"></button>
            </div>
            <h3>{{ info ?? 'Нет информации'}}</h3>
        </div>

        <form class="formEditInfo" v-if="ButtonInfoEdit" @submit.prevent="InfoEditChange">
            <input type="text" placeholder="Введите информацию о себе" v-model="infoEdit" maxlength="50" spellcheck="true">
            <button>Изменить</button>
        </form>

    </div>
</div>

</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import uploadImage from './uploadImage.vue';

export default{

    setup(){

        const ButtonNameEdit = ref(false)
        const ButtonInfoEdit = ref(false)
        const ButtonStatusEdit = ref(false)
        const store = useStore()
        const nameEdit = ref()
        const statusEdit = ref()
        const infoEdit = ref()
        const name = ref(store.state.userName)
        const status = ref(store.state.userStatus)
        const info = ref(store.state.userInfo)


        const nameEditChange = async ()=> {
            try{
            const body = JSON.stringify({name: nameEdit.value ?? 'Имя не задано'})
            await axios.patch(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}.json`, body )
            name.value = nameEdit.value ?? 'Имя не задано'
            store.state.userName = nameEdit.value ?? 'Имя не задано'
            ButtonNameEdit.value = false
            } catch(e){
                console.log(e)
            }
        }


        const statusEditChange = async ()=> {
            try{
                const body = JSON.stringify({status: statusEdit.value ?? 'Нет статуса'})
                await axios.patch(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}.json`, body )
                status.value = statusEdit.value ?? 'Нет статуса'
                store.state.userStatus = statusEdit.value ?? 'Нет статуса'
                ButtonStatusEdit.value = false
            } catch(e){
                console.log(e)
            }
        }

        const InfoEditChange = async ()=> {
            try{
                const body = JSON.stringify({info: infoEdit.value ?? 'Нет информации'})
                await axios.patch(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}.json`, body )
                info.value = infoEdit.value ?? 'Нет информации'
                store.state.userInfo = infoEdit.value ?? 'Нет информации'
                ButtonInfoEdit.value = false
            } catch(e) {
                console.log(e)
            }
        }



        return{ButtonNameEdit, ButtonInfoEdit, ButtonStatusEdit, name, status, info, nameEdit, statusEdit, infoEdit, nameEditChange, statusEditChange, InfoEditChange}
    },
    components:{uploadImage}
}

</script>

<style>

.editStatusButtonSettings{
    cursor: pointer;
    background-image: url(../assets/edit.png);
    padding: 1rem;
    background-size: cover;
    background-color: mediumaquamarine;
    margin-left: 0.5rem;
    border-radius: 20px;
    max-width: 1rem;
    max-height: 1rem;
    margin-top: 1rem;
}

.editNameButtonSettings{
    cursor: pointer;
    background-image: url(../assets/edit.png);
    padding: 1rem;
    background-size: cover;
    background-color: mediumaquamarine;
    margin-left: 0.5rem;
    border-radius: 20px;
    max-width: 1rem;
    max-height: 1rem;
    margin-top: 1rem;
}

.editInfoButtonSettings{
    cursor: pointer;
    background-image: url(../assets/edit.png);
    padding: 1rem;
    background-size: cover;
    background-color: mediumaquamarine;
    margin-left: 0.5rem;
    margin-top: 1.5rem;
    border-radius: 20px;
    max-width: 1rem;
    max-height: 1rem;
}


.editImgButtonSettings{
    cursor: pointer;
    background-image: url(../assets/edit.png);
    padding: 1rem;
    background-size: cover;
    background-color: mediumaquamarine;
    margin-top: 0.5rem;
    border-radius: 20px;
    max-width: 1rem;
    max-height: 1rem;
}

.imgSettings img{
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

.imgSettings{
    display: flex;
}

.mainSettings{
    width: -webkit-fill-available;
    max-width: 26rem;
    height: 43rem;
    background-image: url(../assets/backgroundAllUser.jpg);
    padding-top: 0.5rem;
    background-repeat: round;
}

.formImgUpdate{
    margin-left: 11rem;
    max-width: 13rem;
    margin-top: -10.5rem;
    margin-bottom: 14rem;
}

.formImgUpdate input{
    cursor: pointer;
    width: 9.3rem;
    height: 1.5rem;
    border-radius: 2rem;
    margin-bottom: 1rem;
    border: solid;
    padding: 0.5rem;
    border-color: mediumaquamarine;
    font-size: 1rem;
    background-color: beige;
}

.formImgUpdate input[type="file"]::-webkit-file-upload-button {
    visibility: hidden;
}

.formImgUpdate input[type="file"]::before {
    content: 'Выберите файл';
    display: inline-block;
    color: black;
    font-size: 1.1rem;
    cursor: pointer;
    text-indent: 0.5rem;
}


.formImgUpdate button{
    border-radius: 20px;
    padding: 0.5rem;
    background-color: mediumaquamarine;
    margin-top: 1rem;
}


.editNameSettingsMain{
    width: 11rem;
    margin-top: -13rem;
    margin-left: 10rem;
}

.editNameSettingsMain  p {
    margin-bottom: -0.5rem;
}

.formEditName{
    margin-left: 11rem;
    max-width: 13rem;
}

.formEditName button{
    border-radius: 20px;
    padding: 0.5rem;
    background-color: mediumaquamarine;
}

.formEditName input{
    width: 11rem;
    border-radius: 6px;
    margin-bottom: 1rem;
}


.editStatusSettingsMain{
    width: 12rem;
    margin-top: 2rem;
    margin-left: 9.3rem;
}

.editStatusSettingsMain  p {
    margin-bottom: -0.5rem;
}

.formEditStatus{
    margin-left: 11rem;
    max-width: 13rem;
    margin-bottom: 1rem;
}

.formEditStatus button{
    border-radius: 20px;
    padding: 0.5rem;
    background-color: mediumaquamarine;
}

.formEditStatus input{
    width: 11rem;
    border-radius: 6px;
    margin-bottom: 1rem;
}


.formEditInfo input{
    width: 11rem;
    border-radius: 6px;
    margin-bottom: 1rem;
}

.formEditInfo{
    max-width: 13rem;
}


.formEditInfo button{
    border-radius: 20px;
    padding: 0.5rem;
    background-color: mediumaquamarine;
}

.editInfoSettingsMain .Info{
    margin-top: 2rem;
}

.editInfoSettingsMain{
    width: 15rem;
}

.editInfoSettingsMain  p {
    margin-bottom: -0.5rem;
}

.editInfoSettings{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 3rem;
}


</style>