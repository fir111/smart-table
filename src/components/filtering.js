import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)
        .forEach((elementName) => {
            elements[elementName].append(
                ...Object.values(indexes[elementName])
                    .map(name => {
                        // Создаем и возвращаем тег <option>
                        const option = document.createElement('option');
                        option.value = name;
                        option.textContent = name;
                        return option;
                    })
            );
        });

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        // ... внутри обработчика событий, где вы проверяете наличие действия
        if (action === 'clear') {
            // Находим родительский элемент
            const parent = action.closest('.table-column'); // Замените на актуальный класс

            // Находим input рядом с кнопкой
            const input = parent.querySelector('input, select'); // Поиск input или select

            if (input) {
                // Сбрасываем значение поля
                input.value = '';
            }

            // Обновляем состояние фильтра
            const fieldToClear = action.dataset.field;
            if (fieldToClear) {
                state[fieldToClear] = '';
            }
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}