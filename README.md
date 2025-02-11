# Hugo Example

This directory is a brief example of a [Hugo](https://gohugo.io/) app that can be deployed to Vercel with zero configuration.

## Deploy Your Own

Deploy your own Hugo project with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/hugo&template=hugo)

_Live Example: https://hugo-template.vercel.app_

### How We Created This Example

To get started with Hugo for deployment with Vercel, you can use the [Hugo CLI](https://gohugo.io/commands/) to initialize the project:

```shell
$ hugo new site project-name
```


## 运行代码预览
npm run watch:hugo

  # 新增“最新资讯”的子菜单
  [[menu.main]]
    name = "switch最新资讯"
    identifier = "switch-news"
    url = "/gameInformation/switch-news/"
    parent = "gameInformation"
    weight = 1

  [[menu.main]]
    name = "ps最新资讯"
    identifier = "ps-reviews"
    url = "/gameInformation/ps-reviews/"
    parent = "gameInformation"
    weight = 2

  [[menu.main]]
    name = "其他最新资讯"
    identifier = "other-reviews"
    url = "/gameInformation/other-reviews/"
    parent = "gameInformation"
    weight = 3