import { CSSProperties, useState } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm'; // Компонент для редактирования параметров
import { defaultArticleState } from './constants/articleProps'; // Дефолтные значения для статьи

import './styles/index.scss'; // Импорт стилей
import styles from './styles/index.module.scss'; // Импорт стилей

export const App = () => {
	// Состояние для хранения настроек
	const [settings, setSettings] = useState({
		fontFamily: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		bgColor: defaultArticleState.backgroundColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
	});

	// Обработчик для применения настроек из формы
	const handleApplySettings = (newSettings: any) => {
		setSettings(newSettings); // Обновляем состояние
	};

	// Обработчик для сброса настроек
	const handleResetSettings = () => {
		setSettings({
			fontFamily: defaultArticleState.fontFamilyOption.value,
			fontSize: defaultArticleState.fontSizeOption.value,
			fontColor: defaultArticleState.fontColor.value,
			bgColor: defaultArticleState.backgroundColor.value,
			contentWidth: defaultArticleState.contentWidth.value,
		});
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': settings.fontFamily,
					'--font-size': settings.fontSize,
					'--font-color': settings.fontColor,
					'--bg-color': settings.bgColor,
					'--container-width': settings.contentWidth,
				} as CSSProperties
			}>
			{/* Передаем функции для применения и сброса настроек в ArticleParamsForm */}
			<ArticleParamsForm
				currentSettings={settings}
				onApply={handleApplySettings}
				onReset={handleResetSettings}
			/>
			<Article />
		</main>
	);
};
