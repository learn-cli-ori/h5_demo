<template>
    <div class="flex">
        <div class="flex"><span class="flex-1 ">取消</span><span>确定</span></div>
        <div>
             <pickerItem class="flex-1" :list="list" column-key="id"></pickerItem>
        </div>
       
    </div>
</template>
<script>
import pickerItem from './picker-item';
export default {
        components:{
            pickerItem
        },
        data(){
            return{
                list:[
                    {
                        "id":1,
                        "value":"一"
                    },
                    {
                        "id":1,
                        "value":"二"
                    }, {
                        "id":1,
                        "value":"三"
                    }, {
                        "id":1,
                        "value":"四"
                    },  {
                        "id":1,
                        "value":"二"
                    }, {
                        "id":1,
                        "value":"三"
                    }, {
                        "id":1,
                        "value":"四"
                    }
                ]
            }
        }
}
</script>
<style lang="scss" scoped>
