<template>
  <div class="top" :style="{ height: screenHeight + 'px' }">
    <div class="page-header-div">
      <span class="page-title">>&nbsp;&nbsp;Code Comments&nbsp;{{ $t('templates.templates') }}
      </span>
    </div>

    <el-tabs type="border-card" class="tepmlates-card">
      <el-tab-pane :label="`${$t('templates.hd-template')}`">
        <el-input type="textarea" :autosize="{ minRows: 15, maxRows: 100 }"
          :placeholder="`${$t('templates.input-placeholder')}`" v-model:value="hdNotes">
          "`${$t('board_features.feature')}
        </el-input>
        <el-button type="primary" class="apply header" @click="applyHd">{{
        $t('templates.apply')
        }}</el-button>
      </el-tab-pane>
      <el-tab-pane :label="`${$t('templates.fun-template')}`">
        <el-input type="textarea" :autosize="{ minRows: 15, maxRows: 100 }"
          :placeholder="`${$t('templates.input-placeholder')}`" v-model:value="funNotes">
        </el-input>
        <el-button type="primary" class="apply function" @click="applyFun">{{
        $t('templates.apply')
        }}</el-button>
      </el-tab-pane>
    </el-tabs>

    <div class="page-footer-div">
      <v-md-preview :text="`${$t('templates.valDesc')}`" height="400px" class="mavon-editor-desc" ref="md">
        {{ desc }}
      </v-md-preview>
    </div>
  </div>
</template>

<script setup>
  var hdNotes = '',
    funNotes = '',
    vscode = '',
    screenHeight = document.body.clientHeight - 110,
    previewBackground = '#fbfbfb';
  console.log(vscode, previewBackground);
 
  // eslint-disable-next-line no-undef
  vscode = typeof acquireVsCodeApi === 'function' ? acquireVsCodeApi() : null;
  
  window.addEventListener('message', (event) => {
    hdNotes = event.data.hdNotes
    funNotes = event.data.funNotes
    const themeKind = event.data.themeKind
    previewBackground = themeKind === 1 ? '#fbfbfb' : 'black'
    const language = event.data.language
    if (language) {
      setupLanguage(language)
    }
  })
</script>
  
<script>
import { setupLanguage } from '@/assets/languages';
// import { useI18n } from 'vue-i18n'
export default {
  watch: {
    screenHeight(val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenHeight = val
        this.timer = true
        let that = this
        setTimeout(function () {
          // 打印screenWidth变化的值
          console.log(that.screenHeight)
          that.timer = false
        }, 400)
      }
    },
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight - 110
        that.screenHeight = window.screenHeight
      })()
    }
  },
  computed: {
    prop() {
      let data = {
        subfield: false, // 单双栏模式
        defaultOpen: 'preview', //edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: false,
        toolbarsFlag: false,
        scrollStyle: false,
        boxShadow: false, //边框
      }
      return data
    },
  },
  props: {
    msg: String,
  },
  methods: {
    applyHd() {
      this.vscode.postMessage({
        command: 'applyHd',
        text: this.hdNotes,
      })
    },
    applyFun() {
      this.vscode.postMessage({
        command: 'applyFun',
        text: this.funNotes,
      })
    },
  },
}
</script>

<style scoped>
.top {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.apply {
  margin-top: 10px;
  float: right;
}

.page-header-div {
  height: 60px;
  text-align: left;
  box-shadow: 0 0 2px rgb(107, 108, 109);
  border-radius: 5px 5px 5px 5px;
  border: 1px solid rgb(220, 223, 230);
  margin: 1% 1% 0 1%;
}

.page-title {
  color: rgb(144, 147, 153);
  font-weight: bold;
  margin-left: 20px;
  line-height: 60px;
  border: 1px;
}

.tepmlates-card {
  margin: 2% 1% 0 1%;
}

.page-footer-div {
  margin: 2% 1% 2% 1%;
  text-align: left;
  box-shadow: 0 0 2px rgb(107, 108, 109);
  border-radius: 5px 5px 5px 5px;
  border: 1px solid rgb(220, 223, 230);
}

.page-footer-div .v-note-wrapper {
  min-height: 100px;
}
</style>

<style>
.app-wrapper {
  height: 100%;
}

.page-footer-div .v-show-content {
  color: rgb(144, 147, 153);
}
</style>

<style>
/* .page-title{
  color: white;
}
.page-header-div{
  background-color: rgb(32, 30, 30);
  border: 2px solid rgb(48, 54, 61) ;
  box-shadow: 0 0 2px rgb(48, 54, 61);
}
.el-tabs__content{
  background-color: black;
}
.el-textarea__inner{
  background-color: black;
  color: white;
  border: 1px solid rgb(48, 54, 61);
}
.el-tabs__nav-scroll{
  background-color: rgb(37,37,38);
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
  background-color: black;
  border-right-color:rgb(80, 85, 88);
  border-left-color:rgb(80, 85, 88);
}
.el-tabs--border-card{
  border: 1px solid rgb(48, 54, 61);
} */
</style>

<style>
.vscode-dark code {
  color: aqua;
}

.vscode-dark .page-title {
  color: white;
}

.vscode-dark .page-header-div {
  background-color: black;
  border: 2px solid rgb(48, 54, 61);
  box-shadow: 0 0 2px rgb(48, 54, 61);
}

.vscode-dark .page-footer-div {
  border: 2px solid rgb(48, 54, 61);
  box-shadow: 0 0 2px rgb(48, 54, 61);
}

.vscode-dark .el-tabs__content {
  background-color: black;
}

.vscode-dark .el-textarea__inner {
  background-color: black;
  color: white;
  border: 1px solid rgb(48, 54, 61);
}

.vscode-dark .el-tabs__nav-scroll {
  background-color: rgb(37, 37, 38);
}

.vscode-dark .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
  background-color: black;
  border-right-color: rgb(80, 85, 88);
  border-left-color: rgb(80, 85, 88);
}

.vscode-dark .el-tabs--border-card {
  border: 1px solid rgb(48, 54, 61);
}
</style>

<style>
.vscode-high-contrast code {
  color: aqua;
}

.vscode-high-contrast .page-title {
  color: white;
}

.vscode-high-contrast .page-header-div {
  background-color: black;
  border: 2px solid rgb(48, 54, 61);
  box-shadow: 0 0 2px rgb(48, 54, 61);
}

.vscode-high-contrast .el-tabs__content {
  background-color: black;
}

.vscode-high-contrast .el-textarea__inner {
  background-color: black;
  color: white;
  border: 1px solid rgb(48, 54, 61);
}

.vscode-high-contrast .el-tabs__nav-scroll {
  background-color: rgb(37, 37, 38);
}

.vscode-high-contrast .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
  background-color: black;
  border-right-color: rgb(80, 85, 88);
  border-left-color: rgb(80, 85, 88);
}

.vscode-high-contrast .el-tabs--border-card {
  border: 1px solid rgb(48, 54, 61);
}
</style>
