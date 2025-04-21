"use client";

import {
  ArrowDownUp,
  DownloadIcon,
  FilterIcon,
  SearchIcon,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  flexBetweenCol,
  Header,
  invoiceMenuItem,
  settingCard,
} from "@/lib/constant";
import { businessInvoice } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 12;
const MAX_PAGE_BUTTONS = 5;

type BillingPlan = "yearly" | "monthly";

export function Invoices({ plan }: { plan: BillingPlan }) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState<"asc" | "desc">("desc");

  const isMobile = useIsMobile();

  const { availableYears, filteredData } = useMemo(() => {
    const processed = businessInvoice.map((invoice) => {
      const date = new Date(invoice.date);
      const isAnnual = invoice.id.includes("ANNUAL");
      return {
        ...invoice,
        dateObj: date,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        isAnnual,
        formattedDate: date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
    });

    const years = [...new Set(processed.map((i) => i.year))].sort(
      (a, b) => b - a,
    );

    let filtered = processed.filter((invoice) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = invoice.id.toLowerCase().includes(searchLower);
      const matchesYear = selectedYear ? invoice.year === selectedYear : true;
      return matchesSearch && matchesYear;
    });

    if (plan === "monthly") {
      filtered = filtered.filter((invoice) => !invoice.isAnnual);
    } else {
      filtered = filtered.filter((invoice) => invoice.isAnnual);
    }

    filtered.sort((a, b) => {
      if (sorting === "asc") {
        return a.dateObj.getTime() - b.dateObj.getTime();
      } else {
        return b.dateObj.getTime() - a.dateObj.getTime();
      }
    });

    return { availableYears: years, filteredData: filtered };
  }, [searchTerm, selectedYear, plan, sorting]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_BUTTONS / 2));
    const endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);
    if (endPage - startPage + 1 < MAX_PAGE_BUTTONS - 1) {
      startPage = Math.max(1, endPage - MAX_PAGE_BUTTONS + 1);
    }
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
    return pages;
  };

  const handleDownload = (transcriptURL: string) => {
    console.log(`Downloading transcript: ${transcriptURL}`);
  };

  const toggleSorting = () => {
    setSorting(sorting === "asc" ? "desc" : "asc");
  };

  return (
    <Card className={settingCard}>
      <div
        className={cn(
          flexBetweenCol,
          `md:flex-row ${isMobile ? "space-y-4" : ""}`,
        )}
      >
        <CardHeader className={cn(Header)}>
          {plan === "yearly" ? "Annual Invoices" : "Monthly Invoices"}
        </CardHeader>

        <div
          className={`mt-2 flex flex-col gap-2 md:mt-0 md:flex-row lg:gap-4 ${isMobile ? "space-y-4" : ""}`}
        >
          <div className="relative max-h-9 w-full">
            <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={`Search ${plan} invoices...`}
              className="w-full pl-10"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full bg-primary sm:w-auto">
                <FilterIcon className="mr-2 size-4" />
                {selectedYear || "All Years"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex max-h-60 w-[--radix-dropdown-menu-trigger-width] flex-col items-center overflow-y-auto bg-background sm:w-auto">
              <DropdownMenuItem
                onClick={() => {
                  setSelectedYear(null);
                  setCurrentPage(1);
                }}
                className={cn(invoiceMenuItem, `${!selectedYear ? "" : ""}`)}
              >
                All Years
              </DropdownMenuItem>
              {availableYears.map((year) => (
                <DropdownMenuItem
                  key={year}
                  onClick={() => {
                    setSelectedYear(year);
                    setCurrentPage(1);
                  }}
                  className={cn(invoiceMenuItem, `${!selectedYear ? "" : ""}`)}
                >
                  {year}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="scrollbar w-full rounded-lg border py-4">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={toggleSorting}
                  className="p-0 hover:bg-transparent"
                >
                  Date
                  <ArrowDownUp className="ml-2 size-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((invoice) => (
                <TableRow key={invoice.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <p className="text-sm">{invoice.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>{invoice.formattedDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="green"
                        size="sm"
                        className=""
                        onClick={() => handleDownload(invoice.transcriptURL)}
                      >
                        <DownloadIcon className="mr-2 size-4" />
                        Download
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="h-24 text-center text-muted-foreground"
                >
                  No invoices found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of {totalItems}{" "}
            invoices
          </div>
          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span key={`ellipsis-${index}`} className="px-2 py-1">
                  ...
                </span>
              ) : (
                <Button
                  key={page}
                  variant={currentPage === page ? "transcript" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(Number(page))}
                  className="min-w-[40px]"
                >
                  {page}
                </Button>
              ),
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
