import { AcceptedPaymentsType } from "./payments";

export type AnnouncementObject = {
    id: string,
    title: string;
    value: string;
    user_create: string;
    photos: string [];
    isActive: boolean;
    paymentModes: AcceptedPaymentsType [],

}