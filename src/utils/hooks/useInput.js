import { useCallback, useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((e) => {
    setValue(() => e.target.value);
  }, []);

  const resetValue = () => {
    setValue(() => "");
  };

  return [value, resetValue, { onChange }];
};

export default useInput;
