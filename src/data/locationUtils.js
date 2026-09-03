/** ISO 3166-1 alpha-2 codes for JSearch API `country` param */
export const LOCATION_ISO_CODES = {
  Dubai: 'ae',
  Pakistan: 'pk',
  India: 'in',
  Remote: null,
  Afghanistan: 'af',
  Albania: 'al',
  Algeria: 'dz',
  Argentina: 'ar',
  Armenia: 'am',
  Australia: 'au',
  Austria: 'at',
  Azerbaijan: 'az',
  Bahrain: 'bh',
  Bangladesh: 'bd',
  Belarus: 'by',
  Belgium: 'be',
  Bolivia: 'bo',
  'Bosnia and Herzegovina': 'ba',
  Brazil: 'br',
  Brunei: 'bn',
  Bulgaria: 'bg',
  Cambodia: 'kh',
  Canada: 'ca',
  Chile: 'cl',
  China: 'cn',
  Colombia: 'co',
  'Costa Rica': 'cr',
  Croatia: 'hr',
  Cyprus: 'cy',
  'Czech Republic': 'cz',
  Denmark: 'dk',
  'Dominican Republic': 'do',
  Ecuador: 'ec',
  Egypt: 'eg',
  Estonia: 'ee',
  Ethiopia: 'et',
  Fiji: 'fj',
  Finland: 'fi',
  France: 'fr',
  Georgia: 'ge',
  Germany: 'de',
  Ghana: 'gh',
  Greece: 'gr',
  Guatemala: 'gt',
  'Hong Kong': 'hk',
  Hungary: 'hu',
  Iceland: 'is',
  Indonesia: 'id',
  Iran: 'ir',
  Iraq: 'iq',
  Ireland: 'ie',
  Israel: 'il',
  Italy: 'it',
  Japan: 'jp',
  Jordan: 'jo',
  Kazakhstan: 'kz',
  Kenya: 'ke',
  Kuwait: 'kw',
  Latvia: 'lv',
  Lebanon: 'lb',
  Lithuania: 'lt',
  Luxembourg: 'lu',
  Malaysia: 'my',
  Maldives: 'mv',
  Malta: 'mt',
  Mauritius: 'mu',
  Mexico: 'mx',
  Mongolia: 'mn',
  Morocco: 'ma',
  Myanmar: 'mm',
  Nepal: 'np',
  Netherlands: 'nl',
  'New Zealand': 'nz',
  Nigeria: 'ng',
  'North Macedonia': 'mk',
  Norway: 'no',
  Oman: 'om',
  Panama: 'pa',
  Paraguay: 'py',
  Peru: 'pe',
  Philippines: 'ph',
  Poland: 'pl',
  Portugal: 'pt',
  'Puerto Rico': 'pr',
  Qatar: 'qa',
  Romania: 'ro',
  Russia: 'ru',
  'Saudi Arabia': 'sa',
  Serbia: 'rs',
  Singapore: 'sg',
  Slovakia: 'sk',
  Slovenia: 'si',
  'South Africa': 'za',
  'South Korea': 'kr',
  Spain: 'es',
  'Sri Lanka': 'lk',
  Sweden: 'se',
  Switzerland: 'ch',
  Taiwan: 'tw',
  Tanzania: 'tz',
  Thailand: 'th',
  Tunisia: 'tn',
  Turkey: 'tr',
  Uganda: 'ug',
  Ukraine: 'ua',
  'United Arab Emirates': 'ae',
  'United Kingdom': 'gb',
  'United States': 'us',
  Uruguay: 'uy',
  Uzbekistan: 'uz',
  Venezuela: 've',
  Vietnam: 'vn',
  Zambia: 'zm',
  Zimbabwe: 'zw',
};

/** Extra text tokens used to verify a job belongs to the requested location */
export const LOCATION_MATCH_TERMS = {
  Dubai: ['dubai', 'uae', 'united arab emirates', 'ae', 'sharjah', 'abu dhabi'],
  Pakistan: ['pakistan', 'pk', 'karachi', 'lahore', 'islamabad', 'rawalpindi', 'faisalabad'],
  India: ['india', 'in', 'bangalore', 'bengaluru', 'mumbai', 'delhi', 'hyderabad', 'chennai', 'pune', 'gurgaon', 'noida'],
  'United States': ['united states', 'usa', 'u.s.', 'u.s.a.', 'us'],
  'United Kingdom': ['united kingdom', 'uk', 'u.k.', 'gb', 'england', 'scotland', 'wales', 'london'],
  'United Arab Emirates': ['united arab emirates', 'uae', 'ae', 'dubai', 'abu dhabi'],
  'South Korea': ['south korea', 'korea', 'kr', 'seoul'],
  'Czech Republic': ['czech republic', 'czechia', 'cz', 'prague'],
  'Sri Lanka': ['sri lanka', 'lk', 'colombo'],
  'New Zealand': ['new zealand', 'nz', 'auckland', 'wellington'],
  'South Africa': ['south africa', 'za', 'johannesburg', 'cape town'],
  'Costa Rica': ['costa rica', 'cr', 'san josé', 'san jose'],
  'Hong Kong': ['hong kong', 'hk'],
  'Puerto Rico': ['puerto rico', 'pr', 'san juan'],
  Remote: [],
};
  return LOCATION_ISO_CODES[locationId] ?? null;
}

export function getLocationMatchTerms(locationId) {
  if (LOCATION_MATCH_TERMS[locationId]) return LOCATION_MATCH_TERMS[locationId];
  const iso = getLocationIsoCode(locationId);
  const terms = [locationId.toLowerCase()];
  if (iso) terms.push(iso);
  return terms;
}

function normalizeText(value) {
  return (value || '').toLowerCase().trim();
}

function textMatchesTerm(text, term) {
  if (!term) return false;
  if (term.length <= 2) {
    return text === term || text.split(/[\s,/]+/).includes(term);
  }
  return text.includes(term);
}

export function rawJobMatchesLocation(job, requestedLocation) {
  if (requestedLocation === 'Remote') {
    return job?.job_is_remote === true;
  }

  const terms = getLocationMatchTerms(requestedLocation);
  const iso = getLocationIsoCode(requestedLocation);
  const country = normalizeText(job?.job_country);
  const city = normalizeText(job?.job_city);
  const state = normalizeText(job?.job_state);
  const combined = `${city} ${state} ${country}`.trim();

  if (iso && (country === iso || textMatchesTerm(country, iso))) return true;

  return terms.some((term) => textMatchesTerm(combined, term) || textMatchesTerm(country, term));
}

export function filterRawJobsByLocation(rawJobs, requestedLocation) {
  if (!Array.isArray(rawJobs) || rawJobs.length === 0) return [];
  const filtered = rawJobs.filter((job) => rawJobMatchesLocation(job, requestedLocation));
  return filtered;
}

export function processedJobMatchesLocation(job, requestedLocation) {
  if (requestedLocation === 'Remote') {
    return job?.is_remote === true || job?.isRemote === true;
  }

  if (job?.country === requestedLocation) return true;

  const terms = getLocationMatchTerms(requestedLocation);
  const locationText = normalizeText(
    [job?.location, job?.city, job?.country, job?.state].filter(Boolean).join(' ')
  );

  return terms.some((term) => textMatchesTerm(locationText, term));
}

export function filterProcessedJobsByLocation(jobs, requestedLocation) {
  if (!Array.isArray(jobs) || jobs.length === 0) return [];
  return jobs.filter((job) => processedJobMatchesLocation(job, requestedLocation));
}

export function formatJobLocationString(job, fallbackLocation) {
  const city = job?.job_city || job?.city;
  const state = job?.job_state || job?.state;
  const country = job?.job_country || job?.country || fallbackLocation;

  if (city && country && city.toLowerCase() !== country.toLowerCase()) {
    return state ? `${city}, ${state}, ${country}` : `${city}, ${country}`;
  }
  if (city) return city;
  if (country) return country;
  return fallbackLocation;
}
