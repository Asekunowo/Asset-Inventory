const CustomSelect = ({
  defaultValue,
  value,
  onChange,
  options,
}: {
  defaultValue: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full h-10 rounded-md py-10 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-1 outline-1 focus:outline-offset-1 focus:outline-black sm:text-sm/6"
  >
    <option disabled value={defaultValue}>
      --{defaultValue}--
    </option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export default CustomSelect;
