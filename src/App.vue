<template>
  <v-app>
    <v-main
      :class="$vuetify.breakpoint.mdAndUp ? 'pa-15' : 'pa-7'"
      class="d-flex align-center"
    >
      <v-row>
        <!-- 字段 -->
        <v-col :cols="$vuetify.breakpoint.mdAndUp ? 7 : 12">
          <v-hover v-slot:default="{ hover }">
            <v-card
              :elevation="hover ? 24 : 0"
              class="rounded-xl overflow-y-auto"
              :class="$vuetify.breakpoint.mdAndUp ? 'pa-10' : 'pa-5'"
              :height="$vuetify.breakpoint.mdAndUp ? '84vh' : ''"
            >
              <h1>添加字段</h1>
              <v-row
                v-for="(item, index) in query"
                :key="item.name"
                style="margin: 0px"
              >
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    :elevation="hover ? 24 : 0"
                    class="
                      rounded-xl
                      d-flex
                      align-center
                      justify-end
                      flex-wrap
                      mb-3
                      pa-1
                    "
                    width="100%"
                  >
                    <!-- 按钮组 -->
                    <v-col :cols="$vuetify.breakpoint.mdAndUp ? 2 : 6">
                      <v-row class="d-flex align-center">
                        <!-- 复选框 -->
                        <v-col cols="3" class="d-flex justify-center">
                          <!-- <v-checkbox v-model="item.status"></v-checkbox> -->
                          <v-btn
                            icon
                            @click="item.status = !item.status"
                            :color="item.status ? 'primary' : 'secondary'"
                          >
                            <v-icon>{{
                              item.status
                                ? "mdi-checkbox-marked-circle"
                                : "mdi-checkbox-blank-circle"
                            }}</v-icon>
                          </v-btn>
                        </v-col>
                        <!-- 删除 -->
                        <v-col cols="3" class="d-flex justify-center">
                          <v-btn
                            icon
                            :color="item.onlock ? 'secondary' : 'danger'"
                            @click="!item.onlock ? deleteQuery(index) : ''"
                          >
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </v-col>
                        <!-- 锁定 -->
                        <v-col cols="3" class="d-flex justify-center">
                          <v-btn
                            icon
                            :color="
                              item.status
                                ? item.onlock
                                  ? 'primary'
                                  : 'secondary'
                                : 'secondary'
                            "
                            @click="
                              item.status ? (item.onlock = !item.onlock) : ''
                            "
                          >
                            <v-icon>{{
                              item.onlock ? "mdi-lock" : "mdi-lock-open"
                            }}</v-icon>
                          </v-btn>
                        </v-col>
                        <!-- 复制 -->
                        <v-col cols="3" class="d-flex justify-center">
                          <v-btn
                            icon
                            color="primary"
                            @click="copyQuery(`#field-textarea-${index}`)"
                          >
                            <v-icon>mdi-content-copy</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                    <!-- 内容 -->
                    <v-col :cols="$vuetify.breakpoint.mdAndUp ? 10 : 12">
                      <v-text-field
                        :clearable="!item.onlock && item.content !== ''"
                        :label="item.name"
                        counter
                        filled
                        rounded
                        :disabled="!item.status"
                        :readonly="item.onlock"
                        v-model="item.content"
                        :hint="item.onlock ? '' : '请注意连接符'"
                        :id="`field-textarea-${index}`"
                      >
                      </v-text-field>
                    </v-col>
                  </v-card>
                </v-hover>
              </v-row>
              <!-- 新建 -->
              <v-row style="margin: 0px">
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    :elevation="hover ? 24 : 0"
                    class="
                      rounded-xl
                      d-flex
                      align-center
                      justify-end
                      flex-wrap
                      mb-3
                      pa-1
                    "
                    width="100%"
                  >
                    <!-- 新建按钮 -->
                    <v-col :cols="$vuetify.breakpoint.mdAndUp ? 2 : 4">
                      <v-row class="d-flex align-center justify-center">
                        <v-col
                          :cols="$vuetify.breakpoint.mdAndUp ? 4 : 4"
                          class="d-flex justify-center"
                        >
                          <v-btn icon color="primary" x-large @click="newField">
                            <v-icon>mdi-plus-circle</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col :cols="$vuetify.breakpoint.mdAndUp ? 10 : 12">
                      <v-text-field
                        label="请输入字段名"
                        counter
                        filled
                        rounded
                        v-model="fieldName"
                        :clearable="fieldName !== null"
                        hint="字段名将被自动填充并连接"
                        :error="
                          showAlert.value &&
                          showAlert.content === '请填写字段名'
                        "
                      >
                      </v-text-field>
                    </v-col>
                  </v-card>
                </v-hover>
              </v-row>
            </v-card>
          </v-hover>
        </v-col>
        <!-- 拼接结果 -->
        <v-col :cols="$vuetify.breakpoint.mdAndUp ? 5 : 12">
          <v-hover v-slot:default="{ hover }">
            <v-card
              :elevation="hover ? 24 : 0"
              class="rounded-xl"
              :class="$vuetify.breakpoint.mdAndUp ? 'pa-10' : 'pa-5'"
              :height="$vuetify.breakpoint.mdAndUp ? '84vh' : ''"
            >
              <h1>拼接结果</h1>
              <v-hover v-slot:default="{ hover }">
                <v-card
                  :elevation="hover ? 24 : 0"
                  class="
                    rounded-xl
                    d-flex
                    align-center
                    justify-center
                    mb-3
                    pa-4
                  "
                  width="100%"
                  style="overflow-y: visible"
                >
                  <v-row>
                    <!-- 多行文本框 -->
                    <v-col cols="12">
                      <v-textarea
                        :value="fieldSplicer()"
                        filled
                        rounded
                        counter
                        no-resize
                        height="20vh"
                        id="result-textarea"
                        readonly
                      ></v-textarea>
                    </v-col>
                    <!-- 按钮组 -->
                    <v-col cols="12">
                      <v-hover v-slot:default="{ hover }">
                        <v-card
                          :elevation="hover ? 24 : 0"
                          class="
                            rounded-xl
                            d-flex
                            align-center
                            flex-wrap
                            mb-3
                            pa-4
                          "
                          width="100%"
                        >
                          <v-col :cols="$vuetify.breakpoint.mdAndUp ? 6 : 12">
                            <v-btn
                              color="primary"
                              rounded
                              elevation="0"
                              @click="toNewPage(fieldSplicer())"
                              block
                            >
                              <v-icon left>mdi-open-in-new</v-icon>
                              在新标签页中打开
                            </v-btn>
                          </v-col>
                          <v-col :cols="$vuetify.breakpoint.mdAndUp ? 6 : 12">
                            <v-btn
                              color="primary"
                              rounded
                              elevation="0"
                              @click="copyQuery('#result-textarea')"
                              block
                            >
                              <v-icon left>mdi-content-copy</v-icon>
                              复制字段到剪贴板
                            </v-btn>
                          </v-col>
                          <v-col :cols="$vuetify.breakpoint.mdAndUp ? 6 : 12">
                            <v-btn
                              color="primary"
                              rounded
                              elevation="0"
                              @click="saveJSON(query)"
                              block
                            >
                              <v-icon left>mdi-export</v-icon>
                              保存字段配置文件
                            </v-btn>
                          </v-col>
                          <v-col :cols="$vuetify.breakpoint.mdAndUp ? 6 : 12">
                            <v-file-input
                              placeholder="上传字段配置文件"
                              truncate-length="10"
                              prepend-icon="mdi-import"
                              dense
                              v-model="upLoadJSON"
                              @change="importJSON()"
                              chips
                              accept=".json"
                            >
                            </v-file-input>
                          </v-col>
                          <v-col :cols="$vuetify.breakpoint.mdAndUp ? 6 : 12">
                            <v-btn
                              color="info"
                              rounded
                              elevation="0"
                              block
                              @click="toNewPage('https://ldwid.com')"
                            >
                              <v-icon left>mdi-star</v-icon>
                              访问ldwid.com
                            </v-btn>
                          </v-col>
                          <v-col :cols="$vuetify.breakpoint.mdAndUp ? 6 : 12">
                            <v-btn
                              color="github"
                              dark
                              rounded
                              elevation="0"
                              block
                              @click="
                                toNewPage(
                                  'https://github.com/LikeDreamwalker/field-splicer'
                                )
                              "
                            >
                              <v-icon left>mdi-github</v-icon>
                              访问GitHub
                            </v-btn>
                          </v-col>
                          <v-col :cols="$vuetify.breakpoint.mdAndUp ? 6 : 12">
                            <v-btn
                              color="primary"
                              :dark="!$vuetify.theme.dark"
                              rounded
                              elevation="0"
                              block
                              @click="
                                $vuetify.theme.dark = !$vuetify.theme.dark
                              "
                            >
                              <v-icon left>{{
                                $vuetify.theme.dark
                                  ? "mdi-brightness-4"
                                  : "mdi-brightness-7"
                              }}</v-icon>
                              {{
                                $vuetify.theme.dark ? "夜间模式" : "日间模式"
                              }}
                            </v-btn>
                          </v-col>
                        </v-card>
                      </v-hover>
                    </v-col>
                  </v-row>
                </v-card>
              </v-hover>
            </v-card>
          </v-hover>
        </v-col>
        <!-- 提示框 -->
        <v-alert
          :type="showAlert.type"
          :color="showAlert.color"
          elevation="24"
          rounded="pill"
          transition="fade-transition"
          :value="showAlert.value"
        >
          {{ showAlert.content }}
        </v-alert>
      </v-row>
    </v-main>
  </v-app>
</template>

<style>
.v-card {
  transition: 0.3s ease-in-out;
}
.v-card::-webkit-scrollbar {
  display: none;
}
.v-alert {
  position: fixed !important;
  top: 1vh;
  right: 1vw;
}
</style>

<script>
import dayjs from "dayjs";
export default {
  name: "App",
  data: () => ({
    query: [
      {
        name: "通过添加http/https协议支持跳转",
        content: "https://",
        status: true,
        onlock: true,
        clearble: false,
      },
      {
        name: "url",
        content: "ldwid.com?",
        status: true,
        onlock: false,
        clearble: false,
      },
      {
        name: "token",
        content:
          "&token=fakeTokenAndYouCantJumpToThisPageCauseLdwidDoesntNeedAToken",
        status: true,
        onlock: false,
        clearble: false,
      },
    ],
    fieldName: "",
    showAlert: {
      value: false,
      type: "success",
      content: "",
      color: "",
    },
    upLoadJSON: null,
    upLoadJSONContent: null,
  }),
  beforeCreate() {
    document.title = `字段拼接器 - LikeDreamwalker 驾到`;
  },
  created() {
    // NOTE 注意this指向
    const _this = this;
    const listeners = {
      dark: function (mediaQueryList) {
        if (mediaQueryList.matches) {
          _this.$vuetify.theme.dark = true;
        }
      },
      light: function (mediaQueryList) {
        if (mediaQueryList.matches) {
          _this.$vuetify.theme.dark = false;
        }
      },
    };
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addListener(listeners.dark);
    window
      .matchMedia("(prefers-color-scheme: light)")
      .addListener(listeners.light);
  },
  methods: {
    deleteQuery(index) {
      this.query.splice(index, 1);
    },
    fieldSplicer() {
      let result = "";
      for (const item of this.query) {
        if (item.status && item.content !== null) {
          result += item.content;
        }
      }
      return result;
    },
    newField() {
      if (this.fieldName !== "") {
        let field = {
          name: this.fieldName,
          content: `&${this.fieldName}=`,
          status: true,
          onlock: false,
          clearble: true,
        };
        this.query.push(field);
        this.fieldName = "";
      } else {
        this.setAlert("error", "请填写字段名", "danger");
      }
    },
    copyQuery(target) {
      const copy = document.querySelector(target);
      copy.select();
      document.execCommand("copy");
      this.setAlert("success", "已复制到剪贴板", "primary");
    },
    toNewPage(location) {
      window.open(location, "_blank");
    },
    saveJSON(data) {
      if (!data) {
        this.setAlert("error", "导出字段配置文件失败", "danger");
        return;
      }
      let filename = "";
      this.setAlert("success", "导出字段配置文件成功，即将开始下载", "primary");
      if (this.query[1].name === "url" && this.query[1].content !== "") {
        filename = `${this.query[1].content}${dayjs().format(
          "MM-DD-HH:mm:ss"
        )}.json`;
      } else {
        filename = `字段配置文件_${dayjs().format("MM-DD-HH:mm:ss")}.json`;
      }
      data = JSON.stringify(data, undefined, 4);
      let blob = new Blob([data], { type: "text/json" }),
        e = document.createEvent("MouseEvents"),
        a = document.createElement("a");
      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
      e.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
    },
    importJSON() {
      // upLoadJSON是文件列表
      if (this.upLoadJSON !== null) {
        // 声明一个reader
        let reader = new FileReader();
        // 以文本方式读取文件
        reader.readAsText(this.upLoadJSON);
        reader.onload = () => {
          // todo 需要校验
          if (reader.result !== "") {
            // 将文本（字符串）转化为JSON
            this.upLoadJSONContent = JSON.parse(reader.result);
            this.query = [];
            for (
              let index = 0;
              index < this.upLoadJSONContent.length;
              index++
            ) {
              this.query[index] = this.upLoadJSONContent[index];
              this.upLoadJSONContent[index] = null;
            }
            this.setAlert("success", "导入字段配置文件成功", "primary");
          } else {
            this.setAlert(
              "error",
              "上传字段配置文件失败，请不要导入自定义的.json文件",
              "danger"
            );
            return;
          }
        };
      } else {
        this.setAlert("info", "未导入文件", "info");
      }
    },
    setAlert(type, content, color) {
      if (!this.showAlert.value) {
        this.showAlert.value = true;
        this.showAlert.type = type;
        this.showAlert.content = content;
        this.showAlert.color = color;
        setTimeout(() => {
          this.showAlert.value = false;
        }, 1500);
      }
    },
  },
};
</script>
