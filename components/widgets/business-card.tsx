"use client";
import React, { useState } from "react";
import { BusinessStat } from "@/lib/types";
import { Button } from "../ui/button";
import { useEffect } from 'react';
import { Input } from "../ui/input";
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
import {
  WalletMinimal,
  TimerReset,
  ThumbsUp,
  UsersRound,
  MessageSquareText,
  Search
} from "lucide-react";

//shadcn card ui
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const layoutFormat = "flex flex-items mt-6";
const iconStyles = "flex lg:w-6 lg:h-6 text-accent";
const paginationItemformat = "bg-card text-card-foreground rounded-lg";

const testData: BusinessStat = {
  callMinutes: 123456,
  moneySaved: 601194,
  satisfaction: 5.5,
  newCallers: 6789,
};

//Metric Card for this test business
const cards = [
  {
    id: "money-saved",
    icon: <WalletMinimal className={iconStyles} />,
    title: "Money Saved",
    value: testData.moneySaved,
  },
  {
    id: "satisfaction",
    icon: <ThumbsUp className={iconStyles} />,
    title: "Satisfaction",
    value: testData.satisfaction,
  },
  {
    id: "minutes-saved",
    icon: <TimerReset className={iconStyles} />,
    title: "Minutes Saved",
    value: testData.callMinutes,
  },
  {
    id: "new-callers",
    icon: <UsersRound className={iconStyles} />,
    title: "New Callers",
    value: testData.newCallers,
  },
];

const cards2 = [
  {
    id: "money-saved",
    icon: <WalletMinimal className={iconStyles} />,
    title: "Money Saved",
    value: testData.moneySaved,
  },
  {
    id: "satisfaction",
    icon: <ThumbsUp className={iconStyles} />,
    title: "Satisfaction",
    value: testData.satisfaction,
  },
  {
    id: "minutes-saved",
    icon: <TimerReset className={iconStyles} />,
    title: "Minutes Saved",
    value: 1000000,
  },
  {
    id: "new-callers",
    icon: <UsersRound className={iconStyles} />,
    title: "New Callers",
    value: testData.newCallers,
  },
];

//Test data for business
type Business = {
  id: string;
  title: string;
  content: string;
  cards: typeof cards;
};

const business: Business[] = [
  {
    id: "1",
    title: "Business Name 1",
    content: "Description 1",
    cards: cards,
  },
  {
    id: "2",
    title: "Business Name 2",
    content: "Description 2",
    cards: cards,
  },
  {
    id: "3",
    title: "Business Name 3",
    content: "Description 3",
    cards: cards,
  },
  {
    id: "4",
    title: "Business Name 4",
    content: "Description 4",
    cards: cards,
  },
  {
    id: "5",
    title: "Business Name 5",
    content: "Description 5",
    cards: cards,
  },
  {
    id: "6",
    title: "Business Name 6",
    content: "Description 6",
    cards: cards,
  },
  {
    id: "7",
    title: "Business Name 7",
    content: "Description 7",
    cards: cards2,
  },
  {
    id: "8",
    title: "Business Name 8",
    content: "Description 8",
    cards: cards,
  },
  {
    id: "9",
    title: "Business Name 9",
    content: "Description 9",
    cards: cards,
  },
  {
    id: "10",
    title: "Business Name 10345",
    content: "Description 10",
    cards: cards,
  },
  {
    id: "11",
    title: "Business Name 11",
    content: "Description 11",
    cards: cards,
  },
];
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

const getFilteredBusiness = (search: string, business: Business[]) => {
  if(!search)
  {
    return business;
  }

  return business.filter((business) => {
    return business.title.toLowerCase().includes(search.toLowerCase());
  });
}

const Business = () => {
  //calculation for pagination
  const itemsPerPage = 7;
  const maxPages = Math.ceil(business.length / itemsPerPage);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemsPerPage);
  const [activePage, setActivePage] = useState(1); 

  //handle searching
  const [search, setSearch] = useState("");
  const filteredBusiness = getFilteredBusiness(search, business);

  return (
    <div> 
      <div className="flex flex-row pb-0 w-[20%] items-center bg-card text-card-foreground rounded-lg border-2 gap-0">
        <Search className="ml-2"/>
        <Input type="text" placeholder="Search Business" className="focus-visible:ring-0" 
        onChange={(e) => setSearch(e.target.value)}/>
      </div>
      <div className="flex flex-col"> 
      {filteredBusiness.slice(startIndex, endIndex).map((business) => (
        <div className={layoutFormat} key={business.id}>
          <Card className="flex flex-row items-center justify-between p-0 w-full">
            <CardContent className="flex p-3 gap-[1vw] min-w-[20%] max-w-[20%]">
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

            <CardContent className="flex flex-row justify-between p-3 min-w-[60%]">
              {business.cards.map((card) => (
                <div key={card.id} className="flex gap-[1vw] w-[15%]">
                  <CardContent className="flex aspect-square items-center justify-center rounded-xl bg-card-foreground p-3">
                    {card.icon}
                  </CardContent>
                  <div className="flex flex-col justify-center lg:gap-1">
                    <p className="text-xs">{card.title}</p>
                    <p className="text-2xl font-bold">
                      {formatValue(card.value, card.id)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>

            <CardContent className="mr-8 flex flex-row flex-wrap items-end justify-end p-1 w-[10%]">
              <Button className="bg-green-400 text-accent hover:bg-green-400/50">
                <MessageSquareText />
                <p>Chat</p>
              </Button>
            </CardContent>
          </Card>
        </div>
      ))}
      </div> 
    
      <div className="fixed bottom-4 items-center w-full">
        <Pagination>
          <PaginationContent>
            <PaginationItem className={paginationItemformat}>
              <PaginationPrevious className={
                activePage === 1 ? "" : undefined
              }
              onClick={() => {
                if (startIndex > 0) {
                  setStartIndex(startIndex - itemsPerPage);
                  setEndIndex(endIndex - itemsPerPage);
                  setActivePage(activePage - 1);
                }
              }}
              >        
              </PaginationPrevious>
            </PaginationItem>

            {/* Dynamic Pagination Links */}
            {maxPages > 10 ? (
            <>
              {Array.from({ length: 3 }, (_, index) => {
                let page;
                if (activePage <= maxPages - 5){
                  page = activePage + index;
                }
                else{                
                  page = maxPages - 5 + index;
                }

                if (page >= 1 && page < maxPages - 2)  {
                  return (
                    <PaginationItem key={index} className={paginationItemformat}>
                      <PaginationLink isActive={activePage === page}
                        onClick={() => {
                          setStartIndex((page - 1) * itemsPerPage);
                          setEndIndex(page * itemsPerPage);
                          setActivePage(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                return null;
              })}
                            
              <PaginationEllipsis/>
              {/* Show the last 3 pages */}
              {Array.from({ length: 3 }, (_, index) => {
                const page = maxPages - 2 + index;
                if (page >= maxPages - 2 && page <= maxPages){
                  return (
                    <PaginationItem key={index} className={paginationItemformat}>
                      <PaginationLink isActive={activePage === page}
                        onClick={() => {
                          setStartIndex((page - 1) * itemsPerPage);
                          setEndIndex(page * itemsPerPage);
                          setActivePage(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                return null;
              })}
            </>
            ) : (
            // If maxPages <= 5, show all the pagination links
            Array.from({ length: maxPages }, (_, index) => (
              <PaginationItem className={paginationItemformat} key={index}>
                <PaginationLink
                  isActive={activePage === index + 1}
                  onClick={() => {
                    setStartIndex(index * itemsPerPage);
                    setEndIndex((index + 1) * itemsPerPage);
                    setActivePage(index + 1);}}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))
          )}

          <PaginationItem className={paginationItemformat}>
            <PaginationNext className={
              activePage == maxPages ? "" : undefined
            }
            onClick={() => {
              if (endIndex < business.length) {
                setStartIndex(startIndex + itemsPerPage);
                setEndIndex(endIndex + itemsPerPage);
                setActivePage(activePage + 1);
              }
            }}
            >
            </PaginationNext>
          </PaginationItem>

        </PaginationContent>
      </Pagination>
    </div>
  </div>  
  );
};

export default Business;
