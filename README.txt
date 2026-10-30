СБОРКА БЕЗ УСТАНОВКИ ЧЕГО-ЛИБО (самый простой путь)
1. Создай пустой репозиторий на github.com и залей туда все файлы из этой папки (включая .github).
2. Вкладка Actions -> "Build EXE + APK" -> Run workflow.
3. Через 5-10 минут внизу страницы запуска скачай артефакты:
   BlackHolePlayer-exe (один portable .exe) и BlackHolePlayer-apk (app-debug.apk).

СБОРКА ЛОКАЛЬНО
EXE (Windows, нужен Node 20+):  npm install && npm run build:exe   -> dist/BlackHolePlayer.exe
APK (нужны Node, JDK 17, Android SDK):
  npm install && npm run prep:www && npx cap add android && npx cap sync android
  cd android && gradlew assembleDebug  -> android/app/build/outputs/apk/debug/app-debug.apk
На телефоне разреши установку из неизвестных источников.
