# field-splicer

## 由LikeDreamwalker开发的字段拼接器

开发这个工具是因为工作需要，所以我很难去说这是不是非常有用。

字段拼接器支持对多个字段进行拼接，默认使用了URL的拼接方式，并且支持跳转（需要添加https/http开头，受限于Vue）。同时兼容夜间模式，现在你不仅不用在地址栏拼接，也不用担心瞎眼了～

字段拼接器可以将当前配置文件导出为.json，同时也支持导入.json。**但请确保导入由字段拼接器导出的.json文件，如果你导入了错误的.json文件很有可能导致未知的错误。**

因为精力有限，目前字段拼接器不会将数据存储在localStorage中，所以请务必注意保存数据。

其他的功能就很简单了，如复制结果或字段到剪贴板，清空以及锁定，同时也可以选择性拼接，你可以同时存有多个字段在拼接器中，并按照需要进行拼接。

开源，接受PR（应该没有）。

## Project setup

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
