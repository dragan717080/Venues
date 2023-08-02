export default interface VenuesAPIResponseItem {
  id: string | number;
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    xid: string;
    name: string;
    dist: number;
    rate: number;
    wikidata: string;
    kinds: string;
  }
};
