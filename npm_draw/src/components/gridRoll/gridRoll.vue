<template>
  <div class="gridRoll">
    <div class="banner"></div>
    <grid-roll ref="dial" xy="3*3" class="roulette" v-if="isGetPrizeList">
      <grid-start slot="button">
        <div @click="getPrizeRaffle" class="raffle" v-if="!isRafflePending">
          <span>剩余{{ usableNum }}次</span>
        </div>
        <div class="raffle" v-else>
          <span>剩余{{ usableNum }}次</span>
        </div>
      </grid-start>
      <grid-prize
        v-for="(item, index) in dataList"
        :key="index"
        :pid="item.id"
        slot="prize"
      >
        <template slot-scope="{ isSelect }">
          <div class="list" :class="isSelect ? 'select' : ''">
            <img :src="item.imgUrl" />
            <p v-if="item.id !== 5">{{ item.name }}</p>
          </div>
        </template>
      </grid-prize>
    </grid-roll>
  </div>
</template>

<script>
//源码地址:https://github.com/hengshanMWC/grid-roll
import { gridRoll, gridStart, gridPrize } from "grid-roll";
export default {
  name: "gridRoll",
  data() {
    return {
      dataList: [], //抽奖列表
      isRafflePending: false, //是否在抽奖中
      isGetPrizeList: false, //是否获取完抽奖列表
    };
  },
  props: {
    //抽奖方法
    luckDraw: {
      type: Function,
      required: true,
      default: null
    },
    //中奖礼品ID
    prizeId: {
      type: [Number, String],
      required: true,
      default: ""
    },
    //获取奖品列表
    getPrizeList: {
      type: Function,
      required: true,
      default: null
    },
    //获取用户抽奖次数
    usableNum: {
      type: Number,
      required: true,
      default: 0
    }
  },
  methods: {
    /**
     * [getPrizeRaffle 抽奖]
     *
     * @return  {[type]}  [return description]
     */
    getPrizeRaffle() {
      if (this.isRafflePending) {
        return;
      }
      this.isRafflePending = true;
      this.luckDraw()
        .then(async res => {
          await this.$refs.dial.startRoll(this.prizeId); //转动结束后的抽奖结果
          this.isRafflePending = false;
          this.$emit("getResult", res.data);
        })
        .catch(err => {
          this.isRafflePending = false;
          this.$emit("getResultErr", err);
        });
    },
    /**
     * [getPrizeList 获取奖品列表]
     *
     * @return  {[type]}  [return description]
     */
    getPrizeListFn() {
      this.getPrizeList().then(data => {
        this.isGetPrizeList = true;
        this.dataList = data;
      });
    }
  },
  mounted() {
    this.getPrizeListFn();
  },
  components: {
    [gridRoll.name]: gridRoll,
    [gridStart.name]: gridStart,
    [gridPrize.name]: gridPrize
  },
};
</script>
<style lang="scss" scoped>
.gridRoll {
  width: 6.3rem;
  height: 6.3rem;
  border-radius: 0.5rem;
  // background: #a8ddff;
  background: url("~@/base/img/app/bg.png") no-repeat center;
  background-size: 100% 100%;
  position: fixed;
  top: 51%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 0.99rem;
  .roulette {
    width: 5.2rem;
    height: 5.2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .banner {
    background: #450199;
    width: 5.52rem;
    height: 5.52rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.3rem;
  }
}
::v-deep .gr-prize {
  width: 1.73rem;
  height: 1.73rem;
  z-index: 1;
  display: inline-block;
  position: absolute;
}
::v-deep .select {
  opacity: 0.4;
}
::v-deep .gr-prize .list {
  background: #fff;
  border-radius: 0.2rem;
  width: 1.63rem;
  height: 1.63rem;
  margin: 0 auto;
  box-shadow: inset #f1f1f1 0 -0.4em 0.3em;
  position: relative;
  padding-top: 1.2rem;
  box-sizing: border-box;
}
::v-deep .gr-prize img {
  // width: 0.7rem;
  // height: 0.7rem;
  display: block;
  width: 1.63rem;
  height: 1.63rem;
  position: absolute;
  left: 0;
  bottom: 0;
  // margin: 0.1rem auto;
  // padding-top: 0.15rem;
}
::v-deep .gr-prize p {
  font-size: 0.12rem;
  color: #3e2c2a;
  text-align: center;
  line-height: 0.25rem;
  position: relative;
  z-index: 1;
  // position: absolute;
  // bottom: 50%;
  // left: 50%;
}
::v-deep .gr {
  position: relative;
}
::v-deep .gp-start .raffle {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  // background: linear-gradient(#fe7e7e, #e03a3a);
  background: url("~@/base/img/app/go.png") no-repeat center;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border-radius: 0.2rem;
  color: #fff;
  font-size: 0.38rem;
  width: 1.5rem;
  height: 1.5rem;
  box-shadow: inset #d13535 0 -0.4em 0.3em;
  span {
    color: #ff6f1b;
    font-size: 0.2rem;
    margin-bottom: 0.28rem;
  }
}
::v-deep .gp-start .item {
  border-radius: 10px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
