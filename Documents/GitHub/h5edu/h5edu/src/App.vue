<template slop-scope="appview">
  <Row>
    <!-- <i-col :xs="2" :sm="4" :md="6" :lg="8">Col</i-col>
    <i-col :xs="20" :sm="16" :md="12" :lg="8">Col</i-col>
    <i-col :xs="2" :sm="4" :md="6" :lg="8">Col</i-col>适配-->
    <div id="app">
      <router-view/>
      <div>
        <i-col :xs="24" :sm="24" :md="24" :lg="24">
          <h1 style="margin:0;">小象冬令营</h1>
          <a style="font-size:18px;">Sunrise Club 2019</a>
        </i-col>
      </div>
      <div class="checkbox">
        <form>
          <mt-field
            ref="getname"
            label="孩子姓名:"
            style="padding:0 30px;"
            placeholder
            type="name"
            v-model="username"
          ></mt-field>
          <mt-field
            ref="getschool"
            label="当前学校:"
            style="padding:0 30px;"
            placeholder
            type="school"
            v-model="school"
          ></mt-field>
          <i-col :xs="24" :sm="24" :md="24" :lg="24" style="min-height48px;line-height:48px;">
            <i-col :xs="9" :sm="3" :md="4" :lg="4">
              <label class="agelimit">请选择年级:</label>
            </i-col>
            <i-col :xs="12" :sm="20" :md="20" :lg="20">
              <i-select
                :model.sync="model1"
                :label-in-value="true"
                placeholder="请选择年级"
                @on-change="getGradeValue"
              >
                <i-option v-for="item in cityList" :key="item" :value="item.value">{{ item.label }}</i-option>
              </i-select>
            </i-col>
          </i-col>
          <i-col :xs="24" :sm="24" :md="24" :lg="24" style="min-height48px;line-height:48px;">
            <i-col :xs="9" :sm="3" :md="4" :lg="4">
              <label class="agelimit">选择冬令营卡:</label>
            </i-col>
            <i-col :xs="12" :sm="20" :md·="20" :lg="20">
              <i-select
                :model.sync="model2"
                label-in-value="true"
                placeholder="请选择购买的课程"
                @on-change="getCardValue"
              >
                <i-option v-for="item in priceList" :key="item" :value="item.value">{{ item.label }}</i-option>
              </i-select>
            </i-col>
          </i-col>
          <i-col :xs="24" :sm="24" :md="24" :lg="24" style="padding-right:3rem;">
            <label class="notice">可任选1个开营日参加</label>
          </i-col>
          <i-col :xs="24" :sm="24" :md="24" :lg="24" style="min-height48px;line-height:48px;">
            <i-col :xs="9" :sm="3" :md="4" :lg="4">
              <label class="agelimit">选择冬令营点:</label>
            </i-col>
            <i-col :xs="15" :sm="20" :md="20" :lg="20">
              <checkbox></checkbox>
            </i-col>
          </i-col>
        </form>
      </div>
      <mt-button size="large" type="primary" style="position:fixed;bottom:0;" @click="submit">报名</mt-button>
    </div>
  </Row>
</template>


<script>
import Linkage from "./components/picker";
import checkbox from "./components/checkbox";
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      cityList: [
        {
          value: "six",
          label: "六年级"
        },
        {
          value: "five",
          label: "五年级"
        },
        {
          value: "four",
          label: "四年级"
        },
        {
          value: "three",
          label: "三年级"
        },
        {
          value: "two",
          label: "二年级"
        },
        {
          value: "one",
          label: "一年级"
        },
        {
          value: "bigger",
          label: "大班年级"
        }
      ],
      priceList: [
        {
          value: "400",
          label: "单日卡 - ¥400/人"
        },
        {
          value: "1980",
          label: "六日卡 - ¥1980/人"
        },
        {
          value: "2980",
          label: "十日卡 - ¥2980/人"
        },
        {
          value: "3680",
          label: "全通卡 - ¥3680/人"
        }
      ],
      selectedOption: { cityCode: 0, city: "六年级" },
      showLinkage: false, //控制子组件的显示隐藏
      result: "请选择",
      id: "",
      selectgrade: "",
      selectcard: ""
    };
  },
  components: {
    Linkage, //注册子组件
    checkbox
  },
  methods: {
    _showChildMsg(msg) {
      this.result = msg.name;
      console.log(msg.name);
      this.id = msg.id;
      this.showLinkage = false;
    },

    getGradeValue(e) {
      this.selectgrade = e.value;
    },
    getCardValue(e) {
      this.selectcard = e.value;
    },
    getItemName(val) {
      this.model2 = val.label;
    },
    matchName(name) {
      var namereg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
      if (name === undefined) {
        return false;
      } else if (!namereg.test(name)) {
        return false;
      } else {
        return true;
      }
    },
    matchTel(tel) {
      var telreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (tel === undefined) {
        return false;
      } else if (!telreg.test(tel)) {
        return false;
      } else {
        return true;
      }
    },
    submit() {
      var card = this.selectcard;
      var grade = this.selectgrade;
      var name = this.$refs.getname.currentValue;
      var school = this.$refs.getschool.currentValue;
      if (
        this.matchName(name) == true &&
        school != undefined &&
        grade != "" &&
        card != ""
      ) {
        window.location =
          "http://h5funedu.p8games.com/index.php?card=" +
          card +
          "&grade=" +
          grade +
          "&name=" +
          name +
          "&school=" +
          school;
        // axios
        //   .get("http://h5funedu.p8games.com/index.php", {
        //     params: {
        //       card: card,
        //       grade: grade,
        //       name: name,
        //       school: school
        //     }
        //   })
        //   .then(function(response) {
        //     console.log(response);
        //   })
        //   .catch(function(err) {
        //     console.log(err);
        //   });
      }
    },
    _showLinkage() {
      this.showLinkage = true;
    }
  }
};
</script>

<style>
.notice {
  float: right;
  font-size: 12rpx;
  color: #aeaeae;
}
.checkbox {
  /* height: 21em; */
}
.area {
  height: 60px;
  padding-left: 10px;
  line-height: 60px;
}
.gradeitem {
  width: 50%;
  padding-left: 30px;
  padding-top: 10px;
}
.gradeitemlabel {
  width: 30%;
}
.grade {
  width: 100%;
  height: 60px;
  line-height: 60px;
}
.gradebox {
  display: flex;
  min-height: 48px;
  line-height: 48px;
  padding: 0 30px;
}
.agevalue {
  right: 20px;
  float: right;
  width: 50%;
  height: 40px;
  padding-right: 10px;
  margin-top: 10px;
  line-height: 40px;
  /* bottom: 60px; */
  border-radius: 5px;
  box-shadow: 0 0 5px #ccc;
  position: relative;
}
select {
  /* border: none;
  outline: none; */
  width: 100%;
  height: 40px;
  font-size: 18px;
  line-height: 40px;
  /* appearance: none; */
  /* -webkit-appearance: none;
  -moz-appearance: none; */
  padding-left: 60px;
}
.agevalue:after {
  /* content: ""; */
  /* width: 14px;
  height: 8px; */
  /* background: url(img/xiala.) no-repeat center; */
  /* position: absolute; */
  /* right: 20px; */
  /* top: 45%; */
  pointer-events: none;
}

.getCity {
  font-size: 20px;
  width: 50%;
  float: right;
}
.agelimit {
  font-size: 16px;
  width: 50%;
}
.mint-button--primary {
  background-color: #04b431;
}

.cardtitle {
  width: 50%;
  float: left;
  line-height: 40px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.mint-cell-value {
  border-bottom: 1px solid #000;
  margin-left: 18px;
}

.mint-cell-wrapper {
  background-repeat: unset;
  /* padding-left: 40px; */
}
.mint-cell-wrapper {
  background-repeat: unset;
  /* padding: 0px 40px; */
}

.mint-field .mint-cell-title {
  width: auto;
}
#app {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
