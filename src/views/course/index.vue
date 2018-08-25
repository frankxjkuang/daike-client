<template>
  <div class="course">
    <van-tabs @click="onChangeTab">
      <van-tab v-for="tab in tabs" :title="tab.title" :key="tab.name">
        <van-card @click.native="showDetail(course)" v-for="course in courses" :key="course.id" :thumb="course.publisherHeader">
          <div class="title" slot="title">
            课程名称：{{course.courseName}} <br />
          </div>
          <div class="desc" slot="desc">
            上课时间：{{course.courseTime}} <br /> 上课地点：{{course.coursePlace}} - {{course.courseClass}} <br /> 赏金：¥ {{course.reward ? course.reward : 0}}<br />
          </div>
        </van-card>
      </van-tab>
    </van-tabs>

    <van-popup v-model="isShowDetail" position="bottom" :overlay="true">
      <van-row class="row" type="flex" align="center">
        <van-col span="5" offset="1">
          学校：
        </van-col>
        <van-col span="10">
          {{course.school}}
        </van-col>
      </van-row>

      <van-row class="row" type="flex" align="center">
        <van-col span="5" offset="1">
          课程名称：
        </van-col>
        <van-col span="10">
          {{course.courseName}}
        </van-col>
      </van-row>

      <van-row v-show="course.hasReward" class="row" type="flex" align="center">
        <van-col span="5" offset="1">
          赏金：
        </van-col>
        <van-col span="10">
          ¥ {{course.reward}}
        </van-col>
      </van-row>

      <van-row v-show="course.hasName" class="row" type="flex" align="center">
        <van-col span="5" offset="1">
          发布者：
        </van-col>
        <van-col span="10">
          {{course.publisherName}}
        </van-col>
      </van-row>

      <van-row v-show="course.receiverName" class="row" type="flex" align="center">
        <van-col span="5" offset="1">
          代课人：
        </van-col>
        <van-col span="10">
          {{course.receiverName}}
        </van-col>
      </van-row>

      <van-row class="row" type="flex" align="center">
        <van-col span="5" offset="1">
          上课时间：
        </van-col>
        <van-col span="10">
          {{course.courseTime}}
        </van-col>
      </van-row>

      <van-row class="row" type="flex" align="center">
        <van-col span="5" offset="1">
          上课讲次：
        </van-col>
        <van-col span="10">
          {{course.courseClass}}
        </van-col>
      </van-row>

      <van-row class="row" type="flex" align="center">
        <van-col span="5" offset="1">
          上课地点：
        </van-col>
        <van-col span="10">
          {{course.coursePlace}}
        </van-col>
      </van-row>

      <van-row v-show="course.hasStuId" class="row" type="flex" align="center">
        <van-col span="5" offset="1">
          学号：
        </van-col>
        <van-col span="10">
          {{course.studentId}}
        </van-col>
      </van-row>

      <van-row class="row" type="flex" align="center">
        <van-col span="5" offset="1">
          发布时间：
        </van-col>
        <van-col span="10">
          {{course.publishTime}}
        </van-col>
      </van-row>

      <van-row v-show="course.closeTime" class="row" type="flex" align="center">
        <van-col span="5" offset="1">
          关闭时间：
        </van-col>
        <van-col span="10">
          {{course.closeTime}}
        </van-col>
      </van-row>

      <van-row v-show="course.hasPhone" class="row" type="flex" align="center">
        <van-col span="5" offset="1">
          联系电话：
        </van-col>
        <van-col span="10">
          {{course.phone}}
        </van-col>
      </van-row>

      <van-row v-show="course.remark" class="row" type="flex">
        <van-col span="5" offset="1">
          备注：
        </van-col>
        <van-col span="17">
          {{course.remark}}
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      tabs: [
        {
          title: "我发布的",
          type: "publish"
        },
        {
          title: "我代课的",
          type: "substitute"
        },
        {
          title: "我收藏的",
          type: "collect"
        }
      ],
      courses: "",
      course: "",
      isShowDetail: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.mine.user
    })
  },
  methods: {
    onChangeTab(index) {
      const userId = this.user.userId;
      const type = this.tabs[index].type;
      this.getCourseByType(userId, type);
    },
    getCourseByType(userId, type) {
      this.$http
        .getCourseByType({
          userId,
          type
        })
        .then(res => {
          this.courses = res.data;
        });
    },
    showDetail(course) {
      this.isShowDetail = true;
      this.course = course;
    }
  },
  mounted() {
    this.getCourseByType(this.user.userId, "publish");
  }
};
</script>

<style lang="scss" scoped>
.course /deep/ .van-tabs__content {
  height: calc(100vh - 94px);
  overflow: auto;
}

.row {
  font-size: 14px;
  margin: 10px;
}

.title {
  font-size: 14px;
}

.desc {
  font-size: 12px;
}
</style>