import { Bell, CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { initialNotifications } from "@/lib/sampleData";
import { notificationObject } from "@/lib/types";


export function NotificationList({
  notifications,
  removeNotification,
}: {
  notifications: notificationObject[];
  removeNotification: (id: number) => void;
}) {
  return notifications.length > 0 ? (
    notifications.map((notification) => (
      <div
        key={notification.id}
        className="relative mb-4 flex items-center space-x-4 pt-3 "
      >
        <Avatar>
          <AvatarImage src={notification.img} />
          <AvatarFallback>Setset</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">
            {notification.title}
          </p>
          <p className="text-sm text-muted-foreground">
            {notification.content}
          </p>
          <div className="flex items-center pt-2">
            <CalendarIcon className="mr-2 size-4 opacity-70" />
            <span className="text-xs text-muted-foreground">
              {notification.time}
            </span>
          </div>
        </div>
        <button
          onClick={() => removeNotification(notification.id)}
          className="absolute right-1 top-1 text-gray-500 hover:text-red-500 focus-visible:outline-none"
        >
          ✕
        </button>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500">No new notifications</p>
  );
}

const notificationAlert = (len: number) => {
  return (
    <div className="relative flex items-center justify-center">
      <Bell className="!size-5 fill-foreground stroke-foreground sm:!size-6" />
      {len > 0 && (
        <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">

          {len}
        </span>
      )}
    </div>
  );
};


export function MobileNotification({
  notifications,
  removeNotification,
}: {
  notifications: notificationObject[];
  removeNotification: (id: number) => void;
}) {
  return (
    <Sheet >
      <SheetTrigger className="cursor-pointer">
      {notificationAlert(notifications.length)}
      </SheetTrigger>
      <SheetContent className="rounded-l-xl"  autoFocus={false} >
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <NotificationList
          notifications={notifications}
          removeNotification={removeNotification}
        />
      </SheetContent>
    </Sheet>
  );
}

export function DesktopNotification({
  notifications,
  removeNotification,
}: {
  notifications: notificationObject[];
  removeNotification: (id: number) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer">
        {notificationAlert(notifications.length)}
      </PopoverTrigger>
      <PopoverContent className="w-80 rounded-xl">
        <NotificationList
          notifications={notifications}
          removeNotification={removeNotification}
        />
      </PopoverContent>
    </Popover>


  );
}

export default function Notification() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 600);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return isMobile ? (
    <MobileNotification
      notifications={notifications}
      removeNotification={removeNotification}
    />
  ) : (
    <DesktopNotification
      notifications={notifications}
      removeNotification={removeNotification}
    />
  );
}
