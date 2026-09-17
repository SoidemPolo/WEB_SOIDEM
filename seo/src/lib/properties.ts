/**
 * Las propiedades web de SOIDEM. Los subdominios de producto también son
 * servicios nuestros, así que se vigilan igual que el sitio principal.
 */
export type Property = {
  id: string;
  name: string;
  url: string;
  /** Producto al que pertenece, si el sitio es de uno. */
  producto?: string;
  color: string;
};

export const PROPERTIES: Property[] = [
  {
    id: "soidemdt",
    name: "soidemdt.com",
    url: "https://www.soidemdt.com/",
    color: "#1E798D",
  },
  {
    id: "captur",
    name: "captur.soidemdt.com",
    url: "https://captur.soidemdt.com/",
    producto: "Captur",
    color: "#FE5151",
  },
  {
    id: "factur",
    name: "factur.soidemdt.com",
    url: "https://factur.soidemdt.com/",
    producto: "Factur",
    color: "#5B5BE0",
  },
  {
    id: "tms",
    name: "tms.soidemdt.com",
    url: "https://tms.soidemdt.com/",
    producto: "TMS",
    color: "#10B981",
  },
];
