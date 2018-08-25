<template>
  <div>
    <van-nav-bar title="个人信息" left-text="返回" right-text="保存" left-arrow @click-left="back" @click-right="saveInfo" />

    <van-cell-group class="box">
      <van-field v-model="editInfo.userName" label-align="left" clearable label="姓名" icon="question" placeholder="请输入用户名" @click-icon="questionName" />

      <van-field v-model="editInfo.email" label-align="left" clearable label="邮箱" icon="question" placeholder="请输入邮箱" @click-icon="questionEmail" />

      <van-field v-model="editInfo.phone" label-align="left" clearable label="电话" placeholder="请输入电话" />

      <van-field v-model="editInfo.studentId" label-align="left" clearable label="学号" placeholder="请输入学号" />

      <van-field v-model="editInfo.school" required label-align="left" clearable label="学校" placeholder="请输入学校名称" @focus="showSchoolSearch" />

      <van-field v-model="editInfo.college" label-align="left" clearable label="学院" placeholder="请输入学院" />

      <van-field v-model="editInfo.major" label-align="left" clearable label="专业" placeholder="请输入专业" />

      <van-field v-model="editInfo.wechat" label-align="left" clearable label="微信" placeholder="请输入微信账号" />

      <van-field v-model="editInfo.qq" label-align="left" clearable label="QQ" placeholder="请输入QQ号" />
    </van-cell-group>

    <van-actionsheet v-model="isShowCelectSchool" title="输入学校名称查询">
      <van-search v-model="schoolName" placeholder="请输入学校名" show-action @search="onSearchSchool">
        <div slot="action" @click="onSearchSchool">搜索</div>
      </van-search>
      <ul class="school-list">
        <li v-for="(school, index) in schools" :key="index" @click="selectedSchool(school)">
          {{school.name}}
        </li>
      </ul>
    </van-actionsheet>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      editInfo: "",
      isShowCelectSchool: false,
      schoolName: "",
      schools: [
        // {
        //   id: "3505",
        //   name: "西南科技大学",
        //   website: "http://www.swust.edu.cn/",
        //   provinceId: 23,
        //   level: "本科",
        //   abbreviation: "swust",
        //   city: "绵阳市"
        // }
      ],
      school: ''
    };
  },
  mounted() {
    this.editInfo = Object.assign({}, this.user);
  },
  computed: {
    ...mapState({
      user: state => state.mine.user
    })
  },
  methods: {
    ...mapMutations(['SET_USER']),
    back() {
      this.$emit("toggleEditPopup", false);
    },
    saveInfo() {
      if (!this.user.userId) {
        this.$toast("请先登录！");
        return
      }

      if (!this.editInfo.schoolId) {
        this.$toast("必填信息不能为空！");
      }

      const user = Object.assign(
        {}, 
        this.editInfo, 
        this.user
      )

      this.$http.updateUser(user).then(res => {
        this.SET_USER(user);
        this.$toast(res.msg);
      })
    },
    questionName() {
      this.$toast("上课点名可能用到哦！");
    },
    questionEmail() {
      this.$toast("课后作业发放需要联系你哦！");
    },
    showSchoolSearch() {
      this.isShowCelectSchool = true;
    },
    onSearchSchool() {
      this.$http.searchSchoolByName({
        schoolName: this.schoolName
      }).then(res => {
        this.schools = res.data;
      });
    },
    selectedSchool(school) {
      this.editInfo.school = school.name;
      this.editInfo.schoolId = school.id;
      this.editInfo.provinceId = school.provinceId;
      this.school = school;
    }
  }
};
</script>

<style lang="scss" scoped>
.school-list {
  min-height: 150px;
  max-height: 210px;
  overflow-y: scroll;

  li {
    line-height: 30px;
    padding: 0 14px;

    &:not(:last-child) {
      border-bottom: 1px solid #e9e9e9;
    }
  }
}
</style>


