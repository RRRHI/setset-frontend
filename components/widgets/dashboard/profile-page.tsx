import { Pencil, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProfileImage } from "@/components/widgets/dashboard/profile-page-component/profile-image";
import EditableField from "./profile-page-component/EditableField";

const profileComponentFormat =
  "flex flex-col w-full items-start gap-1 font-bold";

export default function ProfilePage() {
  const [name, setName] = useState("Business Name");
  const [newName, setNewName] = useState("");

  const validateName = (input: string) => {
    return input.trim().length >= 5; // Custom validation: at least 3 characters
  };

  const [email, setEmail] = useState("ExampleEmail@org.com");
  const [newEmail, setNewEmail] = useState("");
  const validateEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input.trim());
  }

  const [phone, setPhone] = useState("0123456789");
  const [newPhone, setNewPhone] = useState("");
  const validatePhone = (input: string) => {
    const phoneRegex = /^\d{8,}$/;
    return phoneRegex.test(input.trim());
  }

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
    if (validateName(newName) && validateEmail(newEmail) && validatePhone(newPhone)) {
      setNewName("");
      setName(newName);
      setNewEmail("");
      setEmail(newEmail);
      setNewPhone("");
      setPhone(newPhone);
      setIsEditing(false);
    }
    else if(!validateName(newName))
    {
      alert("Name must be longer than 5 characters!")
    }
    else if(!validateEmail(newEmail))
    {
      alert("Invalid email format!")
    }
    else if(!validatePhone(newPhone)){
      console.log(newPhone.trim())
      alert("Phone number must be at least 8 digits long!")
    }
    else
    {
      alert("Please fill all fields correctly.");
    }
  };
  return (
    <div className="flex w-full flex-col pb-6">
      <div className="flex w-full flex-row items-start gap-6">
        <ProfileImage
          initialImage="/images/logo.png"
          className=""
          imageSize={imageSize}
        />
        <div
          className="flex flex-col lg:w-1/4 md:w-1/2 w-full gap-4"
          style={{ marginTop: `${imageSize / 2 - imageSize / 5}px` }}
        >
          <div className={`flex flex-col w-full ${isEditing ? "gap-4" : "gap-1"}`}>
            <div className="flex flex-row w-full justify-start gap-4">
              <EditableField
                value={name}
                placeholder="Enter name..."
                componentFormat={`${isEditing ? (profileComponentFormat) : ("font-bold text-2xl")}`}
                isEditing={isEditing}
                fieldName="Business Name"
                newValue={newName}
                setNewValue={setNewName} 
              />
              {!isEditing && (
                <Button
                  className="flex h-8 w-8 rounded-lg"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil></Pencil>
                </Button>
              )}
            </div>
            {isEditing ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="justify-between text-sm text-card-foreground focus-visible:ring-0">                    
                    <p>{timezone}</p>
                    <ChevronDown/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-h-[300px] w-[350px] overflow-y-auto">
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
            ) : (
              <p className="text-sm text-foreground/80">{timezone}</p>
            )}
          </div>
          {isEditing ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex justify-between text-card-foreground focus-visible:ring-0">
                  {category}
                  <ChevronDown/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="flex w-full flex-col justify-end"
                align="end"
              >
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
          ) : (
            <p className="font-bold">{category}</p>
          )}

          <EditableField
            value={phone}
            placeholder="Enter phone number..."
            componentFormat={profileComponentFormat}
            isEditing={isEditing}
            fieldName="Phone Number"
            newValue={newPhone}
            setNewValue={setNewPhone}
          />

          <EditableField
            value={email}
            placeholder="Enter email..."
            componentFormat={profileComponentFormat}
            isEditing={isEditing}
            fieldName="Email"
            newValue={newEmail}
            setNewValue={setNewEmail}
          />
        </div>
      </div>
      {isEditing && (
        <Button
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 transform"
          onClick={handleSave}
        >
          Save Changes
        </Button>
      )}
    </div>
  );
}
