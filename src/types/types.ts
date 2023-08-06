export interface OrganizationType {
  name: string;
  country: string;
  slug: string;
  slogan: string;
  description: string;
  field: string;
  goal: string;
  img: string;
  social: {
    facebook: string;
    instagram: string;
    linkedln: string;
  }[];
  md: string;
  logo: string;
}
