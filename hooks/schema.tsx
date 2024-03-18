export interface User {
  id: number;
  clerkId: string;
  admin: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  profilePicture?: string;
  orgId?: number;
  orgProfileId?: number;
  schoolId?: number;
  createdAt: Date;
  updatedAt: Date;
  invites: Invite[];
  scans: Scan[];
  org?: Org;
  orgProfile?: OrgProfile;
  school?: School;
}

export interface School {
  id: number;
  name: string;
  city: string;
  state: string;
  createdAt: Date;
  updatedAt: Date;
  users: User[];
  orgs: Org[];
}

export interface Org {
  id: number;
  name: string;
  liveEventId?: number;
  schoolId: number;
  createdAt: Date;
  updatedAt: Date;
  members: User[];
  events: Event[];
  school: School;
}

export interface OrgProfile {
  id: number;
  owner: boolean;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  scans: Scan[];
}

export interface Event {
  id: number;
  name: string;
  description: string;
  location?: string;
  date?: Date;
  startTime?: Date;
  endTime?: Date;
  live: boolean;
  orgId: number;
  createdAt: Date;
  updatedAt: Date;
  invites: Invite[];
  pendingInvites: PendingInvite[];
  org: Org;
}

export interface Invite {
  id: number;
  userId: number;
  eventId: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  event: Event;
}

export interface Scan {
  id: number;
  accepted: boolean;
  eventId: number;
  inviteId?: number;
  userId: number;
  createdById: number;
  createdAt: Date;
  user: User;
  createdBy: OrgProfile;
}

export interface PendingInvite {
  id: number;
  phoneNumber: string;
  eventId: number;
  createdAt: Date;
  updatedAt: Date;
  event: Event;
}

export enum ScanStatus {
  ACCEPTED = "ACCEPTED",
  DENIED = "DENIED",
}
