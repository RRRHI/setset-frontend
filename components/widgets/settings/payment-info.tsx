import { CreditCard, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Header, settingCard } from "@/lib/constant";
import { cardData } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

export function PaymentInfo() {
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
    country: "",
    type: "visa",
  });
  const [billingAddress, setBillingAddress] = useState({
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [cards, setCards] = useState(cardData);
  const [selectedCardId, setSelectedCardId] = useState<string>(
    cards[0]?.id || "",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<string | null>(null);

  const cardTypes = [
    { value: "visa", label: "Visa", icon: <CreditCard className="size-4" /> },
    {
      value: "mastercard",
      label: "Mastercard",
      icon: <CreditCard className="size-4" />,
    },
    {
      value: "amex",
      label: "American Express",
      icon: <CreditCard className="size-4" />,
    },
    { value: "other", label: "Other", icon: <CreditCard className="size-4" /> },
  ];

  const countries = [
    { value: "us", label: "United States" },
    { value: "bg", label: "Bulgaria" },
    { value: "gb", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "es", label: "Spain" },
    { value: "it", label: "Italy" },
    { value: "jp", label: "Japan" },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (
      !cardDetails.number ||
      !/^\d{16}$/.test(cardDetails.number.replace(/\s/g, ""))
    ) {
      newErrors.number = "Please enter a valid 16-digit card number";
    }

    if (!cardDetails.expiry || !/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
      newErrors.expiry = "Please enter a valid expiry date (MM/YY)";
    }

    if (!cardDetails.cvv || !/^\d{3,4}$/.test(cardDetails.cvv)) {
      newErrors.cvv = "Please enter a valid CVV (3-4 digits)";
    }

    if (!cardDetails.name.trim()) {
      newErrors.name = "Please enter the name on card";
    }

    if (!cardDetails.country) {
      newErrors.country = "Please select a country";
    }

    if (!billingAddress.address.trim()) {
      newErrors.address = "Please enter your address";
    }

    if (!billingAddress.city.trim()) {
      newErrors.city = "Please enter your city";
    }

    if (!billingAddress.state.trim()) {
      newErrors.state = "Please enter your state/province";
    }

    if (!billingAddress.postalCode.trim()) {
      newErrors.postalCode = "Please enter your postal code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setCardDetails({
      number: "",
      expiry: "",
      cvv: "",
      name: "",
      country: "",
      type: "visa",
    });
    setBillingAddress({
      address: "",
      apartment: "",
      city: "",
      state: "",
      postalCode: "",
    });
    setErrors({});
  };

  const handleAddPayment = () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields correctly",
        variant: "destructive",
      });
      return;
    }

    const last4 = cardDetails.number.slice(-4);
    const brand =
      cardDetails.type === "visa"
        ? "Visa"
        : cardDetails.type === "mastercard"
          ? "Mastercard"
          : cardDetails.type === "amex"
            ? "American Express"
            : "Other";
    const [exp_month, exp_year] = cardDetails.expiry.split("/").map(Number);

    const newCard = {
      id: `card_${Date.now()}`,
      last4,
      brand,
      name: cardDetails.name,
      exp_month,
      exp_year: 2000 + exp_year,
    };

    setCards([...cards, newCard]);
    setSelectedCardId(newCard.id);
    setShowAddForm(false);

    setCardDetails({
      number: "",
      expiry: "",
      cvv: "",
      name: "",
      country: "",
      type: "visa",
    });
    setBillingAddress({
      address: "",
      apartment: "",
      city: "",
      state: "",
      postalCode: "",
    });

    toast({
      title: "Card Saved",
      description: "Your payment method has been added successfully",
    });
  };

  const handleDeleteCard = (cardId: string) => {
    setCardToDelete(cardId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!cardToDelete) return;

    const newCards = cards.filter((card) => card.id !== cardToDelete);
    setCards(newCards);

    if (selectedCardId === cardToDelete) {
      setSelectedCardId(newCards[0]?.id || "");
    }

    setDeleteDialogOpen(false);
    toast({
      title: "Card Deleted",
      description: "Payment method has been removed",
    });
  };

  return (
    <Card id="Card-Information" className={settingCard}>
      <CardHeader className={cn(Header)}>Payment Information</CardHeader>
      <CardContent className="p-0">
        {!showAddForm ? (
          <div className="space-y-4">
            <RadioGroup
              value={selectedCardId}
              onValueChange={setSelectedCardId}
              className="space-y-3"
            >
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`group relative flex items-start space-x-3 rounded-lg border p-4 ${selectedCardId === card.id ? "border-foreground bg-muted" : "border-foreground/50 bg-transparent"}`}
                >
                  <RadioGroupItem
                    value={card.id}
                    id={card.id}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center">
                      <span className="font-medium">{card.brand}</span>
                      <span className="text-muted-foreground">
                        •••• •••• •••• {card.last4}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-col flex-wrap items-start gap-1 text-sm text-muted-foreground">
                      <span>{card.name}</span>
                      <span>
                        Expires {card.exp_month.toString().padStart(2, "0")}/
                        {card.exp_year.toString().slice(-2)}
                      </span>
                    </div>
                  </div>
                  <button
                    className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-red-500 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCard(card.id);
                    }}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </RadioGroup>

            <Button
              variant="green"
              onClick={() => setShowAddForm(true)}
              className="ml-auto mt-4 flex"
            >
              Add payment method
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Card number</Label>
                <Input
                  placeholder="1234 1234 1234 1234"
                  className="text-sm md:text-base"
                  value={cardDetails.number}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, number: e.target.value })
                  }
                />
                {errors.number && (
                  <p className="text-sm text-red-500">{errors.number}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Card type</Label>
                <Select
                  value={cardDetails.type}
                  onValueChange={(value) =>
                    setCardDetails({ ...cardDetails, type: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select card type" />
                  </SelectTrigger>
                  <SelectContent>
                    {cardTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          {type.icon}
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Expiration</Label>
                <Input
                  placeholder="MM/YY"
                  className="text-sm md:text-base"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                />
                {errors.expiry && (
                  <p className="text-sm text-red-500">{errors.expiry}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>CVV</Label>
                <Input
                  placeholder="•••"
                  className="text-sm md:text-base"
                  type="password"
                  maxLength={4}
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                />
                {errors.cvv && (
                  <p className="text-sm text-red-500">{errors.cvv}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Name on card</Label>
              <Input
                placeholder="Name on card"
                className="text-sm md:text-base"
                value={cardDetails.name}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, name: e.target.value })
                }
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Country or region</Label>
              <Select
                value={cardDetails.country}
                onValueChange={(value) =>
                  setCardDetails({ ...cardDetails, country: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  sideOffset={4}
                  className="max-h-[250px] w-[var(--radix-select-trigger-width)] overflow-y-auto"
                >
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="text-sm text-red-500">{errors.country}</p>
              )}
            </div>

            <div className="space-y-4 pt-4">
              <h4 className="font-medium">Billing address</h4>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input
                  placeholder="Apartment, suite, etc."
                  className="text-sm md:text-base"
                  value={billingAddress.address}
                  onChange={(e) =>
                    setBillingAddress({
                      ...billingAddress,
                      address: e.target.value,
                    })
                  }
                />
                {errors.address && (
                  <p className="text-sm text-red-500">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input
                    placeholder="City"
                    className="text-sm md:text-base"
                    value={billingAddress.city}
                    onChange={(e) =>
                      setBillingAddress({
                        ...billingAddress,
                        city: e.target.value,
                      })
                    }
                  />
                  {errors.city && (
                    <p className="text-sm text-red-500">{errors.city}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>State/Province</Label>
                  <Input
                    placeholder="State/province"
                    className="text-sm md:text-base"
                    value={billingAddress.state}
                    onChange={(e) =>
                      setBillingAddress({
                        ...billingAddress,
                        state: e.target.value,
                      })
                    }
                  />
                  {errors.state && (
                    <p className="text-sm text-red-500">{errors.state}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>ZIP/Postal code</Label>
                <Input
                  placeholder="ZIP/postal code"
                  className="text-sm md:text-base"
                  value={billingAddress.postalCode}
                  onChange={(e) =>
                    setBillingAddress({
                      ...billingAddress,
                      postalCode: e.target.value,
                    })
                  }
                />
                {errors.postalCode && (
                  <p className="text-sm text-red-500">{errors.postalCode}</p>
                )}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                variant="green"
                onClick={handleAddPayment}
                className="flex-1"
              >
                Save card
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-[90vw] rounded-lg bg-primary sm:w-fit">
          <DialogHeader>
            <DialogTitle>Delete Payment Method</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this card? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="size-4" />
              Delete Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
