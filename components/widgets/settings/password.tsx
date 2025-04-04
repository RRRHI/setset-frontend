import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Password() {
  const [displayvalid, setDisplayvalid] = useState(false);
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
    } else setDisplayvalid(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;


    const updatedForm = {
      ...formData,
      [id]: value,
    };

    setFormData(updatedForm);

   
    setDisplayvalid(false);

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
    <div id="Password" className="w-full">
      <h1 className="py-4 text-3xl font-bold">Change Password</h1>
      <div className="flex w-full flex-col-reverse flex-wrap gap-4 md:flex-row">
        <div className="w-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 font-medium [&>label]:text-lg"
          >
            <label htmlFor="currentpassword">
              Current Password
              {passwordInput("currentpassword")}
            </label>

            <label htmlFor="newpassword">
              New Password
              {passwordInput("newpassword")}
              <p
                className={`text-sm font-semibold text-red-500 ${warning.lenWarning ? "block" : "hidden"}`}
              >
                Password Must be at least 8 characters long
              </p>
              <p
                className={`text-sm font-semibold text-red-500 ${warning.combinationWarning ? "block" : "hidden"}`}
              >
                Password must contain a combination of letters, numbers and
                special characters (!$@&)
              </p>
            </label>

            <label htmlFor="confirmnewpassword">
              Confirm New Password
              {passwordInput("confirmnewpassword")}
              <p
                className={`text-sm font-semibold text-red-500 ${warning.matchingWarning ? "block" : "hidden"}`}
              >
                Confirmed password does not match
              </p>
            </label>

            <a
              href="#"
              className="text-sm font-semibold text-setSetOrange underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
            <p
              className={`text-center text-sm font-semibold text-red-600 ${displayvalid ? "block" : "hidden"}`}
            >
              New password does not meet the required guidelines
            </p>
            <Button
              type="submit"
              className="h-11 text-xl  shadow-lg shadow-primary-gray bg-sidebar-ring hover:bg-chart-2"
            >
              change password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
