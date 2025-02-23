export type MetricsData = {
  callMinutes: number;
  moneySaved: number;
  timeSaved: number;
  newCallers: number;
  appointmentsBooked: number;
  satisfaction: number;
};

export type FaqData = {
  id: string;
  question: string;
  frequency: number;
  dates: string[];
};

export type AppointmentsData = {
  booked: number;
  cancelled: number;
  rescheduled: number;
  transferred: number;
};

export type CallRecording = {
  id: string;
  date: string;
  invoice: string;
  status: "Booked" | "Cancelled" | "Transferred" | "Rescheduled";
  duration: string;
  recordingUrl: string;
  transcriptUrl: string;
};

export type AppointmentsRadar = {
  type: "Booked" | "Cancelled" | "Transferred" | "Rescheduled";
  customers: number;
};
