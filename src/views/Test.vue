<template>
  <div class="test">
    <div>
      平均值: {{average}}
    </div>
    <button @click="update">加载更多</button>
    <div class="list" v-for="item in dataList" :key="item.id">
      <div class="normal">{{item.id}}</div>
      <div class="normal">{{item.data}}</div>
      <div class="time">{{item.time}}</div>
    </div>
    <div class="loading" v-show="loading">
      <div class="loading-icon"></div>
    </div>
    
  </div>
</template>

<script>
import mockGenerator from '@/mock'
export default {
  name: 'test',
  data () {
    return {
      loading:false,
      dataList: [],
      average: 0
    }
  },
  created(){
    this.init()
  },
  computed: {

  },
  methods: {
    init(){
      this.loading = true
      mockGenerator(Promise.resolved).then((v)=>{
        if(v.length){
          this.dataList = v;
          this.count()
          this.loading = false;
        }
      })
    },
    update () {
      this.loading = true
      mockGenerator(Promise.resolved).then((v)=>{
        if(v.length){
          v.forEach(a=>{
            a.id = this.dataList.length;
            this.dataList.push(a)
          })
          this.count()
          this.loading = false;
        }
      })
    },
    count(){
      this.totalN = 0
      this.average = 0;
      this.dataList.forEach(m=>{
        this.totalN +=m.data
      })
      this.average = (this.totalN/this.dataList.length).toFixed(2)
      this.$store.commit('getAverage',this.average)
      this.$store.commit('getData',this.dataList)
      console.log(this.$store.state.dataList)
      console.log(this.$store.state.average)
    }
  }
}
</script>

<style scoped lang="less">
.test{

  .list{
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
    .normal {
      padding:5px 0;
      width:50%;
    }
    .time {
      width:100%;
    }
  }
  button{
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: blue;
    padding: 10px;
    font-size: 15px;
    color: white;
    width: 100%;
  }
}
  .loading {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.26);
    z-index: 100;
  }
  .loading-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -18px;
    margin-top: -18px;
    height: 36px;
    width: 36px;
    box-sizing: border-box;
    border: 4px solid transparent;
    border-color: blue transparent blue blue;
    border-radius: 50%;
    animation: rotate 0.8s infinite linear;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
