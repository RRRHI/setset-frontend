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
