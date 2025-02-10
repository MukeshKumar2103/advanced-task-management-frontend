import { useState } from 'react';

export default function useArray({
  initial,
  selected,
}: {
  initial: any[];
  selected: any;
}) {
  const [datas, setDatas] = useState(initial);
  const [selectedData, setSelectedData] = useState(selected);

  const updateDatas = ({
    id,
    key,
    value,
  }: {
    id: string;
    key: string;
    value: any;
  }) => {
    const updatedDatas = datas?.map((data) => {
      if (['isSelected']?.includes(key)) {
        const newSelectedData = { ...data, [key]: value };
        if (data?.id === id) setSelectedData(newSelectedData);
        return data?.id === id ? newSelectedData : { ...data, [key]: false };
      }

      if (data?.id === id) return { ...data, [key]: value };

      return data;
    });

    setDatas(updatedDatas);

    return updatedDatas;
  };

  return { datas, setDatas, selectedData, setSelectedData, updateDatas };
}
