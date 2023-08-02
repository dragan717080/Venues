import Venue from "./Venue";
import VenuesAPIResponseItem from "./VenuesAPIResponseItem";

export default interface Venues {
  num: number;
  details: Venue[];
  cityImg: string;
}

export interface VenuesAPIResponse {
  type: string;
  features: VenuesAPIResponseItem[];
}
