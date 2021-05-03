export interface FormItem {
  ID: string;
  //   name: string;
  //   label: string;
  //   config: {
  //     required: boolean;
  //   };
}

export enum FormItemsNames {
  DatePicker = "DatePicker",
  Input = "Input",
  InputNumber = "InputNumber",
  Checkbox = "Checkbox",
  Radio = "Radio",
  UploadFile = "UploadFile",
}

export type DefaultFormAttributes = Partial<
  Record<keyof typeof FormItemsNames, FormItem>
>;
