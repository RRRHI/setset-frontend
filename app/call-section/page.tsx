import  DataTable  from "../../components/widgets/dashboard/call-history";

export default function Page () {
    return (
        <div className="flex flex-1 flex-col gap-4 p-10 pt-0">
            <div className="flex flex-1 flex-col gap-10">
                <DataTable/>
            </div>
        </div>
    )
}