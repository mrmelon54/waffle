import semver from "semver";
import { ContactObject } from "./ContactObject";
import { LicenseObject } from "./LicenseObject";

export interface InfoObject {
  title: string;
  summary?: string;
  description?: string;
  termsOfService?: string;
  contact?: ContactObject;
  license?: LicenseObject;
  version: semver.SemVer;
}
