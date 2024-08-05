import { useController } from "react-hook-form";

const useFormController = (name: string, control: any, rules?: any) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });

  return { field, fieldState };
};

export default useFormController;
