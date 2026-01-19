import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	currentSettings: {
		fontFamily: string;
		fontSize: string;
		fontColor: string;
		bgColor: string;
		contentWidth: string;
	};
	onApply: (newSettings: any) => void;
	onReset: () => void;
}

export const ArticleParamsForm = ({
	currentSettings,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [font, setFont] = useState(currentSettings.fontFamily);
	const [fontSize, setFontSize] = useState(currentSettings.fontSize);
	const [fontColor, setFontColor] = useState(currentSettings.fontColor);
	const [bgColor, setBgColor] = useState(currentSettings.bgColor);
	const [contentWidth, setContentWidth] = useState(
		currentSettings.contentWidth
	);
	const sidebarRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLDivElement>(null);

	const toggleSidebar = () => setIsMenuOpen((prevState) => !prevState);

	// Синхронизация состояния формы с текущими настройками при открытии сайдбара
	useEffect(() => {
		if (isMenuOpen) {
			setFont(currentSettings.fontFamily);
			setFontSize(currentSettings.fontSize);
			setFontColor(currentSettings.fontColor);
			setBgColor(currentSettings.bgColor);
			setContentWidth(currentSettings.contentWidth);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMenuOpen]);

	// Закрытие при клике вне сайдбара (исключая кнопку со стрелкой)
	useEffect(() => {
		if (!isMenuOpen) return;

		const handleClick = (event: MouseEvent) => {
			const target = event.target;
			if (
				target instanceof Node &&
				!sidebarRef.current?.contains(target) &&
				!buttonRef.current?.contains(target)
			) {
				setIsMenuOpen(false);
			}
		};

		window.addEventListener('mousedown', handleClick);
		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isMenuOpen]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleApply();
	};

	const handleApply = () => {
		onApply({
			fontFamily: font,
			fontSize: fontSize,
			fontColor: fontColor,
			bgColor: bgColor,
			contentWidth: contentWidth,
		});
	};

	const handleReset = () => {
		onReset();
		setFont(defaultArticleState.fontFamilyOption.value);
		setFontSize(defaultArticleState.fontSizeOption.value);
		setFontColor(defaultArticleState.fontColor.value);
		setBgColor(defaultArticleState.backgroundColor.value);
		setContentWidth(defaultArticleState.contentWidth.value);
	};

	return (
		<>
			<div ref={buttonRef}>
				<ArrowButton isOpen={isMenuOpen} onClick={toggleSidebar} />
			</div>
			<div ref={sidebarRef}>
				<aside
					className={`${styles.container} ${
						isMenuOpen ? styles.container_open : ''
					}`}>
					<form className={styles.form} onSubmit={handleSubmit}>
						<div className={styles.title}>
							<Text size={31} weight={800} uppercase>
								ЗАДАЙТЕ ПАРАМЕТРЫ
							</Text>
						</div>
						<Select
							title='ШРИФТ'
							selected={
								fontFamilyOptions.find((opt) => opt.value === font) ||
								fontFamilyOptions[4]
							}
							options={fontFamilyOptions}
							onChange={(selected) => setFont(selected.value)}
						/>
						<RadioGroup
							name='font-size'
							title='РАЗМЕР ШРИФТА'
							selected={
								fontSizeOptions.find((opt) => opt.value === fontSize) ||
								fontSizeOptions[1]
							}
							options={fontSizeOptions}
							onChange={(selected) => setFontSize(selected.value)}
						/>
						<Select
							title='ЦВЕТ ШРИФТА'
							selected={
								fontColors.find((opt) => opt.value === fontColor) ||
								fontColors[8]
							}
							options={fontColors}
							onChange={(selected) => setFontColor(selected.value)}
						/>
						<hr className={styles.separator} />
						<Select
							title='ЦВЕТ ФОНА'
							selected={
								backgroundColors.find((opt) => opt.value === bgColor) ||
								backgroundColors[3]
							}
							options={backgroundColors}
							onChange={(selected) => setBgColor(selected.value)}
						/>
						<Select
							title='ШИРИНА КОНТЕНТА'
							selected={
								contentWidthArr.find((opt) => opt.value === contentWidth) ||
								contentWidthArr[1]
							}
							options={contentWidthArr}
							onChange={(selected) => setContentWidth(selected.value)}
						/>

						<div className={styles.bottomContainer}>
							<Button
								title='СБРОСИТЬ'
								htmlType='reset'
								type='clear'
								onClick={handleReset}
							/>
							<Button title='ПРИМЕНИТЬ' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
