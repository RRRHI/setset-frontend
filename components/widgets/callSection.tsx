"use client"

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
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import  {useEffect,useRef,useState} from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CalendarButton } from "@/components/widgets/calendarButton"

// Sample data for Call Recordings
const callRecordingsData: CallRecording[] = [
  {
    id: "1",
    date: "2023-10-01",
    invoice: "INV001",
    status: "Booked",
    duration: "0:18",
    recordingUrl: "https://actions.google.com/sounds/v1/cartoon/rainstick_slow.ogg",
  },
  {
    id: "2",
    date: "2023-10-02",
    invoice: "INV002",
    status: "Cancelled",
    duration: "0:50",
    recordingUrl: "https://actions.google.com/sounds/v1/ambiences/barnyard_with_animals.ogg",
  },
  {
    id: "3",
    date: "2023-10-03",
    invoice: "INV003",
    status: "Cancelled",
    duration: "7:48",
    recordingUrl: "https://example.com/recording3.mp3",
  },
  {
    id: "4",
    date: "2023-10-04",
    invoice: "INV004",
    status: "Transferred",
    duration: "4:56",
    recordingUrl: "https://example.com/recording4.mp3",
  },
  {
    id: "5",
    date: "2023-10-05",
    invoice: "INV005",
    status: "Rescheduled",
    duration: "6:12",
    recordingUrl: "https://example.com/recording5.mp3",
  },
]


export type CallRecording = {
  id: string
  date: string
  invoice: string
  status: "Booked" | "Cancelled" | "Transferred" | "Rescheduled"
  duration: string
  recordingUrl: string
}

const RecordingCell: React.FC<{ url: string }> = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100)
    }

    audio.addEventListener("timeupdate", updateProgress)
    return () => {
      audio.removeEventListener("timeupdate", updateProgress)
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={togglePlay}>
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button variant="outline" size="sm" onClick={() => console.log("Download recording:", url)}>
          Download
        </Button>
      </div>
      <Progress value={progress} className="w-full" />
      <audio ref={audioRef} src={url} onEnded={() => { setIsPlaying(false); setProgress(0); }} />
    </div>
  )
}

export const columns: ColumnDef<CallRecording>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className = "py-5 pl-4 ">
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
      <div className = "pl-4">
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
          <ArrowUpDown className="ml-2 size-4 " />
        </Button>
      )
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
    cell: ({ row }) => <RecordingCell url={row.original.recordingUrl} />,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const recording = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(recording.id)}
            >
              Copy recording ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Report problems</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function DataTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  // Function to handle downloading selected invoices
  const handleDownloadSelected = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows
    const selectedInvoices = selectedRows.map((row) => row.original.invoice)
    console.log("Downloading selected invoices:", selectedInvoices)
  }

  return (
    <div className="w-full">
      <p className="text-xl font-semibold md:text-2xl lg:text-3xl">
        Call history
      </p>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter invoices..."
          value={(table.getColumn("invoice")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("invoice")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {/* Dropdown to filter by status */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-2">
              Filter by Status <ChevronDown className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {["Booked", "Cancelled", "Transferred", "Rescheduled"].map(
              (status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={table.getColumn("status")?.getFilterValue() === status}
                  onCheckedChange={(value) =>
                    table.getColumn("status")?.setFilterValue(value ? status : undefined)
                  }
                >
                  {status}
                </DropdownMenuCheckboxItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <CalendarButton />
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
                            header.getContext()
                          )}
                    </TableHead>
                  )
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
                        cell.getContext()
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
  )
}