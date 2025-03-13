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
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDownUp,
  ChevronDown,
  File,
  Pause,
  Play,
} from "lucide-react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { DualRangeSlider } from "@/components/ui/dual-slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CallRecording } from "@/lib/types";
import { callRecordingsData } from "@/lib/sampleData";

import { useIsMobile } from "@/hooks/use-mobile";

const RecordingCell = ({ recordingUrl, transcriptUrl, id }: { recordingUrl: string, transcriptUrl: string, id: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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
    <div className="flex space-x-20 justify-end">
      <Button variant="ghost" 
              size="sm" 
              className="bg-sidebar-ring text-black" 
              // onClick={togglePlay}
              >
        {isPlaying ? <Pause /> : <Play />}
        Listen
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="bg-foreground text-card"
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

export const columns: ColumnDef<CallRecording>[] = [
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
    cell: ({ row }) => <div className="py-3"><RecordingCell recordingUrl={row.original.recordingUrl} 
                                                        transcriptUrl={row.original.transcriptUrl}
                                                        id = {row.original.id}/></div>,
  }
];

export default function DataTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [durationRange, setDurationRange] = useState<[number, number]>([0, 0]);

  const isMobile = useIsMobile();

  const convertDurationToMinutes = (duration: string) => {
    const [minutes, seconds] = duration.split(":").map(Number);
    return minutes + seconds / 60;
  };

  const maxDuration = Math.max(...callRecordingsData.map(recording => convertDurationToMinutes(recording.duration)));
  useEffect(() => {
    setDurationRange([0, maxDuration]);
  }, [maxDuration]);

  const router = useRouter();
  const handleViewMore = () => {
    router.push("/recordings-and-transcripts");
  }


  const isRowHidden = (duration: string) => {
    const durationInMinutes = convertDurationToMinutes(duration);
    return durationInMinutes < durationRange[0] || durationInMinutes > durationRange[1];
  };

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
    state: { sorting, columnFilters, columnVisibility },
  });

  return (
    <div id="call-history" className="bg-card rounded-lg p-10">
      <div className= {`flex flex-col justify-between  md:flex-row ${isMobile ? 'space-y-4' : ''}`}>
        <p className="text-m font-semibold md:text-2xl lg:text-3xl">
          Call history and transcripts
        </p>

        <div className={`mt-2 flex flex-col gap-2 md:mt-0 md:flex-row lg:gap-4 ${isMobile ? 'space-y-4' : ''}`}>
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
            <DropdownMenuContent align="end" className="bg-background">
              {["Booking", "Cancellation", "General Inquiry", "Reschedule"].map(
                (status) => (
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
                ),
              )}
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
            <DropdownMenuContent align="end" className="bg-background">
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
                    onValueChange={(value) => setDurationRange(value as [number, number])}
                    className="w-[200px]"
                  />
                  <div className="flex justify-between">
                    <span className = "font-bold">{durationRange[0]} min</span> 
                    <span className = "font-bold">{Math.ceil(durationRange[1])} min</span>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div>
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
      </div>
      <div className="flex items-center justify-end py-2">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewMore}
          >
            View more
          </Button>
        </div>
      </div>
    </div>
  );
}