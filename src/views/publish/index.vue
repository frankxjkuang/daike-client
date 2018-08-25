<template>
  <div class="container">
    <van-row class="row tip" type="flex" align="center">
      <van-icon name="peer-pay"></van-icon>
      <span>发布你的代课信息，寻找帮太子读书的人...</span>
    </van-row>

    <van-row class="row tip" type="flex" align="center">
      <van-icon name="clock"></van-icon>
      <span>开课时间：</span>
      <span>{{pickDate || curriculaTime}}</span>
      <van-button @click="isShowTimePicker = !isShowTimePicker" size="small">{{isShowTimePicker ? '关闭设置' : '设置时间'}}</van-button>
    </van-row>

    <van-datetime-picker v-show="isShowTimePicker" :min-date="minDate" :maxDate="maxDate" v-model="currentDate" type="datetime" cancel-button-text=" " @confirm="confirmTime" />

    <van-cell-group>
      <van-field disabled required :value="publisher.school" placeholder="请输入学校名称" label="学校名" left-icon="wap-home" />
    </van-cell-group>

    <van-cell-group>
      <van-field required v-model="courseName" placeholder="请输入课程名称" label="课程名称" left-icon="sign" />
    </van-cell-group>

    <van-cell-group>
      <van-field required v-model="courseClass" placeholder="请输入第几讲课时" label="上课讲时" left-icon="pending-orders" />
    </van-cell-group>

    <van-cell-group>
      <van-field required v-model="coursePlace" placeholder="请输入上课地点" label="上课地点" left-icon="location" />
    </van-cell-group>

    <p class="tip-info">
      <van-icon name="question"></van-icon>
      <span>是否分享以下信息给代课人：</span>
    </p>

    <van-cell-group class="checkbox">
      <van-field v-model="publisher.userName" placeholder="请输入姓名" label="姓名" left-icon="contact" />
      <van-checkbox v-model="hasName" />
    </van-cell-group>

    <van-cell-group class="checkbox">
      <van-field v-model="publisher.studentId" placeholder="请输入学号" label="学号" left-icon="exchange" />
      <van-checkbox v-model="hasStuId" />
    </van-cell-group>

    <van-cell-group class="checkbox">
      <van-field type="tel" v-model="publisher.phone" placeholder="请输入电话号码" label="电话" left-icon="phone" />
      <van-checkbox v-model="hasPhone" />
    </van-cell-group>

    <van-cell-group class="checkbox">
      <van-field type="number" v-model="reward" placeholder="请输入代课赏金" label="赏金" left-icon="gold-coin" />
      <van-checkbox v-model="hasReward" />
    </van-cell-group>

    <van-cell-group class="remark">
      <van-field type="textarea" v-model="remark" placeholder="请输入备注信息" label="备注" left-icon="pending-orders" />
    </van-cell-group>

    <van-button class="btn-publish" @click="handlePublish" size="small">确认发布</van-button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      hasName: true,
      hasStuId: false,
      hasPhone: false,
      hasReward: false,
      remark: "", // 备注
      reward: "", // 赏金
      currentDate: new Date(),
      pickDate: "",
      isShowTimePicker: false,
      minDate: new Date(),
      maxDate: new Date(new Date().getFullYear() + 1, 6, 17),
      publisher: "",
      courseName: "", // 课程名称
      courseClass: "", // 上课讲时（exp: 上午第一讲）
      coursePlace: "" // 上课地点
    };
  },
  methods: {
    handlePublish() {
      if (!this.courseName || !this.courseClass || !this.coursePlace) {
        this.$toast("必要信息不能为空！");
        return;
      }

      let data = {
        status: "open",
        publisher: this.user.userId,
        publisherHeader: this.user.headerImg,
        schoolId: this.user.schoolId,
        school: this.user.school,
        publishTime: this.formatDateTime(new Date()),
        closeTime: "",
        remark: this.remark,
        receiver: "",
        receiverName: "",
        province: this.user.provinceId,
        college: this.publisher.college,
        major: this.publisher.major,
        courseName: this.courseName,
        courseTime: this.pickDate,
        courseClass: this.courseClass,
        coursePlace: this.coursePlace,
        publisherName: this.publisher.userName || "",
        studentId: this.publisher.studentId || "",
        phone: this.publisher.phone || "",
        reward: this.reward || 0,
        // 是否在课程信息中展示这些字段
        hasName: this.hasName,
        hasStuId: this.hasStuId,
        hasPhone: this.hasPhone,
        hasReward: this.hasReward
      };

      this.$http.publishCourse(data).then(res => {
        this.$toast.success("发布成功！");
      });
    },
    formatDateTime(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    },
    confirmTime(value) {
      this.pickDate = this.formatDateTime(value);
      this.isShowTimePicker = false;
    }
  },
  computed: {
    ...mapState({
      user: state => state.mine.user
    }),
    curriculaTime() {
      return this.formatDateTime(this.currentDate);
    }
  },
  mounted() {
    this.publisher = Object.assign({}, this.user);
    // 初始化开课时间
    this.pickDate = this.formatDateTime(this.currentDate);

    if (!this.user.schoolId) {
      this.$dialog
        .alert({
          message: "发布课程前，请先完善个人信息！"
        })
        .then(() => {
          this.$router.push("/home/mine");
        });
    }

    // if (!this.user.schoolId) {
    //   Toast('请先绑定学校！');
    // }
  }
};
</script>

<style lang="scss" scoped>
.tip {
  height: 40px;

  span {
    margin-left: 10px;
  }
}

.tip-info {
  line-height: 48px;
  display: flex;
  align-items: center;

  span {
    margin-left: 10px;
  }
}

.checkbox {
  display: flex;
  align-items: center;
  padding-right: 10px;

  /deep/ .van-checkbox {
    width: 23px;
  }
}

.remark {
  height: 120px;
}

.btn-publish {
  margin-top: 10px;
  float: right;
}
</style>

