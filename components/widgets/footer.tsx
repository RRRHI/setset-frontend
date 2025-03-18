"use client";
import { ChevronDown,Phone, ScrollText } from "lucide-react";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

export default function Footer() {
  const [problem, setProblem] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [callID, setCallID] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const resetFields = () => {
    setProblem("");
    setCategory("");
    setCallID("");
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    // Reset form fields when dialog is closed
    if (!open) {
      resetFields();
    }
  };

  const handleSendReport = () => {
    //TODO : Send report to backend
    setIsOpen(false);
    resetFields();
  };

  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <p>© 2025 SetSet. All rights reserved.</p>
        </div>

        <div className="flex flex-row items-start gap-2 text-sm md:gap-4">
          <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="text-muted-foreground">
                <ScrollText className="size-4" />
                <span>Report</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] rounded-lg bg-primary sm:w-fit">
              <DialogHeader>
                <DialogTitle>Report a problem</DialogTitle>
                <DialogDescription>
                  Report any issues you faced with the AI assistant. Click send
                  once you're done.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 flex flex-col gap-4">
                <Input
                  id="problem"
                  placeholder="Problem"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  className="text-sm"
                />

                <Input
                  id="description"
                  placeholder="Explain the problem in details"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="text-sm"
                />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-fit justify-between bg-inherit"
                    >
                      {category || "Category"}
                      <ChevronDown className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="center"
                    className="rounded-lg bg-background p-2"
                  >
                    {["Call Related", "Other"].map((status) => (
                      <DropdownMenuCheckboxItem
                        key={status}
                        checked={category === status}
                        onCheckedChange={(value) =>
                          setCategory(value ? status : "")
                        }
                      >
                        <p className="text-sm">{status}</p>
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {category === "Call Related" && (
                  <Input
                    id="callID"
                    type="number"
                    placeholder="Call ID"
                    value={callID}
                    onChange={(e) => setCallID(e.target.value)}
                    className="w-fit text-sm"
                  />
                )}
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-background"
                  onClick={handleSendReport}
                >
                  Send Report
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="ghost" className="text-muted-foreground">
            <Phone className="size-4" />
            <span>Contact Us</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
