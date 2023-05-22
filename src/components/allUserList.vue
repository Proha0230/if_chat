<template>
<div class="allUserListMain">
    <div class="allUserList">
        <div class="allUserListInfo" v-for="user in userData" :key="user" @click="goToUser(user.userID)">
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


export default{
    setup(){

        const userData = ref()
        const router = useRouter()

        const getAllUserList = async ()=>{
            const {data} = await axios.get(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/.json`)
            userData.value = data
        }

        getAllUserList()
        
        const goToUser= (id) =>{
            router.push('/user/' + id)
        }

        return{userData, goToUser}
    }
}


</script>

<style>

.allUserListInfo{
    cursor: pointer;
    border: solid;
    border-radius: 49px;
    width: 21rem;
    height: 5rem;
    margin: 1rem 0rem;
    background: mediumaquamarine;
}

.allUserListInfo h4{
    width: 20rem;
    height: 0rem;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
}

.allUserListMain{
    width: -webkit-fill-available;
    max-width: 26rem;
    height: 43rem;
    background-image: url(../assets/backgroundAllUser.jpg);
    padding-top: 0.5rem;
    background-repeat: round;
}

</style>