import { Check } from "lucide-react";
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

  const [guidelines, setGuidelines] = useState({
    length: false,
    specialChar: false,
    hasNumber: false,
    hasLetter: false,
    match: false,
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
        alert(
          `"Password is valid! \n current password: ${currentpassword} \n new password: ${newpassword} \n confirm new password: ${confirmnewpassword}"`,
        ),
      );
    } else setDisplayvalid(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setDisplayvalid(false);

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    console.log("guidelines", guidelines);

    if (id === "newpassword") {
      setGuidelines((prev) => ({
        ...prev,
        length: value.length >= 8,
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        hasNumber: /\d/.test(value),
        hasLetter: /[a-zA-Z]/.test(value),
      }));
    } else if (id === "confirmnewpassword") {
      setGuidelines((prev) => ({
        ...prev,
        match: value === formData.newpassword,
      }));
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
        <div className="flex-[100%] md:flex-[48%]">
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
            </label>

            <label htmlFor="confirmnewpassword">
              Confirm New Password
              {passwordInput("confirmnewpassword")}
            </label>

            <a
              href="#"
              className="ml-auto text-sm font-semibold text-setSetOrange underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
            <p
              className={`text-center text-sm font-semibold text-red-600 ${displayvalid ? "block" : "hidden"}`}
            >
              New password does not meet the required guidelines
            </p>
            <Button type="submit">Change password</Button>
          </form>
        </div>

        <div className="flex-[100%] md:flex-[50%]">
          <h4 className="pb-4 text-xl font-bold">Password Guidelines</h4>
          <ul className="flex list-none flex-col gap-4 [&>li]:flex [&>li]:items-center [&>li]:gap-3">
            <li>
              <span
                className={`size-6 rounded-full bg-muted-foreground ${guidelines.length ? "!bg-green-500" : ""}`}
              >
                <Check />
              </span>
              <p>Password must be at least 8 characters</p>
            </li>
            <li>
              <span
                className={`size-6 rounded-full bg-muted-foreground ${guidelines.specialChar && guidelines.hasLetter && guidelines.hasNumber ? "!bg-green-500" : ""}`}
              >
                <Check />
              </span>
              <p>
                Password must contain a combination of letters, numbers and
                special characters (!$@&)
              </p>
            </li>
            <li>
              <span
                className={`size-6 rounded-full bg-muted-foreground ${guidelines.match ? "!bg-green-500" : ""}`}
              >
                <Check />
              </span>
              <p>Confirmed password matches</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
