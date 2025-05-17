---
title: "rot13 | Первое задание по практике"
author: "Николай Якунин"
date: 2025-05-17
---

## Автор

**Николай Якунин**: [GitHub](https://github.com/Nikolay-Yakunin)

## Описание

Простая реализация Rot13 на js, сборка с помощью Webpack, сервер на node js.

## Запуск
1. Клонируйте репозиторий:
```bash
git clone https://github.com/Nikolay-Yakunin/crypto-rot13.git
```

2. Перейдите в директорию проекта:
```bash
cd crypto-rot13
```

3. Установите зависимости:
```bash
npm install
```

4. Запустите сборку:
```bash
npm run build
```

5. Запустите сервер:
```bash
npm run serve
```

6. Откройте браузер и перейдите по адресу:
```
http://localhost:3000
```
или по тому, который указан в .env.

## Пример .env

```env
PORT=8080
PUBLIC_DIR=../public
```

## Пример использования

В левый столбец, вставьте текст, который хотите зашифровать или расшифровать.

Пример:
```
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non suscipit tortor, eget scelerisque nisi. Praesent sagittis maximus libero, sit amet gravida erat viverra non. Vestibulum eget auctor turpis. Nam pulvinar augue eu velit vehicula vehicula. Curabitur augue tellus, sagittis eu sem pellentesque, facilisis mollis odio. Donec quis dolor dolor. Vestibulum et neque leo.
```
При выборе "Шифровать"
В правом столбце, вы получите зашифрованный текст.
```
Yberz vcfhz qbybe fvg nzrg, pbafrpgrghe nqvcvfpvat ryvg. Nrarna aba fhfpvcvg gbegbe, rtrg fpryrevfdhr avfv. Cenrfrag fntvggvf znkvzhf yvoreb, fvg nzrg tenivqn reng ivireen aba. Irfgvohyhz rtrg nhpgbe ghecvf. Anz chyivane nhthr rh iryvg iruvphyn iruvphyn. Phenovghe nhthr gryyhf, fntvggvf rh frz cryyragrfdhr, snpvyvfvf zbyyvf bqvb. Qbarp dhvf qbybe qbybe. Irfgvohyhz rg ardhr yrb.
```
Вы можете кликнуть на текст, чтобы скопировать его в буфер обмена.


