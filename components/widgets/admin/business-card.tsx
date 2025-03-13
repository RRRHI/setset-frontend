"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { business } from "@/lib/sampleData";
import { BusinessInfo } from "@/lib/types";
import { BusinessPaginate} from "../business/business-pagination";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

//some icons that needed
import { MessageSquareText, Search } from "lucide-react";

//shadcn card ui
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";

const layoutFormat = "flex flex-items";
const paginationItemformat = "bg-card text-card-foreground rounded-lg";

//Format value for money and satisfaction
const formatValue = (value: number, type: string) => {
  if (type === "money-saved") {
    return `$${value.toLocaleString()}`;
  }
  if (type === "satisfaction") {
    // Keep decimal places for satisfaction score
    return `${value.toFixed(2)}/10`;
  }
  return value.toLocaleString(); // Add commas for large numbers
};

const getFilteredBusiness = (search: string, business: BusinessInfo[]) => {
  if (!search) {
    return business;
  }

  return business.filter((business) => {
    return business.title.toLowerCase().includes(search.toLowerCase());
  });
};

const Business = ({ isAdminPage }: { isAdminPage: boolean }) => {
  //calculation for pagination
  //if admin show 5 otherwise show 6
  const itemsPerPage = isAdminPage ? 5 : 6;
  const maxPages = Math.ceil(business.length / itemsPerPage);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemsPerPage);
  const [activePage, setActivePage] = useState(1);

  //handle searching
  const [search, setSearch] = useState("");
  const filteredBusiness = getFilteredBusiness(search, business);

  const handlePageChange = (page: number) => {
    setActivePage(page);
    setStartIndex((page - 1) * itemsPerPage);
    setEndIndex(page * itemsPerPage);
  };
  
  return (
    <div className="flex h-full flex-grow flex-col flex-wrap gap-y-8">
      <div className="flex w-[20%] flex-row items-center gap-0 rounded-lg border-2 bg-card pb-0 text-card-foreground">
        <Search className="ml-2" />
        <Input
          type="text"
          placeholder="Search Business"
          className="border-none focus-visible:ring-0"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mb-16 flex flex-grow flex-col gap-y-6">
        {filteredBusiness.slice(startIndex, endIndex).map((business) => (
          <div className={layoutFormat} key={business.id}>
            <Card className="flex w-full flex-row justify-between">
              <CardContent className="ml-6 flex w-[20%] items-center gap-[1vw] p-0">
                <div className="flex items-center justify-center">
                  <img
                    src="https://png.pngtree.com/png-clipart/20190604/original/pngtree-creative-company-logo-png-image_1197025.jpg"
                    alt="business logo"
                    className="h-12 w-12 rounded-lg"
                  />
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-lg font-light">
                    {business.title}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Card Description
                  </CardDescription>
                </div>
              </CardContent>

              <CardContent className="flex w-[70%] flex-row justify-between gap-x-10 p-3">
                {business.cards.map((card) => (
                  <div key={card.id} className="flex w-[15%] gap-x-2">
                    <div className="flex items-center justify-center rounded-xl p-3">
                      {card.icon}
                    </div>
                    <div className="flex flex-col justify-center lg:gap-1">
                      <p className="text-xs">{card.title}</p>
                      <p className="text-2xl font-bold">
                        {formatValue(card.value, card.id)}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>

              <CardContent className="mr-6 flex w-[10%] flex-row items-center justify-end p-0">
                <Button className="bg-sidebar-ring text-accent hover:bg-sidebar-ring/50">
                  <MessageSquareText />
                  <p>Chat</p>
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {!isAdminPage && (
        <div className="absolute bottom-6 flex w-full items-center">
          <BusinessPaginate
            activePage={activePage}
            maxPages={maxPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Business;
