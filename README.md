# E-junkie IO Admin

> Vue.js source code

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

> You need to have E-junkie IO running on your localhost if you doing any dev. 
While developing on localhost, hardcode your username in apiHandler.php, line 13. (ex - $user = your_username). You don't have to deal with keeping session logged in and 
also you have to override the Config.API.endpoint with your localhost url in main.js, (ex - "endpoint" : "http://localhost/cms/api/")

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
