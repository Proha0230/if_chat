<template>
  <div v-if="$store.state.loading">
    <h2>Загрузка</h2>
  </div>
  <mainPage></mainPage>
  
<div>
  <router-view/>
</div>

</template>


<script>
import mainPage from './views/mainPage.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { onBeforeUnmount } from 'vue';
import axios from 'axios';

export default{
  setup(){

    const store = useStore()
    const userChatId = ref()
    const AllListUser = ref()
    


    const getChatUserList = async ()=>{
    try{
        const {data} = await axios.get(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}/chat.json`)
      if(data !== null){
        userChatId.value = Object.keys(data)
        await getUserChat()
        await NewMessageID()
        store.state.loading = false
      } else {
        store.state.usersChatList = ''
        store.state.newMessageTrue = false
        store.state.loading = false
      }
    } catch (e){
        console.log(e)
    }
    }

    const getUserChat = async ()=>{
    try{
        const {data} = await axios.get(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/.json`)
        AllListUser.value =  Object.values(data).filter(userInAllData => userChatId.value.includes(userInAllData.userID)) 
        store.state.usersChatList = AllListUser.value
    } catch(e){}
    }

    const NewMessageID = async () => {
        try{

            for(let i = 0; i < userChatId.value.length; i++){
              const {data} = await axios.get(`https://if-chat-29cb0-default-rtdb.firebaseio.com/users/${store.state.userID}/chat/${userChatId.value[i]}/.json`)  
              if(Object.values(data).filter(user => user.newMessage === true).map(item => item.userID).length > 0 && !store.state.newMessageUser[i]){
                store.state.newMessageUser[i] = Object.values(data).filter(user => user.newMessage === true).map(item => item.userID)
                store.state.newMessageTrue = true
              }
            }
            for( let i = 0; i < store.state.newMessageUser.length; i++){
              store.state.newMessageUser[i] = store.state.newMessageUser[i].filter((value,index) => index === store.state.newMessageUser[i].indexOf(value))
              store.state.newMessageTrue = true
            }

        } catch (e){
          console.log(e)

        }
    }


    getChatUserList()

    store.state.loading = true

    const updateChatData =
        setInterval(()=>{
            getChatUserList()
        }, 10000)
        
    updateChatData

    onBeforeUnmount(()=>{
        clearInterval(updateChatData)
    })

    return{

    }
  },
  components:{mainPage}

}

</script>

<style>
#app{
  text-align: -webkit-center;
}
</style>
