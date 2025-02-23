"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { 
  FaPlay, 
  FaDownload, 
  FaEllipsis,
  FaPause, 
  FaFileArrowDown, 
  FaChevronDown, 
  FaArrowsUpDown } 
from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CallRecording } from "@/lib/types";

import { DatePickerWithRange } from "../ui/date-picker";

// Sample data for Call Recordings
const callRecordingsData: CallRecording[] = [
  {
    id: "1",
    date: "2023-10-01",
    invoice: "INV001",
    status: "Booked",
    duration: "0:18",
    recordingUrl:
      "https://actions.google.com/sounds/v1/cartoon/rainstick_slow.ogg",
    transcriptUrl: "https://example.com/recording2.pdf",
  },
  {
    id: "2",
    date: "2023-10-02",
    invoice: "INV002",
    status: "Cancelled",
    duration: "0:50",
    recordingUrl:
      "https://actions.google.com/sounds/v1/ambiences/barnyard_with_animals.ogg",
    transcriptUrl: "https://example.com/recording2.pdf",
  },
  {
    id: "3",
    date: "2023-10-03",
    invoice: "INV003",
    status: "Cancelled",
    duration: "7:48",
    recordingUrl: "https://example.com/recording3.mp3",
    transcriptUrl: "https://example.com/recording3.pdf",
  },
  {
    id: "4",
    date: "2023-10-04",
    invoice: "INV004",
    status: "Transferred",
    duration: "4:56",
    recordingUrl: "https://example.com/recording4.mp3",
    transcriptUrl: "https://example.com/recording4.pdf",
  },
  {
    id: "5",
    date: "2023-10-05",
    invoice: "INV005",
    status: "Rescheduled",
    duration: "6:12",
    recordingUrl: "https://example.com/recording5.mp3",
    transcriptUrl: "https://example.com/recording5.pdf",
  },
];
const RecordingCell = ({ recordingUrl, transcriptUrl, invoice }: { recordingUrl: string, transcriptUrl: string, invoice: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex w-full flex-col items-center space-x-4">
      <Tabs defaultValue="recording" className={isMobile ? "w-[400px]" : "w-full"}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recording">Recording</TabsTrigger>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
        </TabsList>

        <TabsContent value="recording" className="w-full">
          <div className="flex w-full items-center space-x-2">
            <Button variant="outline" size="sm" onClick={togglePlay}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </Button>
            <Progress value={progress} className="w-full" />
            <audio ref={audioRef} src={recordingUrl} onEnded={() => { setIsPlaying(false); setProgress(0); }} />
            <Button variant="outline" size="sm" onClick={() => console.log("Download recording:", recordingUrl)}>
              <FaDownload />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="transcript" className="w-full">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaFileArrowDown />
              <span>{invoice}</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => console.log("Download transcript:", transcriptUrl)}>
              <FaDownload />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export const columns: ColumnDef<CallRecording>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="py-5 pl-4">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="pl-4">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <FaArrowsUpDown className="size-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "invoice",
    header: "Invoice",
    cell: ({ row }) => <div>{row.getValue("invoice")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => <div>{row.getValue("duration")}</div>,
  },
  {
    accessorKey: "recording",
    header: "Recording",
    cell: ({ row }) => <div className="py-5"><RecordingCell recordingUrl={row.original.recordingUrl} 
                                                            transcriptUrl={row.original.transcriptUrl}
                                                            invoice = {row.original.invoice}/></div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const recording = row.original;

      return (
        <div className="flex size-full flex-col items-center mt-auto pb-10"> 
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0">
                <span className="sr-only">Open menu</span>
                <FaEllipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(recording.id)}
              >
                Copy recording ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export default function DataTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: callRecordingsData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  });

  // Function to handle downloading selected invoices
  const handleDownloadSelected = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const selectedInvoices = selectedRows.map((row) => row.original.invoice);
    console.log("Downloading selected invoices:", selectedInvoices);
  };

  return (
    <div id="call-history" className="w-full">
      <p className="text-xl font-semibold md:text-2xl lg:text-3xl">
        Call history
      </p>
      <div className="flex flex-col justify-between py-4 md:flex-row">
        <Input
          placeholder="Filter invoices..."
          value={(table.getColumn("invoice")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("invoice")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {/* Dropdown to filter by status */}
        <div className="mt-2 flex flex-col gap-2 md:mt-0 md:flex-row lg:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-fit justify-between bg-inherit"
              >
                Filter by Status <FaChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {["Booked", "Cancelled", "Transferred", "Rescheduled"].map(
                (status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={
                      table.getColumn("status")?.getFilterValue() === status
                    }
                    onCheckedChange={(value) =>
                      table
                        .getColumn("status")
                        ?.setFilterValue(value ? status : undefined)
                    }
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ),
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DatePickerWithRange />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadSelected}
            disabled={table.getFilteredSelectedRowModel().rows.length === 0}
          >
            Download selected invoices
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
