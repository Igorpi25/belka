# belka

[Amplify app link](https://develop.d2qe2vztgjyt54.amplifyapp.com/).

# Backend

## Custom resource
### Кастомные ресурсы для автризации подписок
[@auth для subscription](https://aws-amplify.github.io/docs/cli-toolchain/graphql#authorizing-subscriptions), [фильтрация subscription](https://aws-amplify.github.io/docs/cli-toolchain/graphql#filter-subscriptions-by-model-fields-andor-relations).
Проблема: нет возможности указать фильтрацию для генерируемых subscription с @auth.
Решение: создаются кастомные ресурсы для subscription, для проекта генерируется автоматически, т.к. нет необходимости указывать фильтрацию.

## Pipeline Resolver
### Resolver для создания товара
Пока [RFC - Pipeline Resolver Support](https://github.com/aws-amplify/amplify-cli/issues/1055) не имплементирован в amplify, pipeline создаются в AppSync(`/src/amplify/backend/api/belkaapi/appsync_functions/`).
В сгенерированных amplify функциях меняется версия с "version": `"2017-02-28"`, на `"version": "2018-05-29"`.
Для создания продукта создается pipline, который создает `ProductCost`, `ProductStore`, `ProductInfo`, `ProductLink`.

# Frontend

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

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
