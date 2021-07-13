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
            <!-- 需要让卡片居中 -->
            <v-card
              :elevation="hover ? 24 : 12"
              class="rounded-xl overflow-y-auto"
              :class="$vuetify.breakpoint.mdAndUp ? 'pa-10' : 'pa-5'"
              height="80vh"
              style="overflow-y: visible"
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
                    <v-col :cols="$vuetify.breakpoint.mdAndUp ? 2 : 4">
                      <v-row class="d-flex align-center">
                        <!-- 复选框 -->
                        <v-col
                          :cols="$vuetify.breakpoint.mdAndUp ? 4 : 4"
                          class="d-flex justify-center"
                        >
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
                        <v-col
                          :cols="$vuetify.breakpoint.mdAndUp ? 4 : 4"
                          class="d-flex justify-center"
                        >
                          <v-btn
                            icon
                            :color="item.onlock ? 'secondary' : 'danger'"
                            @click="!item.onlock ? deleteQuery(index) : ''"
                          >
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </v-col>
                        <!-- 锁定 -->
                        <v-col
                          :cols="$vuetify.breakpoint.mdAndUp ? 4 : 4"
                          class="d-flex justify-center"
                        >
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
                            <v-icon>mdi-lock</v-icon>
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
                        hint="如有必要请输入连接符"
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
                        hint="字段名不是字段内容的一部分"
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
              :elevation="hover ? 24 : 12"
              class="rounded-xl"
              :class="$vuetify.breakpoint.mdAndUp ? 'pa-10' : 'pa-5'"
              height="80vh"
            >
              <h1>拼接结果</h1>
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
                      ></v-textarea>
                    </v-col>
                    <!-- 按钮组 -->
                    <v-col
                      :cols="$vuetify.breakpoint.mdAndUp ? 6 : 12"
                      class="d-flex"
                      :class="
                        $vuetify.breakpoint.mdAndUp
                          ? 'justify-start'
                          : 'justify-center'
                      "
                    >
                      <v-hover v-slot:default="{ hover }">
                        <v-btn
                          color="primary"
                          rounded
                          :elevation="hover ? 24 : 0"
                          @click="toNewPage(fieldSplicer())"
                        >
                          <v-icon left>mdi-open-in-new</v-icon> 在新标签页中打开
                        </v-btn>
                      </v-hover>
                    </v-col>
                    <v-col
                      :cols="$vuetify.breakpoint.mdAndUp ? 6 : 12"
                      class="d-flex"
                      :class="
                        $vuetify.breakpoint.mdAndUp
                          ? 'justify-end'
                          : 'justify-center'
                      "
                    >
                      <v-hover v-slot:default="{ hover }">
                        <v-btn
                          color="primary"
                          rounded
                          :elevation="hover ? 24 : 0"
                          @click="copyQuery()"
                        >
                          <v-icon left>mdi-content-copy</v-icon>
                          复制字段到剪贴板
                        </v-btn>
                      </v-hover>
                    </v-col>
                  </v-row>
                </v-card>
              </v-hover>
              <!-- 链接 -->
              <v-hover v-slot:default="{ hover }">
                <v-card
                  :elevation="hover ? 24 : 0"
                  class="
                    rounded-xl
                    d-flex
                    align-center
                    justify-center
                    flex-wrap
                    mb-3
                    pa-4
                  "
                  width="100%"
                >
                  <v-card-title class="justify-center" style="padding: 0px">
                    访问
                    <v-btn
                      color="primary"
                      text
                      @click="toNewPage('https://ldwid.com')"
                    >
                      ldwid.com
                    </v-btn>
                    以获取更多内容
                  </v-card-title>
                  <!-- <v-card-text>
                    <v-btn
                      icon
                      color="black"
                      @click="
                        toNewPage(
                          'https://github.com/LikeDreamwalker/field-splicer'
                        )
                      "
                    >
                      <v-icon>mdi-github</v-icon>
                    </v-btn>
                  </v-card-text> -->
                  <v-row>
                    <v-col cols="4">
                      <v-btn
                        icon
                        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
                        :color="$vuetify.theme.dark ? 'danger' : 'primary'"
                      >
                        <v-icon>{{
                          $vuetify.theme.dark
                            ? "mdi-brightness-4"
                            : "mdi-brightness-7"
                        }}</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-hover>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<style>
.v-card {
  transition: 0.3s ease-in-out;
}
</style>

<script>
export default {
  name: "App",

  data: () => ({
    query: [
      {
        name: "通过添加http/https协议支持跳转",
        content: "https://",
        status: true,
        onlock: false,
        clearble: false
      },
      {
        name: "访问ldwid.com以了解更多",
        content: "mirrorlake.",
        status: true,
        onlock: false,
        clearble: false
      },
      {
        name: "LikeDreamwalker",
        content: "ldwid.com",
        status: true,
        onlock: false,
        clearble: false
      }
    ],
    fieldName: ""
  }),
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
          name: "",
          content: "",
          status: true,
          onlock: false,
          clearble: false
        };
        field.name = this.fieldName;
        this.query.push(field);
        this.fieldName = "";
      }
    },
    copyQuery() {
      const copy = document.querySelector("#result-textarea");
      copy.select();
      document.execCommand("copy");
    },
    toNewPage(location) {
      window.open(location, "_blank");
    }
  }
};
</script>
