@echo off
echo === Прогон тестов ===
call npm run test
echo === Копирую историю ===
if exist allure-report\history (
    xcopy /E /I /Y allure-report\history allure-results\history
    echo История скопирована
) else (
    echo Папки history нет
)
echo === Генерирую отчёт ===
call npx allure generate allure-results --clean -o allure-report
echo === Готово ===