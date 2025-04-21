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
import { ArrowDownUp, ChevronDown, File, Pause, Play } from "lucide-react";
import { Filter } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DualRangeSlider } from "@/components/ui/dual-slider";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";
import { card, flexBetweenCol, Header } from "@/lib/constant";
import { callRecordingsData } from "@/lib/sample-data";
import { CallRecording } from "@/lib/types";
import { cn } from "@/lib/utils";
const RecordingCell = ({
  recordingUrl,
  transcriptUrl,
  //id,
}: {
  recordingUrl: string;
  transcriptUrl: string;
  id: string;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <div className="flex justify-end gap-4">
      <Button
        variant="green"
        size="sm"
        // onClick={togglePlay}
      >
        {isPlaying ? <Pause /> : <Play />}
        Listen
      </Button>
      <Button
        variant="transcript"
        size="sm"
        onClick={() => console.log("Download transcript:", transcriptUrl)}
      >
        <File />
        Transcript
      </Button>
      <audio
        ref={audioRef}
        src={recordingUrl}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

function RecordingsContent({ data }: { data: CallRecording[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [durationRange, setDurationRange] = useState<[number, number]>([0, 0]);

  const isMobile = useIsMobile();

  const convertDurationToMinutes = (duration: string) => {
    const [minutes, seconds] = duration.split(":").map(Number);
    return minutes + seconds / 60;
  };

  const maxDuration = Math.max(
    ...data.map((recording) => convertDurationToMinutes(recording.duration)),
  );

  useEffect(() => {
    setDurationRange([0, maxDuration]);
  }, [maxDuration]);

  const isRowHidden = (duration: string) => {
    const durationInMinutes = convertDurationToMinutes(duration);
    return (
      durationInMinutes < durationRange[0] ||
      durationInMinutes > durationRange[1]
    );
  };

  const columns: ColumnDef<CallRecording>[] = [
    {
      accessorKey: "id",
      header: "Call ID",
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
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
            <ArrowDownUp className="size-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("date")}</div>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("category")}</div>
      ),
    },
    {
      accessorKey: "confidenceScore",
      header: "AI confidence score",
      cell: ({ row }) => <div>{row.getValue("confidenceScore")}</div>,
    },
    {
      accessorKey: "duration",
      header: "Duration",
      cell: ({ row }) => <div>{row.getValue("duration")}</div>,
    },
    {
      accessorKey: "recording",
      header: "",
      cell: ({ row }) => (
        <div className="py-3">
          <RecordingCell
            recordingUrl={row.original.recordingUrl}
            transcriptUrl={row.original.transcriptUrl}
            id={row.original.id}
          />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnFilters, columnVisibility },
  });

  // Set maximum recordings on the table
  useEffect(() => {
    table.setPageSize(100);
  }, [table]);

  return (
    <div className="px-4">
      <Card className={cn(card)}>
        <div
          className={cn(
            flexBetweenCol,
            `md:flex-row ${isMobile ? "mb-6 space-y-4" : ""}`,
          )}
        >
          <CardHeader className={Header}>
            Call History and Transcripts
          </CardHeader>

          <div
            className={`flex flex-col gap-2 md:mt-0 md:flex-row lg:gap-4 ${isMobile ? "space-y-4" : ""}`}
          >
            <Input
              placeholder="Search"
              value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("id")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />

            {/* Dropdown to filter by category */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-fit justify-between bg-inherit"
                >
                  Category <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align={isMobile ? "start" : "center"}
                className="bg-background"
              >
                {[
                  "Booking",
                  "Cancellation",
                  "General Inquiry",
                  "Reschedule",
                ].map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={
                      table.getColumn("category")?.getFilterValue() === status
                    }
                    onCheckedChange={(value) =>
                      table
                        .getColumn("category")
                        ?.setFilterValue(value ? status : undefined)
                    }
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-fit justify-between bg-inherit"
                >
                  Filter <Filter className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align={isMobile ? "start" : "end"}
                className="bg-background"
              >
                <div className="p-5">
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-between">
                      <span>Duration</span>
                    </div>
                    <DualRangeSlider
                      value={durationRange}
                      max={maxDuration}
                      step={1}
                      minStepsBetweenThumbs={1}
                      onValueChange={(value) =>
                        setDurationRange(value as [number, number])
                      }
                      className="w-[200px]"
                    />
                    <div className="flex justify-between">
                      <span>{durationRange[0]} min</span>
                      <span>{Math.ceil(durationRange[1])} min</span>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <ScrollArea className="h-[600px] rounded-md border">
          <Table className="mr-1 w-[calc(100%-5px)] overflow-hidden">
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
                table.getRowModel().rows.map((row) => {
                  const duration = row.original.duration;
                  const isHidden = isRowHidden(duration);

                  return (
                    <TableRow
                      key={row.id}
                      style={{ display: isHidden ? "none" : "table-row" }}
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
                  );
                })
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
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <div className="flex items-center justify-end py-2">
          <div className="space-x-2">
            {/* Render numbered pagination buttons */}
            {Array.from({ length: table.getPageCount() }).map((_, index) => (
              <Button
                key={index}
                variant={
                  index === table.getState().pagination.pageIndex
                    ? "transcript"
                    : "outline"
                }
                size="sm"
                onClick={() => table.setPageIndex(index)}
                disabled={table.getState().pagination.pageIndex === index}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function Recordings() {
  const data = callRecordingsData;

  return <RecordingsContent data={data} />;
}
