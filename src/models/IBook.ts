export interface IBook {
  allowAnonLogging: boolean;
  authors: Array<any>;
  averageRating: number;
  canonicalVolumeLink: string;
  categories: Array<string>;
  contentVersion: string;
  description: string;
  id: string;
  imageLinks: any;
  industryIdentifiers: Array<any>;
  infoLink: string;
  language: string;
  maturityRating: string;
  pageCount: number;
  panelizationSummary: object;
  previewLink: string;
  printType: string;
  publishedDate: string;
  publisher: string;
  ratingsCount: number;
  readingModes: object;
  shelf: string;
  subtitle: string;
  title: string;
}
