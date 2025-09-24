import { PersonalInfo, ResidentialInfo, ProfessionalInfo } from '@core/models';

export interface DataInfo {
  id: string | null;
  personal: PersonalInfo;
  residential: ResidentialInfo;
  professional: ProfessionalInfo;
}
