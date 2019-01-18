<template>
  <div>
    <div class="mask" @click="_hideLinkage"></div>
    <div class="clearfix linkage" style="z-index:666;">
      <div class="province pickerWrapper">
        <mt-picker :slots="provinces" @change="onProvinceChange" value-key="name"></mt-picker>
      </div>
      <!-- <div class="city pickerWrapper">
        <mt-picker :slots="citys" @change="onCityChange" value-key="name"></mt-picker>
      </div>-->
      <!-- <div class="area pickerWrapper">
        <mt-picker :slots="areas" @change="onAreaChange" value-key="name"></mt-picker>
      </div>-->
    </div>
  </div>
</template>

<script>
import { CITY_DATA } from "../itemprice.js";
export default {
  computed: {
    result() {
      return {
        name: this.province.name,
        id: this.province.id
      };
    }
  },
  data() {
    return {
      province: {
        name: "单日卡",
        id: "510000"
      },
      maskFlag: false,
      city: {
        name: "",
        id: "1000"
      },
      area: {
        name: "",
        id: "1000"
      },
      flag: 0,
      provinces: [
        {
          flex: 1,
          values: this._getProvince(),
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: false,
          content: "",
          className: "right"
        }
      ],
      citys: [
        {
          flex: 1,
          values: this._getCity("单日卡"),
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: false,
          content: "",
          className: "slot2"
        }
      ],
      areas: [
        {
          flex: 1,
          values: this._getArea("单日qq卡", "单日卡"),
          className: "slot1",
          textAlign: "center"
        }
      ]
    };
  },
  methods: {
    _hideLinkage() {
      this.$emit("getLinkage", this.result); //触发父组件的getLinkage事件接收结果数据
    },
    onProvinceChange(picker, values) {
      // if (this.flag === 0) {
      //   return;
      // }
      let provinceIndex = picker.getSlotValue(0);
      this.province = provinceIndex;
      let city = this._getCity(provinceIndex.name);
      this.citys[0].values = city;
      this.city = city[0];
    },
    onCityChange(picker, values) {
      if (this.flag === 0) {
        return;
      }
      let cityIndex = picker.getSlotValue(0);
      this.city = cityIndex;
      let provinceIndex = this.province;
      let area = this._getArea(provinceIndex.name, cityIndex.name);
      this.areas[0].values = area;
      this.area = area[0];
    },
    onAreaChange(picker, values) {
      if (this.flag === 0) {
        this.flag = 1;
        return;
      }
      let areaIndex = picker.getSlotValue(0);
      this.area = areaIndex;
    },
    //得到省份数据
    _getProvince() {
      let province = [];
      CITY_DATA.forEach(function(item, index) {
        let obj = {};
        obj.id = item.id;
        obj.name = item.name;
        province.push(obj);
      });
      return province;
    },
    //根据省份得到城市数据
    _getCity(province) {
      let city = [];
      CITY_DATA.forEach((item, index) => {
        if (item.name === province) {
          item.city.forEach((item, index) => {
            let obj = {};
            obj.id = item.id;
            obj.name = item.name;
            city.push(obj);
            return;
          });
        }
      });
      return city;
    },
    //根据城市和省份得到区域数据
    _getArea(province, city) {
      let area = [];
      CITY_DATA.forEach((item, index) => {
        if (item.name === province) {
          item.city.forEach((item, index) => {
            if (item.name === city) {
              item.district.forEach(item => {
                let obj = {};
                obj.id = item.id;
                obj.name = item.name;
                area.push(obj);
                return;
              });
            }
          });
        }
      });
      if (area.length == 0) {
        area.push({
          name: "没有",
          id: "000000"
        });
      }
      return area;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.linkage {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
  left: 0;
  overflow: hidden;
}
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.pickerWrapper {
  width: 100%;
  float: left;
}
</style>