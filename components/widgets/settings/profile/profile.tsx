import { ChevronDown, Pencil } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProfileImage } from "@/components/widgets/settings/profile/profile-image";
import {dropDownButtonFormat, dropDownFieldFormat,profileComponentFormat,settingCard, settingLabel} from "@/lib/constant";
import { cn } from "@/lib/utils";

import EditableField from "./editable-field";







export function ProfilePage() {
  const [name, setName] = useState("Business Name");
  const [newName, setNewName] = useState(name);

  const validateName = (input: string) => {
    return input.trim().length >= 5; // Custom validation: at least 3 characters
  };

  const [email, setEmail] = useState("ExampleEmail@org.com");
  const [newEmail, setNewEmail] = useState(email);
  const validateEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input.trim());
  };

  const [phone, setPhone] = useState("0123456789");
  const [newPhone, setNewPhone] = useState(phone);
  const validatePhone = (input: string) => {
    const phoneRegex = /^\d{8,}$/;
    return phoneRegex.test(input.trim());
  };

  const [category, setCategory] = useState("Business Category");

  const [isEditing, setIsEditing] = useState(false);
  const uniqueCategories = [
    "Retail & Ecommerce",
    "Healthcare",
    "Tech",
    "Finance",
  ];

  const imageSize = 100;
  const [timezone, setTimezone] = useState("GMT-7:00"); // Auto-detect timezone
  // Get formatted timezone options
  const timezoneOptions = Array.from({ length: 25 }, (_, i) => {
    const offset = i - 12; // Shifts range to -12 to +12
    const sign = offset >= 0 ? "+" : "";
    return {
      value: `GMT${sign}${offset}:00`,
      label: `GMT${sign}${offset}:00`,
    };
  });

  const handleSave = () => {
    if (
      validateName(newName) &&
      validateEmail(newEmail) &&
      validatePhone(newPhone)
    ) {
      setName(newName);
      setEmail(newEmail);
      setPhone(newPhone);
      setIsEditing(false);
    } else if (!validateName(newName)) {
      alert("Name must be longer than 5 characters!");
    } else if (!validateEmail(newEmail)) {
      alert("Invalid email format!");
    } else if (!validatePhone(newPhone)) {
      console.log(newPhone.trim());
      alert("Phone number must be at least 8 digits long!");
    } else {
      alert("Please fill all fields correctly.");
    }
  };
  return (
    <Card className={cn(settingCard)} >
      <div className="flex w-full flex-col items-start gap-4">
        <ProfileImage
          initialImage="/images/logo.png"
          imageSize={imageSize}
          isEditing={isEditing}
        />
        <div className="flex w-full flex-col gap-4 lg:w-1/2 lg:min-w-[718px]">
          <div className={`flex flex-col ${isEditing ? "gap-4" : "gap-1"}`}>
            <div className="flex flex-row justify-start gap-4">
              <EditableField
                value={name}
                placeholder="Name"
                componentFormat={`${isEditing ? profileComponentFormat : " text-2xl"}`}
                isEditing={isEditing}
                fieldName="Business Name"
                newValue={newName}
                setNewValue={setNewName}
              />
              {!isEditing && (
                <Button
                variant={"ghost"}
                className="flex size-8 rounded-lg hover:bg-transparent"
                onClick={() => setIsEditing(true)}
               
              >
                <Pencil />
              </Button>
              )}
            </div>
            {isEditing ? (
              <div className={dropDownFieldFormat}>
                <p className={cn(settingLabel)} >Time Zone</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className={dropDownButtonFormat}>
                      <p>{timezone}</p>
                      <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-h-[300px] overflow-y-auto"
                  style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}>
                    {timezoneOptions.map((tz) => (
                      <DropdownMenuItem
                        className="text-sm"
                        key={tz.value}
                        onClick={() => {
                          setTimezone(tz.value);
                        }}
                      >
                        {tz.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <p className={cn(settingLabel)}>{timezone}</p>
            )}
          </div>
          {isEditing ? (
            <div className={dropDownFieldFormat}>
              <p>Category</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className={dropDownButtonFormat}>
                    {category}
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col"
                 style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}>
                  {uniqueCategories.map((cat) => (
                    <DropdownMenuItem
                      key={cat}
                      onClick={() => setCategory(cat)}
                    >
                      {cat}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <p className={cn(settingLabel)}>{category}</p>
          )}

          <EditableField
            value={phone}
            placeholder="Number"
            componentFormat={profileComponentFormat}
            isEditing={isEditing}
            fieldName="Phone Number"
            newValue={newPhone}
            setNewValue={setNewPhone}
          />

          <EditableField
            value={email}
            placeholder="Email"
            componentFormat={profileComponentFormat}
            isEditing={isEditing}
            fieldName="Email"
            newValue={newEmail}
            setNewValue={setNewEmail}
          />
          <div className="flex items-center justify-end">
            {isEditing && (
              <Button
                className="w-[225px]"
                variant={"green"}
                onClick={handleSave}
              >
                Save Changes
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}