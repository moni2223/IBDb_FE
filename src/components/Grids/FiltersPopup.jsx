import { useEffect, useRef, useState } from "react";
import Inputs from "../Inputs";
import { isArray, omit, uniqBy } from "lodash";
import moment from "moment";

const FiltersPopup = ({ close, filter: filterProp = {}, filterOptions, handleSubmit }) => {
  const { type, key, options, fetch, transform } = filterOptions;

  const [filter, setFilter] = useState(filterProp);

  const [dbOptions, setDbOptions] = useState([]);
  const allOptions = uniqBy([...(isArray(filter[key]) ? filter[key] : []), ...dbOptions], "value");
  const firstRender = useRef(true);
  useEffect(() => {
    if (!firstRender.current || type !== "dbDropdown" || !["departments"].includes(key)) return;
    firstRender.current = false;
    fetch()
      .then(({ data: { payload } }) => setDbOptions(transform(payload)))
      .catch((error) => console.error(error));
  }, [dbOptions.length, fetch, key, transform, type]);

  const timerRef = useRef(null);
  useEffect(() => {
    const timer = timerRef.current;
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const renderContent = () => {
    switch (type) {
      case "checkboxes":
        return (
          <Inputs.Checkboxes
            style={{ maxHeight: "400px" }}
            column
            full
            options={options}
            value={filter[key] || ""}
            onChange={({ value }) => {
              const current = filter[key] ?? [];
              if (current.includes(value)) setFilter({ ...filter, [key]: current.filter((v) => v !== value) });
              else setFilter({ ...filter, [key]: [...current, value] });
            }}
          />
        );
      case "dateRange":
        return (
          <div className="flex flex-col gap-3">
            <Inputs.DatePicker
              label="От дата"
              compulsory
              value={filter?.[key]?.min ? moment(filter?.[key]?.min)?._d : ""}
              onChange={(value) => {
                setFilter({ ...filter, [key]: { ...filter?.[key], min: value === "" ? undefined : value } });
              }}
              maxDate={filter?.[key]?.max ?? null}
            />
            <Inputs.DatePicker label="До дата" compulsory value={filter?.[key]?.max ? moment(filter?.[key]?.max)?._d : ""} onChange={(value) => setFilter({ ...filter, [key]: { ...filter?.[key], max: value === "" ? undefined : value } })} minDate={filter?.[key]?.min ?? null} />
          </div>
        );
      case "numberRange":
        return (
          <div className="flex flex-col gap-3">
            <Inputs.TextInput number compulsory label="От" value={filter?.[key]?.min} onChange={({ target }) => setFilter({ ...filter, [key]: { ...filter?.[key], min: target.value === "" ? undefined : Number(target.value) || undefined } })} />
            <Inputs.TextInput number compulsory label="До" value={filter?.[key]?.max} onChange={({ target }) => setFilter({ ...filter, [key]: { ...filter?.[key], max: target.value === "" ? undefined : Number(target.value) || undefined } })} />
          </div>
        );
      case "text":
        return (
          <div className="flex flex-col gap-3">
            <Inputs.TextInput compulsory value={filter?.[key] || ""} onChange={({ target }) => setFilter({ ...filter, [key]: target?.value })} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="filters-popup-container">
      <div className="w-full flex justify-between items-center p-3">
        <h1 className="inner-title text-base">Филтрирай по</h1>
        <div className="close-icon w-3 h-3" onClick={close} />
      </div>
      <div className="filters-popup-content px-[10px] py-[10px]">{renderContent()}</div>
      {(type !== "dbDropdown" || filter[key] || allOptions.length > 0) && (
        <div className="filters-popup-footer rounded-b-md w-full flex gap-[5px] px-[10px] py-[5px] shadow-[0px_-1px_6px_-4px_#515867]">
          <Inputs.Button
            text="ИЗЧИСТИ"
            className={"border border-[#515867] w-1/2"}
            disabled={!filterProp[key]}
            onClick={() => {
              handleSubmit(omit(filter, [key]));
              close();
            }}
          />
          <Inputs.Button
            text="ЗАПАЗИ"
            className={"selected w-1/2"}
            disabled={!filter[key]}
            onClick={() => {
              handleSubmit(filter);
              close();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default FiltersPopup;
