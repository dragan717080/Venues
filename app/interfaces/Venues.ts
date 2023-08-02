import Venue from "./Venue";

export default interface Venues {
  num: number;
  details: Venue[];
  cityImg: string;
}

export interface VenuesAPIResponse {
  type: string;
  features: {
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
  }
}
