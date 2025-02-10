const updateObject = <
  T extends { [key: string]: string | number | object | boolean | null },
>({
  initialData,
  key,
  value,
}: {
  initialData: T;
  key: keyof T;
  value: T[keyof T];
}) => {
  const data: typeof initialData = { ...initialData };
  data[key] = value;
  return data;
};

export default { updateObject };
