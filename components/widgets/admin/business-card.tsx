"use client";
import React, { useState} from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { business } from "@/lib/sampleData";
import { BusinessInfo } from "@/lib/types";
import { BusinessPaginate } from "../business/business-pagination";

//some icons that needed
import { MessageSquareText, Search, Funnel, Folders} from "lucide-react";

//shadcn card ui
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const layoutFormat = "flex flex-items";
const DropdownMenuTriggerFormat =
  "flex flex-row h-fit gap-x-3 items-center bg-card rounded-lg text-card-foreground text-xs focus:outline-none hover:bg-primary/90 p-2";
const DropdownMenuContentFormat =
  "p-2 rounded-lg bg-card text-card-foreground text-xs";

const DropdownMenuIconSize = 12;

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

//filtered based on search and Category
const getFilteredBusiness = (
  search: string,
  category: string,
  business: BusinessInfo[],
) => {
  if (!search && !category) {
    return business;
  }

  return business.filter((b) => {
    const matchesSearch = search
      ? b.title.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesCategory = category ? b.content === category : true;
    return matchesSearch && matchesCategory;
  });
};

const getSortedBusiness = (
  filteredBusiness: BusinessInfo[],
  filterPicked: string,
) => {
  switch (filterPicked) {
    case "Most Money Saved":
      return [...filteredBusiness].sort(
        (a, b) => b.cards[0].value - a.cards[0].value,
      );
    case "Most Satisfied":
      return [...filteredBusiness].sort(
        (a, b) => b.cards[1].value - a.cards[1].value,
      );
    case "Most Minutes Saved":
      return [...filteredBusiness].sort(
        (a, b) => b.cards[2].value - a.cards[2].value,
      );
    case "Most New Callers":
      return [...filteredBusiness].sort(
        (a, b) => b.cards[3].value - a.cards[3].value,
      );
    default:
      return filteredBusiness;
  }
};


const Business = ({ isAdminPage }: { isAdminPage: boolean }) => {
  //calculation for pagination
  //if admin show 5 otherwise show 6
  const itemsPerPage = isAdminPage ? 5 : 6;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemsPerPage);
  const [activePage, setActivePage] = useState(1);

  //handle searching
  const [search, setSearch] = useState("");

  //handle category
  // Extract unique categories from business descriptions
  const uniqueCategories = [
    "Retail & Ecommerce",
    "Healthcare",
    "Tech",
    "Finance"
  ]
  const [selectedCategory, setSelectedCategory] = useState("");

  //handle filter
  const filters = [
    "Most Money Saved",
    "Most Satisfied",
    "Most Minutes Saved",
    "Most New Callers",
  ];

  const [filterPicked, setFilterValue] = useState("");
  let filteredBusiness = getFilteredBusiness(
    search,
    selectedCategory,
    business,
  );

  filteredBusiness = getSortedBusiness(filteredBusiness, filterPicked);

  const maxPages = Math.ceil(filteredBusiness.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setActivePage(page);
    setStartIndex((page - 1) * itemsPerPage);
    setEndIndex(page * itemsPerPage);
  };
  
  return (
    <div className="flex flex-grow flex-col gap-y-8">
      <div className="flex flex-row justify-between gap-x-6 flex-wrap gap-y-6">
        <div className="flex w-fit h-fit flex-row items-center gap-0 rounded-lg border-1 bg-card pb-0 text-card-foreground">
          <Search className="ml-2" size={20}/>
          <Input
            type="text"
            placeholder="Search Business"
            className="border-none focus-visible:ring-0"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-row gap-x-6">
          <DropdownMenu>
            <DropdownMenuTrigger className={DropdownMenuTriggerFormat}>
              <Folders size={DropdownMenuIconSize}/> 
              {selectedCategory || "Category"}
            </DropdownMenuTrigger>
            <DropdownMenuContent className={DropdownMenuContentFormat}>
              <DropdownMenuItem onSelect={() => setSelectedCategory("")}>
                All Category
              </DropdownMenuItem>
              {uniqueCategories.map((category, index) => (
                <DropdownMenuItem
                  key={index}
                  onSelect={() => setSelectedCategory(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className={DropdownMenuTriggerFormat}>
              <Funnel size={DropdownMenuIconSize}/> 
              {filterPicked || "Filter"}
            </DropdownMenuTrigger>
            <DropdownMenuContent className={DropdownMenuContentFormat}>
              <DropdownMenuItem onSelect={() => setFilterValue("")}>
                No Filter
              </DropdownMenuItem>
              {filters.map((filter, index) => (
                <DropdownMenuItem
                  key={index}
                  onSelect={() => setFilterValue(filter)}
                >
                  {filter}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>  
        </div>
      </div>

      <div className="mb-14 flex flex-col gap-y-6">
        {filteredBusiness.slice(startIndex, endIndex).map((business) => (
          <div className={layoutFormat} key={business.id}>
            <Card className="flex w-full p-6 gap-y-6 flex-wrap flex-col justify-between lg:flex-row lg:p-2">
              <div className="flex flex-row items-center gap-x-4 lg:ml-4 lg:w-[20%] p-0">
                <div className="flex items-center justify-center">
                  <img
                    src="https://png.pngtree.com/png-clipart/20190604/original/pngtree-creative-company-logo-png-image_1197025.jpg"
                    alt="business logo"
                    className="flex h-10 w-10 rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <CardTitle className="text-sm font-light">
                    {business.title}
                  </CardTitle>
                  <CardDescription style={{ fontSize: '0.7rem' }}>
                    {business.content}
                  </CardDescription>
                </div>
              </div>

              <div className="flex gap-y-6 flex-wrap lg:flex-row justify-between lg:p-3 lg:w-[65%]">
                {business.cards.map((card) => (
                  <div key={card.id} className="flex flex-initial flex-wrap gap-y-3 w-[100%] md:w-[50%] lg:w-[25%] gap-x-3">
                    <div className="flex items-center justify-center rounded-xl">
                      {card.icon}
                    </div>
                    <div className="flex flex-col justify-center lg:gap-1">
                      <p className="text-xs">{card.title}</p>
                      <p className={`text-base font-bold`}>
                        {formatValue(card.value, card.id)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-row lg:justify-end pr-6 items-center lg:w-[9%]">
                <Button className="bg-sidebar-ring text-accent hover:bg-sidebar-ring/50">
                  <MessageSquareText />
                  <p className="text-xs">Chat</p>
                </Button>
              </div>
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
