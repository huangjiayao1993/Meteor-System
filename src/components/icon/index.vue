<template>
  <a-popover :trigger="trigger" v-model:visible="visible">
    <template #content>
      <div class="icon-box">
        <div v-for="(item,index) in iconList" :key="index" @click="handleClick(item)" class="icon-content" :style="{ background: icon === item ? '#268961' : ''}">
          <component :is="$antIcons[item]" />
        </div>
      </div>
    </template>
    <slot name="iconSelect" ></slot>
  </a-popover>
</template>

<script lang="ts">
import {defineComponent,ref,watch} from 'vue'
import icons from './icons'

export default defineComponent({
  name: "IconPicker",
  props:{
    icon:{
      type:String,
      required:true
    },
    trigger:{
      type:String,
      default: 'click',
      validator: function(value) {
        return ['click', 'hover', 'focus'].indexOf(value) !== -1
      }
    }
  },
  setup(props,context){
    const iconList = ref<string[]>(icons)
    const visible = ref<boolean>(false)

    const handleClick = (icon)=>{
      context.emit('update:icon',icon)
      visible.value = false;
    }

    watch(visible,()=>{
      iconList.value = icons;
    })

    return{
      visible,
      iconList,
      handleClick,
    }
  }
})
</script>

<style scoped>
.icon-box{
  overflow: auto;
  font-size: 20px;
  width: 250px;
  height: 230px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: flex-start;
  justify-content: center;
}

.icon-content{
  width: 45px;
  height: 40px;
  margin:  5px;
  cursor: pointer;
  text-align: center;
  border-radius: 6px;
  border: 1px solid #ccc
}

.icon-content:hover{
  background: #1890ff;
}
</style>
