export type Job = {
  id: string;
  uid: string;
  title: string;
  date: string;
  technologies: string[];
  technologyUids?: string[];
  description: string;
  adminEmails: string[];
  lastPublicationDate: string;
};

export type Technology = {
  name: string;
  uid: string;
};

export type JobApplication = {
  id: string;
  jobId: string;
  jobUid: string;
  jobTitle: string;
  date: string;
  technologies: string[];
  message: string;
};

export type HomePageContent = {
  title: string;
  introduction: string;
};

export type SiteSettings = {
  logoText: string;
};
