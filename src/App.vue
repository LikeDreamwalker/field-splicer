<template>
  <v-app>
    <v-main>
      <v-row>
        <!-- 字段 -->
        <v-col :cols="$vuetify.breakpoint.mdAndUp ? 7 : 12">
          <v-hover v-slot:default="{ hover }">
            <!-- 需要让卡片居中 -->
            <v-card
              :elevation="hover ? 24 : 12"
              class="rounded-xl"
              :class="$vuetify.breakpoint.mdAndUp ? 'pa-10' : 'pa-5'"
              height="80vh"
              :width="$vuetify.breakpoint.mdAndup ? '30vw' : '90vw'"
            >
              <h1 class="mb-5">添加字段</h1>

              <v-row
                v-for="(item, index) in query"
                :key="item.name"
                class="d-flex align-baseline"
              >
                <!-- 按钮组 -->
                <v-col cols="2">
                  <v-row class="d-flex align-center">
                    <!-- 复选框 -->
                    <v-col cols="4">
                      <v-checkbox v-model="item.status"></v-checkbox>
                    </v-col>
                    <!-- 删除 -->
                    <v-col cols="4">
                      <v-btn
                        icon
                        color="pink"
                        @click="this.query.splice(index, 1)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-col>
                    <!-- 锁定 -->
                    <v-col cols="4">
                      <v-btn
                        icon
                        :color="item.onlock ? 'primary' : '#c0c0c0'"
                        @click="deleteQuery(index)"
                      >
                        <v-icon>mdi-lock</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
                <!-- 标题 -->
                <!-- <v-col cols="3">
                  <v-text-field
                    clearable
                    label="名称"
                    counter
                    filled
                    rounded
                    :disabled="!item.status"
                    v-model="item.name"
                  >
                  </v-text-field>
                </v-col> -->
                <!-- 内容 -->
                <v-col cols="10">
                  <v-text-field
                    :clearable="!item.onlock"
                    :label="item.name"
                    counter
                    filled
                    rounded
                    :disabled="!item.status"
                    :readonly="item.onlock"
                    v-model="item.content"
                  >
                  </v-text-field>
                </v-col>
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
              <h1 class="mb-5">拼接结果</h1>
              <v-textarea
                :value="fieldSplicer()"
                filled
                rounded
                counter
                no-resize
                height="50vh"
              ></v-textarea>
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
        name: "url",
        content: "localhost:8080",
        status: true,
        onlock: false
      },
      {
        name: "token",
        content: "1111111",
        status: true,
        onlock: false
      }
    ]
  }),
  methods: {
    deleteQuery(index) {
      this.query.splice(index, 1);
    },
    fieldSplicer() {
      let result = "";
      for (const item of this.query) {
        result += item.content;
      }
      return result;
    }
  }
};
</script>
