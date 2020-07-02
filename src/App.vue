<template>
  <a-layout id="app">
    <a-layout-header class="header flexrow">
      <h2>ky_study</h2>
      <div class="right flexrow" v-if="loggedIn">
        <div class="flexrow" v-if="isTeacher">
          <h4>{{info.name}}</h4>
          <a-button class="vcenter" icon="file-add" type="primary">新建作业</a-button>
        </div>
        <div class="flexrow" v-else>
          <h4 class="flexcol">
            <span>{{info.full_name}}</span>
            <span>学号: {{info.name}}</span>
          </h4>
          <h5 class="flexcol">
            <span v-for="(org,index) in student.orgs" :key="`${org}_${index}`">{{org}}</span>
          </h5>
          <div>
            <span class="label">{{ student.stats.uncommitted }}个作业待提交</span>
            <span class="label">{{ student.stats.revising }}个作业待批改</span>
            <span class="label">{{ student.stats.improvable }}个作业需完善</span>
            <span class="label">{{ student.stats.finished }}个作业已完成</span>
          </div>
        </div>
        <a class="vcenter" href="http://vipgit.chanke.xyz" target="_blank">
          <a-button icon="home" class="vcenter">代码仓库</a-button>
        </a>
        <a-button icon="logout" class="vcenter" @click="$store.dispatch('user/logout')">退出</a-button>
      </div>
    </a-layout-header>
    <a-layout-content>
      <author v-if="!loggedIn"></author>
      <div v-else>
        <Teacher v-if="isTeacher" :teacher="teacher"></Teacher>
        <Student v-else :student="student"></Student>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { mapState } from "vuex";
import { api } from "./utils/api";
import author from "./components/author";
import Student from "./components/Student";
import Teacher from "./components/Teacher";
export default {
  name: "app",
  data() {
    return {
      student: {
        orgs: [],
        assignments: [],
        stats: {}
      },
      teacher: {
        orgs: [],
        assignments: []
      }
    };
  },
  //刷新页面 执行钩子函数 刷新触发loadDetails
  created() {
    if (this.loggedIn) {
      this.loadDetails();
    }
  },
  computed: {
    //辅助函数mapState
    ...mapState("user", ["info", "loggedIn"]),

    //判断老师or学生账号登陆
    isTeacher() {
      return this.info.is_admin > 0;
    }
  },
  watch: {
    //监听loggedIn的值 true执行loadDetails
    loggedIn(val) {
      if (val) {
        this.loadDetails();
      }
    }
  },
  methods: {
    loadDetails() {
      //判断老师 or 学生登陆
      if (this.isTeacher) {
        api.get("/teacher/detail").then(data => {
          this.teacher.orgs = data.orgs;
          this.teacher.assignments = data.assignments;
        });
      } else {
        //发送请求 请求头传入token验证
        api.get("/student/detail").then(data => {
          //保存请求返回的数据
          this.student.orgs = data.orgs;
          this.student.assignments = data.assignments;
          this.student.stats = data.stats;
        });
      }
    }
  },
  components: {
    author,
    Teacher,
    Student
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}

.header {
  font-size: 1.1em;
  color: white;
  h2,
  h4,
  h5 {
    color: white;
  }
  .label {
    padding: 0 5px;
  }
}
// 水平方向
.flexrow {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
//垂直方向
.flexcol {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  height: 100%;
  span {
    flex: 1;
    max-height: 20px;
    line-height: 20px;
  }
}
.right {
  margin-left: auto;
}
.right > .flexrow > * {
  margin-right: 20px;
}
.vcenter {
  align-self: center;
}
</style>
