# 致命21点：安卓 APK 打包说明（小白版）

这个仓库现在已经预留了安卓打包配置。思路是：继续保留 `index.html` 网页版，同时用 Capacitor 把 `index.html` 和 `img/` 图片素材一起打进安卓 APK。这样用户安装 APK 后，剧情图、数字牌、技能牌都从手机本地读取，不再依赖 GitHub 图片加载速度。

## 你需要准备什么

1. 一台 Windows 10 / Windows 11 电脑。
2. 安装 **Node.js LTS**：去 `https://nodejs.org/` 下载 LTS 版本并安装。
3. 安装 **Android Studio**：去 `https://developer.android.com/studio` 下载并安装。
4. 一根数据线连接你的 iqoo neo5 手机。
5. 手机开启：
   - 设置 → 关于手机 → 连续点击“版本号”打开开发者模式。
   - 设置 → 系统管理 / 开发者选项 → 打开“USB 调试”。

## 第一次打包前的命令

在 Windows PowerShell 或 VS Code 终端里进入仓库目录，例如：

```powershell
cd D:\你的路径\blackjack
```

然后执行：

```powershell
npm install
```

这一步会安装 Capacitor 打包工具。

## 生成安卓工程

第一次做安卓 APK 时执行：

```powershell
npm run android:add
```

这会做两件事：

1. 把 `index.html` 和 `img/` 复制到 `www/`。
2. 创建 Android 工程目录 `android/`。

如果你已经创建过 `android/`，后面修改网页或图片后，不需要重复 `android:add`，只需要执行：

```powershell
npm run android:sync
```

## 打开 Android Studio

执行：

```powershell
npm run android:open
```

Android Studio 打开后：

1. 等右下角 Gradle 同步完成。
2. 如果手机已连接并开启 USB 调试，顶部设备列表会出现你的手机。
3. 点击绿色三角形运行按钮，就可以安装到手机测试。

## 生成可以分享的 APK

在 Android Studio 里：

1. 点击顶部菜单 **Build**。
2. 选择 **Build Bundle(s) / APK(s)**。
3. 选择 **Build APK(s)**。
4. 等待完成后，Android Studio 会提示 APK 位置。
5. 把这个 APK 文件发给其他安卓用户即可安装。

> 注意：不上架应用商店时，别人安装 APK 可能需要在手机里允许“安装未知来源应用”。

## 平时修改游戏后的流程

如果你只是修改了 `index.html` 或替换了 `img/` 图片：

```powershell
npm run android:sync
npm run android:open
```

然后在 Android Studio 里重新运行或重新 Build APK。

## 当前新增文件说明

- `package.json`：保存安卓打包相关命令和 Capacitor 依赖。
- `capacitor.config.json`：安卓 App 名称、包名、网页资源目录配置。
- `tools/prepare-capacitor-web.mjs`：把 `index.html` 和 `img/` 复制到 `www/`，供 APK 打包使用。
- `www/`：自动生成目录，不需要手动修改，也不提交到 Git。

## 为什么这样能解决 GitHub 图片加载慢

网页版通过 GitHub Pages 打开时，图片需要从 GitHub 网络加载；国内用户网络不稳定时就会慢。APK 会把 `img/` 里的图片直接打包进安装包，游戏运行时读取手机本地文件，所以不会再因为 GitHub 图片加载慢导致卡顿。
