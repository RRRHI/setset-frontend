import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {formFieldWrapper, Header, settingCard, settingLabel, warningText} from "@/lib/constant";
import {cn} from "@/lib/utils";

export function Password() {
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentpassword: false,
    newpassword: false,
    confirmnewpassword: false,
  });
  const [warning, setWarning] = useState({
    lenWarning: false,
    combinationWarning: false,
    matchingWarning: false,
  });

  const [guidelines, setGuidelines] = useState({
    length: false,
    specialChar: false,
    hasNumber: false,
    hasLetter: false,
    match: true,
  });

  const [formData, setFormData] = useState({
    currentpassword: "",
    newpassword: "",
    confirmnewpassword: "",
  });

  // Toggle visibility for a specific password field
  const togglePasswordVisibility = (field: keyof typeof passwordVisibility) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valid = Object.values(guidelines).every((value) => value === true);
    const { currentpassword, newpassword, confirmnewpassword } = formData;

    if (valid) {
      //change password login goes here

      alert(
        `"Password is valid! \n current password: ${currentpassword} \n new password: ${newpassword} \n confirm new password: ${confirmnewpassword}"`,
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    const updatedForm = {
      ...formData,
      [id]: value,
    };

    setFormData(updatedForm);

    if (id === "newpassword" || id === "confirmnewpassword") {
      const newPassword = updatedForm.newpassword;
      const confirmPassword = updatedForm.confirmnewpassword;

      const length = newPassword.length >= 8;
      const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
      const hasNumber = /\d/.test(newPassword);
      const hasLetter = /[a-zA-Z]/.test(newPassword);
      const match = newPassword === confirmPassword;

      setGuidelines({
        length,
        specialChar,
        hasNumber,
        hasLetter,
        match,
      });

      // Only show warnings for fields that have been touched
      setWarning({
        lenWarning: newPassword.length > 0 && !length,
        combinationWarning:
          newPassword.length > 0 && !(specialChar && hasNumber && hasLetter),
        matchingWarning: confirmPassword.length > 0 && !match,
      });
    }
  };

  const passwordInput = (id: keyof typeof formData) => {
    return (
      <div className="relative">
        <Input
          id={id}
          type={passwordVisibility[id] ? "text" : "password"}
          required
          className="pr-10"
          value={formData[id]}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility(id)}
          className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
        >
          {passwordVisibility[id] ? (
            <EyeClosed className="size-4" />
          ) : (
            <Eye className="size-4" />
          )}
        </button>
      </div>
    );
  };

  return (
    <Card
      className={cn(settingCard)}
    >
      <CardHeader className={cn(Header)}>
        Change Password
      </CardHeader>
      <CardContent className="p-0">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 lg:w-1/2 lg:min-w-[700px]"
        >
          <div className={cn(formFieldWrapper)}>
            <p className={settingLabel}>Current Password</p>
            {passwordInput("currentpassword")}
          </div>

          <div className={cn(formFieldWrapper)}>
            <p className={settingLabel}>New Password</p>
            {passwordInput("newpassword")}
            <p
              className={cn(warningText,`${warning.lenWarning ? "block" : "hidden"}`)}
            >
              Password Must be at least 8 characters long
            </p>
            <p
              className={cn(warningText,`${warning.combinationWarning ? "block" : "hidden"}`)}
            >
              Password must contain a combination of letters, numbers and
              special characters (!$@&)
            </p>
          </div>

          <div className={cn(formFieldWrapper)}>
            <p className={settingLabel}>Confirm New Password</p>
            {passwordInput("confirmnewpassword")}
            <p
              className={cn(warningText,` ${warning.matchingWarning ? "block" : "hidden"}`)}
            >
              Confirmed password does not match
            </p>
          </div>

          <a href="#" className={cn(warningText,"w-fit hover:underline")}>
            Forgot your password?
          </a>

          <Button
            type="submit"
            variant={"green"}
            className={"w-[225px] self-end rounded-lg"}
          >
            Change Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
