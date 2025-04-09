import { Input } from "@/components/ui/input";
interface EditableFieldProps {
  value: string;
  placeholder?: string;
  componentFormat?: string;
  isEditing: boolean;
  fieldName?: string;
  newValue: string; // The value of the input from the parent state
  setNewValue: (value: string) => void; // A function to update the value from the parent
}

const EditableField = ({
  value,
  placeholder = "Enter text...",
  componentFormat = "",
  isEditing = false,
  fieldName = "Field",
  newValue ="",
  setNewValue,
}: EditableFieldProps) => {
  return (
    <div className={componentFormat}>
      {isEditing ? (
        <div className="flex w-full flex-col gap-1 text-base">
          <p>{fieldName}</p>
          <Input
            placeholder={placeholder}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="w-full border text-sm font-normal focus-visible:outline-none focus-visible:ring-0"
          />
        </div>
      ) : (
        <>
          <p>{value}</p>
        </>
      )}
    </div>
  );
};

export default EditableField;
