import { ChangeDetectionStrategy, Component } from '@angular/core';

type MenuItem = {
	name: string;
	price: string;
};

type MenuSection = {
	title: string;
	description: string;
	items: MenuItem[];
};

const MENU_SECTIONS: MenuSection[] = [
	{
		title: 'Гарячі напої',
		description: 'Класична кава, авторські напої, чай та шоколад.',
		items: [
			{ name: 'Рістрето / Еспресо / Лунго / Американо', price: '35' },
			{ name: 'Макіято', price: '40' },
			{ name: 'Допіо', price: '50' },
			{ name: 'Флет вайт', price: '60' },
			{ name: 'Лате', price: '60' },
			{ name: 'Золотий лате', price: '70' },
			{ name: 'Капучино', price: 'M 50 / L 60' },
			{ name: 'Кедровий капучино', price: 'M 75 / L 85' },
			{ name: 'Яблучний капучино', price: '70' },
			{ name: 'Апельсиновий капучино', price: '70' },
			{ name: 'Айріш', price: '120' },
			{ name: 'Фарисей', price: '120' },
			{ name: 'Вибуховий шоколад', price: '80' },
			{ name: 'Гарячий шоколад', price: '70' },
			{ name: 'Какао з маршмелоу', price: 'M 50 / L 60' },
			{ name: 'Раф класичний', price: 'M 65 / L 75' },
			{ name: 'Раф фруктовий', price: 'M 50 / L 60' },
			{ name: 'Чай вітамінний', price: '50' },
			{ name: 'Чай заварний', price: '40' },
			{ name: 'Матча', price: '80' },
		],
	},
	{
		title: 'Холодні напої',
		description: 'Лимонади, тоніки, айс-напої та сезонні коктейлі.',
		items: [
			{ name: 'Лимонад', price: '60' },
			{ name: 'Лавандовий лимонад', price: '70' },
			{ name: 'Манго маракуя лимонад', price: '70' },
			{ name: 'Мохіто', price: '70' },
			{ name: 'Бамбел бі', price: '70' },
			{ name: 'Айс лате', price: '70' },
			{ name: 'Айс капучино', price: '70' },
			{ name: 'Еспресо тонік', price: '70' },
			{ name: 'Грейпфрут тонік', price: '80' },
			{ name: 'Молочний коктейль', price: '80' },
			{ name: 'Айс капуоранж', price: '70' },
			{ name: 'Апельсиновий фреш', price: '100' },
			{ name: 'Pina Colada', price: '90' },
			{ name: 'Zerno', price: '90' },
		],
	},
];

@Component({
	templateUrl: './landing.component.html',
	styleUrl: './landing.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
	protected readonly menuSections = MENU_SECTIONS;
}
