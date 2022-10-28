import type semver from "semver";
import type { ContactObject } from "./ContactObject";
import type { LicenseObject } from "./LicenseObject";

interface InfoObject {
  title: string;
  summary?: string;
  description?: string;
  termsOfService?: string;
  contact?: ContactObject;
  license?: LicenseObject;
  version: semver.SemVer;
}

export type { InfoObject };
