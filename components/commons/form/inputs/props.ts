export interface PhotoInputProps {
    handleImageUploaded: (fileName: string, image_path: string) => void;
  }

export interface InputComponentProps {
  inputLabel: string;
  inputName: string;
  inputType: string;
  inputValue: string | string[]; // Change this to string | string[]
  inputOptions?: string[];
  handleChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  divClassName?: string;
  inputClassName?: string;
  inputPrefix?: string; 
  inputPlaceholder?: string;
}


export interface AIButtonProps {
    prompt: string;
    AIButtonLabel: string;
    handleImageGenerated: (data: { fileName: string; fullimage_path: string }) => void;
  }