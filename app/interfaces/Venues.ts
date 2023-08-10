import Venue from "./Venue";
import VenuesAPIResponseItem from "./VenuesAPIResponseItem";

export default interface Venues {
  cityImg: string;
  details: Venue[];
}

//opentripmap api response
export interface VenuesAPIResponse {
  type: string;
  features: VenuesAPIResponseItem[];
}
