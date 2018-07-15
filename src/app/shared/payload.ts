import { deserialize } from 'cerialize';

export class Payload {
//Engine information
  @deserialize DisplacementCC:number;
  @deserialize DisplacementCI:number;
  @deserialize DisplacementL:number;
  @deserialize EngineCylinders:number;
  @deserialize EngineModel:string;
  @deserialize FuelInjectionType:string;
  @deserialize FuelTypePrimary:string;
  @deserialize FuelTypeSecondary:string;
//Safety
  @deserialize AirBagLocCurtain:string;
  @deserialize AirBagLocFront:string;
  @deserialize AirBagLocSide:string;
  @deserialize SeatBeltsAll:string;
//Build Information
  @deserialize Make:string;
  @deserialize Manufacturer:string;
  @deserialize ManufacturerId:number;
  @deserialize Model:string;
  @deserialize ModelYear:number;
  @deserialize PlantCity:string;
  @deserialize PlantCompanyName:string;
  @deserialize PlantState:string;
  @deserialize PlantCountry:string;
//Miscellaneous
  @deserialize ErrorCode:string;
  @deserialize AdditionalErrorText:string;
  @deserialize BodyClass:string;
  @deserialize GVWR:string;
  @deserialize Series:string;
  @deserialize Trim:string;
  @deserialize VIN:string;
  @deserialize VehicleType:string;
  @deserialize TPMS:string;
  @deserialize DriveType:string;
  @deserialize Doors:number;
  @deserialize BrakeSystemType:string;
}
