import { ReactElement } from "react";
import { DateRange } from "react-day-picker";

export const containerClassname = "flex w-full flex-col gap-6 p-4 pt-0";
export type DateContextType = {
  dateRange?: DateRange;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
};

export type MetricsData = {
  callMinutes: {
    minutes: number;
    difference: number;
  };
  moneySaved: {
    money: number;
    difference: number;
  };
  timeSaved: {
    time: number;
    difference: number;
  };
  newCallers: {
    callers: number;
    difference: number;
  };
  appointmentsBooked: {
    appointments: number;
    difference: number;
  };
  satisfactionScore: {
    score: number;
    difference: number;
  };
};

export type FaqData = {
  id: string;
  question: string;
  answer: string;
  frequency: number;
  icon: React.ReactNode;
  timeRangeStart: string;
  timeRangeEnd: string;
};

export type AppointmentsData = {
  date: string;
  booked: number;
  transferred: number;
};

export type CallRecording = {
  id: string;
  date: string;
  category: "Booking" | "Cancellation" | "General Inquiry" | "Reschedule";
  confidenceScore: number;
  duration: string;
  recordingUrl: string;
  transcriptUrl: string;
};

export type AppointmentsRadar = {
  type: "Booked" | "Cancelled" | "Transferred" | "Rescheduled";
  customers: number;
};

export type BusinessStat = {
  //name: string;
  callMinutes: number;
  moneySaved: number;
  satisfaction: number;
  newCallers: number;
};

export type BusinessCard = {
  id: string;
  icon: ReactElement;
  title: string;
  value: number;
};

export type BusinessInfo = {
  id: string;
  title: string;
  content: string;
  cards: BusinessCard[];
};
export type notificationObject = {
  id: number;
  type: string;
  title: string;
  content: string;
  time: string;
  icon: React.ReactNode;
  read: boolean;
};

export type sideBarPageProp = {
  title: string;
  url: string;
  icon: React.ReactNode;
};
export type settingSVGProp ={
  fillProp: string;
  circleProp: string;
  className: string;
};
export interface ReportData {
  id: string;
  title: string;
  description: string;
  date: string;
  category: "Call related" | "Other for now"
  status: "Pending" | "Resolved";
};
export interface ProfileData
{
  name:string;
  category:string;
  email:string;
};
export interface InvoiceData {
  id: string;
  date: string;
  transcriptURL: string;
}
