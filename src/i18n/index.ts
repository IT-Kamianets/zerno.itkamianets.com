import { bgTranslates } from './bg';
import { csTranslates } from './cs';
import { daTranslates } from './da';
import { deTranslates } from './de';
import { elTranslates } from './el';
import { enTranslates } from './en';
import { esTranslates } from './es';
import { etTranslates } from './et';
import { fiTranslates } from './fi';
import { frTranslates } from './fr';
import { gaTranslates } from './ga';
import { hrTranslates } from './hr';
import { huTranslates } from './hu';
import { itTranslates } from './it';
import { ltTranslates } from './lt';
import { lvTranslates } from './lv';
import { mtTranslates } from './mt';
import { nlTranslates } from './nl';
import { plTranslates } from './pl';
import { ptTranslates } from './pt';
import { roTranslates } from './ro';
import { skTranslates } from './sk';
import { slTranslates } from './sl';
import { svTranslates } from './sv';
import { uaTranslates } from './ua';

export const translates = {
	bg: bgTranslates,
	cs: csTranslates,
	da: daTranslates,
	de: deTranslates,
	el: elTranslates,
	en: enTranslates,
	es: esTranslates,
	et: etTranslates,
	fi: fiTranslates,
	fr: frTranslates,
	ga: gaTranslates,
	hr: hrTranslates,
	hu: huTranslates,
	it: itTranslates,
	lt: ltTranslates,
	lv: lvTranslates,
	mt: mtTranslates,
	nl: nlTranslates,
	pl: plTranslates,
	pt: ptTranslates,
	ro: roTranslates,
	sk: skTranslates,
	sl: slTranslates,
	sv: svTranslates,
	ua: uaTranslates,
};

export type LanguageKey = keyof typeof translates;
