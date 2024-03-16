export interface User {
  id: string;
  clerkId: string;
  admin: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  profilePicture?: string;
  organizationId?: string;
  invitesIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Organization {
  id: string;
  name: string;
  ownerIds: string[];
  liveEventId?: string;
  membersIds: string[];
  numMembers: number;
  eventsIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  location?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  live: boolean;
  numEntered: number;
  numDenied: number;
  invitesIds: string[];
  numInvites: number;
  pendingInvitesIds: string[];
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invite {
  id: string;
  userId: string;
  eventId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Scan {
  id: string;
  inviteId?: string;
  userId: string;
  eventId: string;
  accepted: boolean;
  scannedBy: string;
  createdAt: Date;
}

export interface PendingInvite {
  id: string;
  phoneNumber: string;
  eventId: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ScanStatus {
  ACCEPTED = "ACCEPTED",
  DENIED = "DENIED",
}
