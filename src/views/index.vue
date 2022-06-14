<template>
  <el-container class="layout-container-demo" style="height: 650px; border: 1px solid #eee">
    <el-header style="text-align: left; font-size: 12px; padding-top:10px">
      <h2>{{ $route.name }}</h2>

      <div class="toolbar">
        <el-dropdown>
          <el-icon style="margin-right: 8px; margin-top: 1px">
            <setting />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-button type="text" @click="handleLogout">退出账号</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span>wubba lubba dub dub</span>
      </div>
    </el-header>

    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-scrollbar>
          <el-menu router>
            <el-submenu v-for="(item, index) in $router.options.routes.slice(2)" :key="index" :index="index">
              <el-sub-menu v-if="type.type === 'admin' || type.type === 'user' && !item.isAuth" :index="index">
                <template #title>
                  <el-icon>
                    <setting />
                  </el-icon>
                  {{ item.name }}
                </template>

                <el-menu-item v-for="(item2, index2) in item.children" :key="index2" :index="item2.path"
                  :class="$route.path == item2.path ? 'is-active' : ''">{{ item2.name }}</el-menu-item>
              </el-sub-menu>
            </el-submenu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { Menu as IconMenu, Setting } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus"
import axios from 'axios'

const router = useRouter();

let type = reactive({ type: localStorage.getItem('type') });

function handleLogout() {
  axios({
    method: 'GET',
    url: '/logout',
  }).then(resp => {
    if (resp.data['code'] == 308) {
      ElMessage({
        showClose: true,
        message: '已退出当前账号',
        type: 'success',
      })
      localStorage.setItem('type', 'none');
    }
    else {
      ElMessage({
        showClose: true,
        message: '注销失败: ' + resp.data['message'],
        type: 'error',
      })
    }
    console.log(("注销: " + JSON.stringify(resp.data)))
  })
  router.replace('/')
}
</script>

<style scoped>
.layout-container-demo .el-header {
  height: 70px;
  position: relative;
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  width: 200px;
  color: var(--el-text-color-primary);
  background: #fff !important;
  border-right: solid 1px #e6e6e6;
  box-sizing: border-box;
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  position: absolute;
  display: inline-flex;
  align-items: center;
  top: 80%;
  right: 20px;
  transform: translateY(-50%);
}
</style>
