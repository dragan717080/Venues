export default interface Venue {
  xid: string;
  country: string;
  country_code: string;
  image?: string;
  img?: string;
  kinds: string[];
  name: string;
  neighbourhood?: string;
  rate: number;
  state?: string;
  preview?: string;
  wikidata?: string;
  wikipedia: string;
  wikipedia_extract: string;
  wikipedia_extract_html: string;
  cityId?: string;
}
