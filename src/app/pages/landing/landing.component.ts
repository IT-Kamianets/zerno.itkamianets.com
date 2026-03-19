import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
	PLATFORM_ID,
	signal,
} from '@angular/core';
import { marked } from 'marked';
import { LanguageService } from '../../feature/language/language.service';

@Component({
	templateUrl: './landing.component.html',
	styleUrl: './landing.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
	private _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
	private _languageService = inject(LanguageService);
	private _httpClient = inject(HttpClient);

	html = signal('');

	private _language = '';

	constructor() {
		if (this._isBrowser) {
			effect(() => {
				const language = this._languageService.language();

				if (this._language !== language) {
					this._language = language;

					this._httpClient
						.get(`/readme/${language}.md`, { responseType: 'text' })
						.subscribe((content) => this.html.set(marked.parse(content) as string));
				}
			});
		}
	}
}
