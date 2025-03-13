import {
  CircleHelp,
  Home,
  MonitorCheck,
  ShieldAlert,
  ThumbsUp,
  TimerReset,
  Users,
  UsersRound,
  Voicemail,
  WalletMinimal,
} from "lucide-react";

import Settings from "@/lib/settings";

import {
  AppointmentsData,
  BusinessStat,
  BusinessInfo,
  CallRecording,
  FaqData,
  MetricsData,
  BusinessCard,
  sideBarPageProp,
} from "./types";

export const metricsData: MetricsData = {
  callMinutes: { minutes: 100227, difference: -1.4 },
  moneySaved: { money: 601194, difference: 2.5 },
  timeSaved: { time: 100227, difference: 1.8 },
  newCallers: { callers: 66813, difference: -0.5 },
  appointmentsBooked: { appointments: 57267, difference: 0.7 },
  satisfactionScore: { score: 9.7, difference: 0.3 },
};

export const chartData: AppointmentsData[] = [
  { date: "2024-04-01", booked: 222, transferred: 150 },
  { date: "2024-04-02", booked: 97, transferred: 180 },
  { date: "2024-04-03", booked: 167, transferred: 120 },
  { date: "2024-04-04", booked: 242, transferred: 260 },
  { date: "2024-04-05", booked: 373, transferred: 290 },
  { date: "2024-04-06", booked: 301, transferred: 340 },
  { date: "2024-04-07", booked: 245, transferred: 180 },
  { date: "2024-04-08", booked: 409, transferred: 320 },
  { date: "2024-04-09", booked: 59, transferred: 110 },
  { date: "2024-04-10", booked: 261, transferred: 190 },
  { date: "2024-04-11", booked: 327, transferred: 350 },
  { date: "2024-04-12", booked: 292, transferred: 210 },
  { date: "2024-04-13", booked: 342, transferred: 380 },
  { date: "2024-04-14", booked: 137, transferred: 220 },
  { date: "2024-04-15", booked: 120, transferred: 170 },
  { date: "2024-04-16", booked: 138, transferred: 190 },
  { date: "2024-04-17", booked: 446, transferred: 360 },
  { date: "2024-04-18", booked: 364, transferred: 410 },
  { date: "2024-04-19", booked: 243, transferred: 180 },
  { date: "2024-04-20", booked: 89, transferred: 150 },
  { date: "2024-04-21", booked: 137, transferred: 200 },
  { date: "2024-04-22", booked: 224, transferred: 170 },
  { date: "2024-04-23", booked: 138, transferred: 230 },
  { date: "2024-04-24", booked: 387, transferred: 290 },
  { date: "2024-04-25", booked: 215, transferred: 250 },
  { date: "2024-04-26", booked: 75, transferred: 130 },
  { date: "2024-04-27", booked: 383, transferred: 420 },
  { date: "2024-04-28", booked: 122, transferred: 180 },
  { date: "2024-04-29", booked: 315, transferred: 240 },
  { date: "2024-04-30", booked: 454, transferred: 380 },
  { date: "2024-05-01", booked: 165, transferred: 220 },
  { date: "2024-05-02", booked: 293, transferred: 310 },
  { date: "2024-05-03", booked: 247, transferred: 190 },
  { date: "2024-05-04", booked: 385, transferred: 420 },
  { date: "2024-05-05", booked: 481, transferred: 390 },
  { date: "2024-05-06", booked: 498, transferred: 520 },
  { date: "2024-05-07", booked: 388, transferred: 300 },
  { date: "2024-05-08", booked: 149, transferred: 210 },
  { date: "2024-05-09", booked: 227, transferred: 180 },
  { date: "2024-05-10", booked: 293, transferred: 330 },
  { date: "2024-05-11", booked: 335, transferred: 270 },
  { date: "2024-05-12", booked: 197, transferred: 240 },
  { date: "2024-05-13", booked: 197, transferred: 160 },
  { date: "2024-05-14", booked: 448, transferred: 490 },
  { date: "2024-05-15", booked: 473, transferred: 380 },
  { date: "2024-05-16", booked: 338, transferred: 400 },
  { date: "2024-05-17", booked: 499, transferred: 420 },
  { date: "2024-05-18", booked: 315, transferred: 350 },
  { date: "2024-05-19", booked: 235, transferred: 180 },
  { date: "2024-05-20", booked: 177, transferred: 230 },
  { date: "2024-05-21", booked: 82, transferred: 140 },
  { date: "2024-05-22", booked: 81, transferred: 120 },
  { date: "2024-05-23", booked: 252, transferred: 290 },
  { date: "2024-05-24", booked: 294, transferred: 220 },
  { date: "2024-05-25", booked: 201, transferred: 250 },
  { date: "2024-05-26", booked: 213, transferred: 170 },
  { date: "2024-05-27", booked: 420, transferred: 460 },
  { date: "2024-05-28", booked: 233, transferred: 190 },
  { date: "2024-05-29", booked: 78, transferred: 130 },
  { date: "2024-05-30", booked: 340, transferred: 280 },
  { date: "2024-05-31", booked: 178, transferred: 230 },
  { date: "2024-06-01", booked: 178, transferred: 200 },
  { date: "2024-06-02", booked: 470, transferred: 410 },
  { date: "2024-06-03", booked: 103, transferred: 160 },
  { date: "2024-06-04", booked: 439, transferred: 380 },
  { date: "2024-06-05", booked: 88, transferred: 140 },
  { date: "2024-06-06", booked: 294, transferred: 250 },
  { date: "2024-06-07", booked: 323, transferred: 370 },
  { date: "2024-06-08", booked: 385, transferred: 320 },
  { date: "2024-06-09", booked: 438, transferred: 480 },
  { date: "2024-06-10", booked: 155, transferred: 200 },
  { date: "2024-06-11", booked: 92, transferred: 150 },
  { date: "2024-06-12", booked: 492, transferred: 420 },
  { date: "2024-06-13", booked: 81, transferred: 130 },
  { date: "2024-06-14", booked: 426, transferred: 380 },
  { date: "2024-06-15", booked: 307, transferred: 350 },
  { date: "2024-06-16", booked: 371, transferred: 310 },
  { date: "2024-06-17", booked: 475, transferred: 520 },
  { date: "2024-06-18", booked: 107, transferred: 170 },
  { date: "2024-06-19", booked: 341, transferred: 290 },
  { date: "2024-06-20", booked: 408, transferred: 450 },
  { date: "2024-06-21", booked: 169, transferred: 210 },
  { date: "2024-06-22", booked: 317, transferred: 270 },
  { date: "2024-06-23", booked: 480, transferred: 530 },
  { date: "2024-06-24", booked: 132, transferred: 180 },
  { date: "2024-06-25", booked: 141, transferred: 190 },
  { date: "2024-06-26", booked: 434, transferred: 380 },
  { date: "2024-06-27", booked: 448, transferred: 490 },
  { date: "2024-06-28", booked: 149, transferred: 200 },
  { date: "2024-06-29", booked: 103, transferred: 160 },
  { date: "2024-06-30", booked: 446, transferred: 400 },
];

export const callRecordingsData: CallRecording[] = [
  {
    id: "1",
    date: "2025-02-10",
    category: "Booking",
    confidenceScore: 9.8,
    duration: "0:18",
    recordingUrl:
      "https://actions.google.com/sounds/v1/cartoon/rainstick_slow.ogg",
    transcriptUrl: "https://example.com/recording1.pdf",
  },
  {
    id: "2",
    date: "2025-02-08",
    category: "Cancellation",
    confidenceScore: 9.9,
    duration: "0:50",
    recordingUrl:
      "https://actions.google.com/sounds/v1/ambiences/barnyard_with_animals.ogg",
    transcriptUrl: "https://example.com/recording2.pdf",
  },
  {
    id: "3",
    date: "2025-02-18",
    category: "Reschedule",
    confidenceScore: 9.9,
    duration: "7:48",
    recordingUrl: "https://example.com/recording3.mp3",
    transcriptUrl: "https://example.com/recording3.pdf",
  },
  {
    id: "4",
    date: "2025-02-20",
    category: "General Inquiry",
    confidenceScore: 9.9,
    duration: "4:56",
    recordingUrl: "https://example.com/recording4.mp3",
    transcriptUrl: "https://example.com/recording4.pdf",
  },
  {
    id: "5",
    date: "2025-01-20",
    category: "Cancellation",
    confidenceScore: 9.9,
    duration: "6:12",
    recordingUrl: "https://example.com/recording5.mp3",
    transcriptUrl: "https://example.com/recording5.pdf",
  },
];

export const initialNotifications = [
  {
    id: 1,
    type: "message",
    title: "New Message from achu",
    content: "Hey! Are we still on for the meeting?",
    time: "2 mins ago",
    img: "https://th.bing.com/th/id/OIP.47NEVXcBGruaDflMzJAsDwAAAA?rs=1&pid=ImgDetMain",
    read: false,
  },
  {
    id: 2,
    type: "alert",
    title: "System Update",
    content: "We've detected unsuall activities on your account.",
    time: "10 mins ago",
    img: "https://th.bing.com/th/id/R.a54aae27898553c7865346e0ca2a9ceb?rik=G%2bPKqgYavMXWAQ&pid=ImgRaw&r=0",
    read: false,
  },
  {
    id: 3,
    type: "friend_request",
    title: "New Friend Request",
    content: "Jordan sent you a friend request.",
    time: "30 mins ago",
    img: "https://randomuser.me/api/portraits/women/2.jpg",
    read: true,
  },
  {
    id: 4,
    type: "mention",
    title: "You were mentioned!",
    content: "Sophia mentioned you in a comment.",
    time: "1 hour ago",
    img: "https://cdn-icons-png.flaticon.com/512/2958/2958783.png",
    read: false,
  },
  {
    id: 5,
    type: "reminder",
    title: "Event Reminder",
    content: "Don't forget about the project deadline tomorrow!",
    time: "3 hours ago",
    img: "https://cdn-icons-png.flaticon.com/512/716/716225.png",
    read: true,
  },
];
const iconStyles =
  "lg:h-10 lg:w-10 text-white dark:text-black h-8 w-8 bg-black dark:bg-white rounded-lg p-2";
export const faqsData: FaqData[] = [
  {
    id: "1",
    question: "How accurate is the AI understanding customer inquiries?",
    answer:
      "Our AI is trained with advanced speech recognition and natural language processing (NLP), achieving an average accuracy rate of 90-95%. However, accuracy can vary based on background noise, accents, and industry-specific terms.",
    frequency: 32,
    icon: <Voicemail className={iconStyles} />,
    timeRangeStart: "4:00 PM",
    timeRangeEnd: "6:00 PM",
  },
  {
    id: "2",
    question: "Can AI handle bookings, cancellations, and reschedules?",
    answer:
      "Yes! The AI is designed to automate appointment management. It can:\nSchedule new bookings based on availability,\nCancel existing appointments upon request,\nReschedule based on open time slots,\nAll updates sync with the business's calendar and CRM system.",
    frequency: 22,
    icon: <TimerReset className={iconStyles} />,
    timeRangeStart: "6:00 PM",
    timeRangeEnd: "8:00 PM",
  },
  {
    id: "3",
    question: "How accurate is the AI in understanding customer inquiries?",
    answer:
      'If the AI detects low confidence in its response or the caller requests a human agent, it will: Transfer the call to an available representative, Send a detailed summary of the conversation to the agent, Log the request in the dashboard under "Escalated Calls" for review. Businesses can customize escalation thresholds and triggers in the settings.',
    frequency: 18,
    icon: <Users className={iconStyles} />,
    timeRangeStart: "4:00 PM",
    timeRangeEnd: "9:30 PM",
  },
  {
    id: "4",
    question: "How accurate is the AI in understanding customer inquiries?",
    answer:
      "Our AI is trained with advanced speech recognition and natural language processing (NLP), achieving an average accuracy rate of 90-95%. However, accuracy can vary based on background noise, accents, and industry-specific terms.",
    frequency: 32,
    icon: <WalletMinimal className={iconStyles} />,
    timeRangeStart: "9:00 AM",
    timeRangeEnd: "10:00 AM",
  },
  {
    id: "5",
    question: "How accurate is the AI in understanding customer inquiries?",
    answer:
      "Our AI is trained with advanced speech recognition and natural language processing (NLP), achieving an average accuracy rate of 90-95%. However, accuracy can vary based on background noise, accents, and industry-specific terms.",
    frequency: 32,
    icon: <MonitorCheck className={iconStyles} />,
    timeRangeStart: "10:00 AM",
    timeRangeEnd: "12:00 PM",
  },
  {
    id: "6",
    question: "What is the average time saved per call?",
    answer:
      " On average, our AI saves businesses 2-3 minutes per call. This time is spent on repetitive tasks like verifying customer information, scheduling appointments, and answering common questions. Over time, these minutes add up to significant cost and time savings.",
    frequency: 32,
    icon: <TimerReset className={iconStyles} />,
    timeRangeStart: "4:00 PM",
    timeRangeEnd: "6:00 PM",
  },
];

const testData: BusinessStat = {
  callMinutes: 123456,
  moneySaved: 601194,
  satisfaction: 5.5,
  newCallers: 6789,
};

//Metric Card for this test business
const BusinessIconStyles =
  "lg:h-14 lg:w-14 text-white dark:text-black h-12 w-12 bg-black dark:bg-white rounded-lg p-3";
const cards: BusinessCard[] = [
  {
    id: "money-saved",
    icon: <WalletMinimal className={BusinessIconStyles}/>,
    title: "Money Saved",
    value: testData.moneySaved,
  },
  {
    id: "satisfaction",
    icon: <ThumbsUp className={BusinessIconStyles}/>,
    title: "Satisfaction",
    value: testData.satisfaction,
  },
  {
    id: "minutes-saved",
    icon: <TimerReset className={BusinessIconStyles}/>,
    title: "Minutes Saved",
    value: testData.callMinutes,
  },
  {
    id: "new-callers",
    icon: <UsersRound className={BusinessIconStyles}/>,
    title: "New Callers",
    value: testData.newCallers,
  },
];

const cards2: BusinessCard[] = [
  {
    id: "money-saved",
    icon: <WalletMinimal className={BusinessIconStyles}/>,
    title: "Money Saved",
    value: testData.moneySaved,
  },
  {
    id: "satisfaction",
    icon: <ThumbsUp className={BusinessIconStyles}/>,
    title: "Satisfaction",
    value: testData.satisfaction,
  },
  {
    id: "minutes-saved",
    icon: <TimerReset className={BusinessIconStyles}/>,
    title: "Minutes Saved",
    value: 1000000,
  },
  {
    id: "new-callers",
    icon: <UsersRound className={BusinessIconStyles}/>,
    title: "New Callers",
    value: testData.newCallers,
  },
];

//Test data for business

export const business: BusinessInfo[] = [
  {
    id: "1",
    title: "Business Name 1",
    content: "Description 1",
    cards: cards,
  },
  {
    id: "2",
    title: "Business Name 2",
    content: "Description 2",
    cards: cards,
  },
  {
    id: "3",
    title: "Business Name 3",
    content: "Description 3",
    cards: cards,
  },
  {
    id: "4",
    title: "Business Name 4",
    content: "Description 4",
    cards: cards,
  },
  {
    id: "5",
    title: "Business Name 5",
    content: "Description 5",
    cards: cards,
  },
  {
    id: "6",
    title: "Business Name 6",
    content: "Description 6",
    cards: cards,
  },
  {
    id: "7",
    title: "Business Name 7",
    content: "Description 7",
    cards: cards2,
  },
  {
    id: "8",
    title: "Business Name 8",
    content: "Description 8",
    cards: cards,
  },
  {
    id: "9",
    title: "Business Name 9",
    content: "Description 9",
    cards: cards,
  },
  {
    id: "10",
    title: "Business Name 10345",
    content: "Description 10",
    cards: cards,
  },
  {
    id: "11",
    title: "Business Name 11",
    content: "Description 11",
    cards: cards,
  },
];

export const items: sideBarPageProp[] = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Recordings & Transcripts",
    url: "#",
    icon: Voicemail,
  },
  {
    title: "FAQs",
    url: "#",
    icon: CircleHelp,
  },
  {
    title: "Reports",
    url: "#",
    icon: ShieldAlert,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
