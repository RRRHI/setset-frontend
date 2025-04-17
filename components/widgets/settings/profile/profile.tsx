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
import { settingCard, settingLabel } from "@/lib/constant";

import EditableField from "./editable-field";

const profileComponentFormat = "flex flex-col w-full items-start gap-1";
const dropDownButtonFormat =
  "justify-between w-full border border-input text-sm text-card-foreground focus-visible:ring-0";
const dropDownFieldFormat = "flex flex-col w-full gap-1";

const validateInput = {
  name: (input: string) => input.trim().length >= 5,
  email: (input: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.trim()),
  phone: (input: string) => /^\d{8,}$/.test(input.trim()),
};

const timezoneOptions = Array.from({ length: 25 }, (_, i) => {
  const offset = i - 12;
  const sign = offset >= 0 ? "+" : "";
  return {
    value: `GMT${sign}${offset}:00`,
    label: `GMT${sign}${offset}:00`,
  };
});

const uniqueCategories = [
  "Retail & Ecommerce",
  "Healthcare",
  "Tech",
  "Finance",
];

export function ProfilePage() {
  const [formData, setFormData] = useState({
    name: "Business Name",
    email: "ExampleEmail@org.com",
    phone: "0123456789",
    category: "Business Category",
    timezone: "GMT-7:00",
  });

  const [newFormData, setNewFormData] = useState({ ...formData });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setNewFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const { name, email, phone } = newFormData;

    if (
      validateInput.name(name) &&
      validateInput.email(email) &&
      validateInput.phone(phone)
    ) {
      setFormData(newFormData);
      setIsEditing(false);
    } else {
      if (!validateInput.name(name))
        alert("Name must be longer than 5 characters!");
      else if (!validateInput.email(email)) alert("Invalid email format!");
      else if (!validateInput.phone(phone))
        alert("Phone number must be at least 8 digits long!");
      else alert("Please fill all fields correctly.");
    }
  };

  const renderDropdown = (
    label: string,
    options: { value: string; label: string }[],
    selectedValue: string,
    onSelect: (value: string) => void,
  ) => (
    <div className={dropDownFieldFormat}>
      <p>{label}</p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className={dropDownButtonFormat}>
            {selectedValue}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="max-h-[300px] overflow-y-auto"
          style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}
        >
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onSelect(option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <Card className={`${settingCard}`} >
      <div className="flex w-full flex-col items-start gap-4">
        <ProfileImage
          initialImage="/images/logo.png"
          imageSize={100}
          isEditing={isEditing}
        />
        <div className="flex w-full flex-col gap-4 lg:w-1/2 lg:min-w-[700px]">
          <div className={`flex flex-col ${isEditing ? "gap-4" : "gap-1"}`}>
            <span className={settingLabel}>Business Name  {!isEditing && (
                <Button
                  variant={"ghost"}
                  className="flex size-8 rounded-lg hover:bg-transparent"
                  onClick={() => setIsEditing(true)}
                 
                >
                  <Pencil />
                </Button>
              )}</span>
            <div className="flex flex-row justify-start gap-4">
              <EditableField
                value={formData.name}
                placeholder="Name"
                componentFormat={`${isEditing ? profileComponentFormat : ""}`}
                isEditing={isEditing}
                fieldName="Business Name"
                newValue={newFormData.name}
                setNewValue={(value) => handleInputChange("name", value)}
              />
             
            </div>
            
          </div>
          <>
          {isEditing ? (
              renderDropdown(
                "Time Zone",
                timezoneOptions,
                newFormData.timezone,
                (value) => handleInputChange("timezone", value),
              )
            ) : (
              <div>
                <p className="text-xl">Time Zone</p>
                <p className="pb-3 text-sm text-foreground/80">
                  {formData.timezone}
                </p>
              </div>
            )}
            </>
          {isEditing ? (
            renderDropdown(
              "Category",
              uniqueCategories.map((cat) => ({ value: cat, label: cat })),
              newFormData.category,
              (value) => handleInputChange("category", value),
            )
          ) : (
            <div>
              <p  className="text-xl">Category</p>
              <p>{formData.category}</p>
            </div>
          )}
          <div>
            {!isEditing && <p  className="text-xl">Phone number</p>}
            <EditableField
              value={formData.phone}
              placeholder="Number"
              componentFormat={profileComponentFormat}
              isEditing={isEditing}
              fieldName="Phone Number"
              newValue={newFormData.phone}
              setNewValue={(value) => handleInputChange("phone", value)}
            />
          </div>
          <div>
            {!isEditing && <p  className="text-xl">Email</p>}
            <EditableField
              value={formData.email}
              placeholder="Email"
              componentFormat={profileComponentFormat}
              isEditing={isEditing}
              fieldName="Email"
              newValue={newFormData.email}
              setNewValue={(value) => handleInputChange("email", value)}
            />
          </div>
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
